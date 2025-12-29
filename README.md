# SurdMC Landing Page

A lightweight, modern landing page for the SurdCraft.eu Minecraft server. Built with performance and SEO in mind.

## Features

- 🎨 **Modern Design**: Simple yet innovative Minecraft-themed design
- 📱 **Fully Responsive**: Optimized for both mobile and desktop devices
- 🚀 **Lightning Fast**: Minimal dependencies and RAM-optimized server
- 🔍 **SEO Optimized**: Comprehensive meta tags for search engines
- 💬 **Social Media Ready**: Open Graph tags for Facebook/Messenger previews
- ⚡ **High Performance**: Built-in file caching and efficient serving
- 🎯 **Zero Dependencies**: Pure Node.js server with no external packages

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js HTTP server (zero dependencies)
- **Fonts**: Google Fonts (Roboto)

## Quick Start

### Prerequisites

- Node.js 14.0.0 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LetsUpdate/SurdMCLandingPage.git
cd SurdMCLandingPage
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode
- `npm run prod` - Start the server with production settings

## Configuration

The server can be configured using environment variables:

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)
- `CACHE_ENABLED` - Enable/disable file caching (default: true)
- `NODE_ENV` - Environment mode (development/production)

Example:
```bash
PORT=8080 CACHE_ENABLED=true npm start
```

## Performance

The server is optimized for minimal RAM usage:

- **No external dependencies**: Pure Node.js reduces memory footprint
- **File caching**: Static files are cached in memory for faster serving
- **Efficient routing**: Simple path resolution without heavy frameworks
- **Graceful shutdown**: Proper cleanup on server termination

Typical memory usage: **~10-30MB** depending on cache size

## SEO Features

- Semantic HTML5 structure
- Meta tags for search engines
- Open Graph tags for social media
- Optimized page load speed
- Mobile-friendly responsive design
- Proper heading hierarchy

## Customization

### Updating Server Information

Edit `index.html` to change:
- Server IP address
- Server description
- Features and information

### Styling

Modify `style.css` to customize:
- Colors (CSS variables in `:root`)
- Layout and spacing
- Animations and effects

### Server Configuration

Edit `server.js` to:
- Add custom routes
- Modify caching behavior
- Add security headers

## Deployment

### Production Deployment

1. Set environment variables:
```bash
export NODE_ENV=production
export PORT=80
```

2. Run the server:
```bash
npm run prod
```

### Using Process Manager (PM2)

```bash
npm install -g pm2
pm2 start server.js --name surdmc
pm2 startup
pm2 save
```

### Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t surdmc-landing .
docker run -p 3000:3000 surdmc-landing
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this for your own Minecraft server!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.

---

**Note**: This is not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.