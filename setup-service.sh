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
cp index.html style.css server.js package.json package-lock.json favicon.svg favicon.png og-image.png og-image.svg robots.txt sitemap.xml $APP_DIR/

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

# Wait a moment for the service to start
sleep 2

# Check status
echo ""
echo "=== Service Status ==="
systemctl status surdmc --no-pager || true

echo ""
echo "=== Setup Complete ==="
echo "Service installed and running on port $PORT"
echo ""
echo "Useful commands:"
echo "  sudo systemctl status surdmc    - Check service status"
echo "  sudo journalctl -u surdmc -f    - View logs"
echo "  sudo systemctl restart surdmc   - Restart service"
echo "  sudo systemctl stop surdmc      - Stop service"
echo ""
echo "Test the service: curl http://localhost:$PORT"
