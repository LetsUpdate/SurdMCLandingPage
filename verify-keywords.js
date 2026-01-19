#!/usr/bin/env node

/**
 * Keyword Verification Script
 * 
 * This script verifies that SEO keywords exist in the index.html file
 * and optionally displays them.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    bold: '\x1b[1m'
};

function checkKeywords() {
    const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
    
    console.log(`${colors.bold}Keyword Verification${colors.reset}\n`);
    console.log(`Checking: ${colors.cyan}${indexHtmlPath}${colors.reset}\n`);
    
    // Check if file exists
    if (!fs.existsSync(indexHtmlPath)) {
        console.log(`${colors.red}✗ Error: index.html not found!${colors.reset}`);
        process.exit(1);
    }
    
    // Read file content
    const content = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Check for keywords meta tag
    const keywordsRegex = /<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']\s*\/?>/i;
    const match = content.match(keywordsRegex);
    
    if (match) {
        const keywords = match[1];
        const keywordArray = keywords.split(',').map(k => k.trim());
        
        console.log(`${colors.green}${colors.bold}✓ Keywords found!${colors.reset}\n`);
        console.log(`${colors.bold}Total keywords: ${colors.green}${keywordArray.length}${colors.reset}\n`);
        console.log(`${colors.bold}Keywords list:${colors.reset}`);
        keywordArray.forEach((keyword, index) => {
            console.log(`  ${index + 1}. ${keyword}`);
        });
        console.log(`\n${colors.bold}Full meta tag:${colors.reset}`);
        console.log(`  ${colors.yellow}${match[0]}${colors.reset}`);
        
        process.exit(0);
    } else {
        console.log(`${colors.red}${colors.bold}✗ No keywords meta tag found!${colors.reset}`);
        console.log(`\nExpected format:`);
        console.log(`  ${colors.yellow}<meta name="keywords" content="keyword1, keyword2, ...">${colors.reset}`);
        process.exit(1);
    }
}

// Run the check
checkKeywords();
