const http = require('http');
const fs = require('fs');
const path = require('path');

// Server configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// MIME types for static files
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.txt': 'text/plain',
    '.xml': 'application/xml'
};

// Cache for file contents (optional, for better performance)
const fileCache = new Map();
const CACHE_ENABLED = process.env.CACHE_ENABLED !== 'false';

// Simple logger
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

// Get content type based on file extension
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return MIME_TYPES[ext] || 'application/octet-stream';
}

// Get security headers
function getSecurityHeaders() {
    return {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    };
}

// Serve static file
function serveFile(res, filePath, statusCode = 200) {
    const contentType = getContentType(filePath);
    
    // Check cache first
    if (CACHE_ENABLED && fileCache.has(filePath)) {
        const cachedContent = fileCache.get(filePath);
        const headers = {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
            'Content-Length': cachedContent.length,
            ...getSecurityHeaders()
        };
        res.writeHead(statusCode, headers);
        res.end(cachedContent);
        return;
    }
    
    // Read file from disk
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                serve404(res);
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                log(`Error reading file ${filePath}: ${err.message}`);
            }
        } else {
            // Cache the file content
            if (CACHE_ENABLED) {
                fileCache.set(filePath, content);
            }
            
            const headers = {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400',
                'Content-Length': content.length,
                ...getSecurityHeaders()
            };
            res.writeHead(statusCode, headers);
            res.end(content);
        }
    });
}

// Serve 404 page
function serve404(res) {
    const html404 = `
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Oldal nem található</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .error-container {
            padding: 40px;
        }
        h1 {
            font-size: 120px;
            margin: 0;
            text-shadow: 3px 3px 0 #3F3F3F;
        }
        p {
            font-size: 24px;
            margin: 20px 0;
        }
        a {
            color: #6EAF3D;
            text-decoration: none;
            font-size: 18px;
            border: 2px solid #6EAF3D;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
            transition: all 0.3s;
        }
        a:hover {
            background: #6EAF3D;
            color: white;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404</h1>
        <p>Az oldal nem található</p>
        <a href="/">Vissza a főoldalra</a>
    </div>
</body>
</html>
    `;
    
    res.writeHead(404, { 
        'Content-Type': 'text/html',
        'Content-Length': Buffer.byteLength(html404)
    });
    res.end(html404);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse URL
    let urlPath = req.url;
    
    // Remove query string
    const queryIndex = urlPath.indexOf('?');
    if (queryIndex !== -1) {
        urlPath = urlPath.substring(0, queryIndex);
    }
    
    // Prevent directory traversal attacks
    urlPath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, '');
    
    // Health check endpoint
    if (urlPath === '/health') {
        const healthData = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
            }
        };
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            ...getSecurityHeaders()
        });
        res.end(JSON.stringify(healthData, null, 2));
        log(`200: ${req.method} ${req.url}`);
        return;
    }
    
    // Default to index.html for root
    if (urlPath === '/' || urlPath === '') {
        urlPath = '/index.html';
    }
    
    // Construct file path from public directory
    const filePath = path.join(__dirname, 'public', urlPath);
    
    // Security check: ensure file is within the public directory
    const publicDir = path.join(__dirname, 'public');
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(publicDir)) {
        serve404(res);
        log(`Security: Blocked path traversal attempt: ${req.url}`);
        return;
    }
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            serve404(res);
            log(`404: ${req.method} ${req.url}`);
        } else {
            serveFile(res, filePath);
            log(`200: ${req.method} ${req.url}`);
        }
    });
});

// Start server
server.listen(PORT, HOST, () => {
    log(`Server running at http://${HOST}:${PORT}/`);
    log(`Cache enabled: ${CACHE_ENABLED}`);
    log(`Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    log('SIGTERM received, shutting down gracefully...');
    if (memoryLogInterval) clearInterval(memoryLogInterval);
    server.close(() => {
        log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    log('SIGINT received, shutting down gracefully...');
    if (memoryLogInterval) clearInterval(memoryLogInterval);
    server.close(() => {
        log('Server closed');
        process.exit(0);
    });
});

// Log memory usage every 5 minutes
let memoryLogInterval = null;
if (process.env.NODE_ENV === 'production') {
    memoryLogInterval = setInterval(() => {
        const memUsage = process.memoryUsage();
        log(`Memory - Heap: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB / ${Math.round(memUsage.heapTotal / 1024 / 1024)}MB, RSS: ${Math.round(memUsage.rss / 1024 / 1024)}MB`);
    }, 300000); // 5 minutes
}
