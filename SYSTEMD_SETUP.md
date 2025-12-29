# Linux Systemd Service Setup Guide

This guide shows you how to set up the SurdMC landing page as a systemd service on Linux, so it runs automatically on system boot and can be managed like any other system service.

## Prerequisites

- Linux system with systemd (Ubuntu, Debian, CentOS, Fedora, etc.)
- Node.js 14.0.0 or higher installed
- Root or sudo access
- The SurdMC landing page files in a permanent location (e.g., `/opt/surdmcweb` or `/var/www/surdmcweb`)

## Step 1: Prepare the Application Directory

1. Choose a permanent location for your application. We'll use `/opt/surdmcweb` in this guide:

```bash
sudo mkdir -p /opt/surdmcweb
```

2. Copy your application files to this directory:

```bash
sudo cp -r /path/to/your/files/* /opt/surdmcweb/
```

3. Set appropriate permissions:

```bash
# Create a dedicated user for running the service (recommended)
sudo useradd -r -s /bin/false surdmcweb

# Set ownership
sudo chown -R surdmcweb:surdmcweb /opt/surdmcweb

# Set permissions
sudo chmod -R 755 /opt/surdmcweb
```

## Step 2: Create the Systemd Service File

Create a new systemd service file:

```bash
sudo nano /etc/systemd/system/surdmc.service
```

Add the following content:

```ini
[Unit]
Description=SurdMC.eu Landing Page Server
Documentation=https://github.com/LetsUpdate/SurdMCLandingPage
After=network.target

[Service]
Type=simple
User=surdmcweb
Group=surdmcweb
WorkingDirectory=/opt/surdmcweb
ExecStart=/usr/bin/node /opt/surdmcweb/server.js

# Environment variables
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOST=0.0.0.0
Environment=CACHE_ENABLED=true

# Restart policy
Restart=always
RestartSec=10

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=surdmc

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/surdmcweb

# Resource limits
LimitNOFILE=65535
MemoryMax=100M

[Install]
WantedBy=multi-user.target
```

## Step 3: Enable and Start the Service

1. Reload systemd to recognize the new service:

```bash
sudo systemctl daemon-reload
```

2. Enable the service to start on boot:

```bash
sudo systemctl enable surdmc
```

3. Start the service now:

```bash
sudo systemctl start surdmc
```

4. Check the service status:

```bash
sudo systemctl status surdmc
```

You should see output showing the service is active and running:

```
● surdmc.service - SurdMC.eu Landing Page Server
     Loaded: loaded (/etc/systemd/system/surdmc.service; enabled; vendor preset: enabled)
     Active: active (running) since ...
```

## Step 4: Verify the Service

Test that the service is working:

```bash
curl http://localhost:3000
```

You should see the HTML content of the landing page.

## Managing the Service

### View logs

```bash
# View all logs
sudo journalctl -u surdmc

# Follow logs in real-time
sudo journalctl -u surdmc -f

# View last 100 lines
sudo journalctl -u surdmc -n 100

# View logs since boot
sudo journalctl -u surdmc -b
```

### Service control commands

```bash
# Start the service
sudo systemctl start surdmc

# Stop the service
sudo systemctl stop surdmc

# Restart the service
sudo systemctl restart surdmc

# Reload configuration (if you modify the service file)
sudo systemctl daemon-reload
sudo systemctl restart surdmc

# Check service status
sudo systemctl status surdmc

# Enable service (start on boot)
sudo systemctl enable surdmc

# Disable service (don't start on boot)
sudo systemctl disable surdmc
```

## Configuration Options

You can customize the service by editing the service file:

### Change Port

Edit `/etc/systemd/system/surdmc.service` and modify the `Environment=PORT=3000` line:

```ini
Environment=PORT=80
```

**Note**: Ports below 1024 require special permissions. Either:
- Use a reverse proxy (recommended, see below)
- Grant Node.js permission: `sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node`

### Disable Caching

```ini
Environment=CACHE_ENABLED=false
```

### Memory Limit

Adjust the memory limit:

```ini
MemoryMax=200M
```

After any changes, reload and restart:

```bash
sudo systemctl daemon-reload
sudo systemctl restart surdmc
```

## Reverse Proxy Setup (Recommended)

For production, use Nginx or Apache as a reverse proxy:

### Nginx Configuration

Create `/etc/nginx/sites-available/surdmc`:

```nginx
server {
    listen 80;
    server_name surdmc.eu www.surdmc.eu;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1000;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/surdmc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL/HTTPS with Let's Encrypt

Install Certbot and obtain SSL certificate:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d surdmc.eu -d www.surdmc.eu
```

Certbot will automatically configure HTTPS and set up auto-renewal.

## Firewall Configuration

If using UFW firewall:

```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Or if running directly on port 3000
sudo ufw allow 3000/tcp
```

## Monitoring

### Check Memory Usage

```bash
# Check current memory usage
systemctl status surdmc | grep Memory

# Detailed memory info
systemd-cgtop -m
```

### Set up Automatic Alerts

Create a monitoring script `/opt/surdmcweb/monitor.sh`:

```bash
#!/bin/bash
SERVICE="surdmc"

if ! systemctl is-active --quiet $SERVICE; then
    echo "Service $SERVICE is not running!" | mail -s "Alert: $SERVICE Down" admin@surdmc.eu
    systemctl start $SERVICE
fi
```

Make it executable and add to crontab:

```bash
sudo chmod +x /opt/surdmcweb/monitor.sh
sudo crontab -e
```

Add this line to check every 5 minutes:

```
*/5 * * * * /opt/surdmcweb/monitor.sh
```

## Troubleshooting

### Service won't start

Check logs for errors:

```bash
sudo journalctl -u surdmc -n 50
```

Common issues:
- Port already in use: Change PORT in service file
- Permission denied: Check file ownership and permissions
- Node.js not found: Update `ExecStart` path to correct Node.js binary

### Find Node.js path

```bash
which node
# Use this path in ExecStart
```

### Service crashes repeatedly

Check logs and increase restart delay:

```ini
RestartSec=30
```

### Port binding issues

If you see "EADDRINUSE" error:

```bash
# Find what's using the port
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

## Backup and Updates

### Backup

```bash
sudo tar -czf surdmc-backup-$(date +%Y%m%d).tar.gz /opt/surdmcweb
```

### Update

```bash
# Stop the service
sudo systemctl stop surdmc

# Backup current version
sudo cp -r /opt/surdmcweb /opt/surdmcweb.backup

# Update files
sudo cp -r /path/to/new/files/* /opt/surdmcweb/

# Fix permissions
sudo chown -R surdmcweb:surdmcweb /opt/surdmcweb

# Restart service
sudo systemctl start surdmc

# Check status
sudo systemctl status surdmc
```

## Complete Setup Script

Here's a complete automated setup script:

```bash
#!/bin/bash

# Setup script for SurdMC Landing Page systemd service

set -e

echo "=== SurdMC Systemd Service Setup ==="

# Configuration
APP_DIR="/opt/surdmcweb"
SERVICE_USER="surdmcweb"
SERVICE_FILE="/etc/systemd/system/surdmc.service"
PORT=3000

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

# Create user
echo "Creating service user..."
if ! id "$SERVICE_USER" &>/dev/null; then
    useradd -r -s /bin/false $SERVICE_USER
    echo "User $SERVICE_USER created"
else
    echo "User $SERVICE_USER already exists"
fi

# Create directory
echo "Creating application directory..."
mkdir -p $APP_DIR

# Copy files (assumes script is run from the repo directory)
echo "Copying application files..."
cp index.html style.css server.js package.json favicon.png og-image.svg $APP_DIR/

# Set permissions
echo "Setting permissions..."
chown -R $SERVICE_USER:$SERVICE_USER $APP_DIR
chmod -R 755 $APP_DIR

# Create service file
echo "Creating systemd service file..."
cat > $SERVICE_FILE << 'EOF'
[Unit]
Description=SurdMC.eu Landing Page Server
Documentation=https://github.com/LetsUpdate/SurdMCLandingPage
After=network.target

[Service]
Type=simple
User=surdmcweb
Group=surdmcweb
WorkingDirectory=/opt/surdmcweb
ExecStart=/usr/bin/node /opt/surdmcweb/server.js

Environment=NODE_ENV=production
Environment=PORT=3000
Environment=HOST=0.0.0.0
Environment=CACHE_ENABLED=true

Restart=always
RestartSec=10

StandardOutput=journal
StandardError=journal
SyslogIdentifier=surdmc

NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/surdmcweb

LimitNOFILE=65535
MemoryMax=100M

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd
echo "Reloading systemd..."
systemctl daemon-reload

# Enable and start service
echo "Enabling and starting service..."
systemctl enable surdmc
systemctl start surdmc

# Check status
echo ""
echo "=== Service Status ==="
systemctl status surdmc --no-pager

echo ""
echo "=== Setup Complete ==="
echo "Service installed and running on port $PORT"
echo ""
echo "Useful commands:"
echo "  sudo systemctl status surdmc    - Check service status"
echo "  sudo journalctl -u surdmc -f    - View logs"
echo "  sudo systemctl restart surdmc   - Restart service"
echo ""
echo "Test the service: curl http://localhost:$PORT"
```

Save this as `setup-service.sh`, make it executable, and run:

```bash
chmod +x setup-service.sh
sudo ./setup-service.sh
```

## Summary

You now have the SurdMC landing page running as a system service that will:
- Start automatically on system boot
- Restart automatically if it crashes
- Log to the system journal
- Run with limited permissions for security
- Use minimal memory (~4-44MB)

For production use, combine this with:
1. Nginx reverse proxy
2. SSL/HTTPS with Let's Encrypt
3. Firewall configuration
4. Regular backups
5. Monitoring and alerts

Your landing page will be robust, secure, and production-ready!
