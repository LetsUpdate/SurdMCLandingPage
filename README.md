# SurdMC Landing Page

A lightweight, modern landing page for the SurdMC.eu Minecraft server. Built with performance and SEO in mind.

**Server Type:** Modded NeoForge 1.21.1 with tech and building mods including Mekanism, Ender IO, AE2, Carpenters, and Chisel.

## Features

- 🎨 **Modern Design**: Simple yet innovative Minecraft-themed design
- 📱 **Fully Responsive**: Optimized for both mobile and desktop devices
- 🎮 **Modpack Download**: MEKApack.mrpack download with installation guide
- 🔧 **Modded Server**: NeoForge 1.21.1 with tech and building mods
- 🚀 **Lightning Fast**: Minimal dependencies and RAM-optimized server
- 🔍 **SEO Optimized**: Comprehensive meta tags and structured data for search engines
- 💬 **Social Media Ready**: Open Graph tags for Facebook/Messenger previews
- ⚡ **High Performance**: Built-in file caching and efficient serving
- 🎯 **Zero Dependencies**: Pure Node.js server with no external packages
- 🔒 **Security Headers**: Enhanced security with modern HTTP headers
- 🎮 **Multi-Device Animations**: Parallax effects work on desktop (mouse), mobile (gyroscope), and touch
- 🏥 **Health Check**: Built-in `/health` endpoint for monitoring
- 🤖 **SEO Structured Data**: JSON-LD schema for better search engine understanding
- ☁️ **1-Click Deploy**: Ready for DigitalOcean App Platform deployment

## Project Structure

```
SurdMCLandingPage/
├── public/              # Static website files (web root)
│   ├── index.html      # Main landing page
│   ├── style.css       # Stylesheet
│   ├── favicon.svg     # Site favicon
│   ├── og-image.png    # Social media preview image
│   ├── MEKApack.mrpack # Modpack download file
│   ├── robots.txt      # SEO crawler directives
│   └── sitemap.xml     # SEO sitemap
├── server.js           # Node.js static file server (optional)
├── package.json        # Node.js dependencies
└── .do/
    └── app.yaml        # DigitalOcean App Platform config
```

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

## API Endpoints

### Health Check

`GET /health`

Returns server health status and metrics.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-29T11:16:18.855Z",
  "uptime": 42.5,
  "memory": {
    "used": 12,
    "total": 18
  }
}
```

**Use cases:**
- Monitoring server health
- Load balancer health checks
- Uptime monitoring services

## SEO Features

- Semantic HTML5 structure
- Meta tags for search engines
- Open Graph tags for social media
- Structured data (JSON-LD) for rich snippets
- robots.txt for crawler directives
- sitemap.xml for search engine indexing
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

### DigitalOcean App Platform (Recommended - 1-Click Deploy) 🚀

The easiest way to deploy this website is using DigitalOcean App Platform as a static site.

#### Quick Deploy (1-Click)

1. **Fork or Clone** this repository to your GitHub account
2. **Sign in** to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
3. **Create New App** and select your GitHub repository
4. DigitalOcean will **automatically detect** the `.do/app.yaml` configuration
5. **Review and Deploy** - that's it! Your site will be live in minutes.

#### What's Included

The repository includes a pre-configured `.do/app.yaml` file that:
- Deploys the site as a **static website** (fast and free tier available)
- Uses the `public/` directory as the web root
- Configures proper routing and error handling
- Sets up automatic deployments on push to main branch
- Deploys to the Frankfurt (fra) region by default

#### Manual Configuration

If you prefer to configure manually:

1. In DigitalOcean App Platform, click **"Create App"**
2. Connect your **GitHub** repository
3. Select **Static Site** as the component type
4. Set the following:
   - **Output Directory**: `public`
   - **Catchall Document**: `index.html`
   - **Error Document**: `index.html`
5. Click **"Next"** and then **"Create Resources"**

#### Costs

- DigitalOcean App Platform offers a **free tier** for static sites
- Basic static sites: **$0/month** (up to 3 static sites)
- Check [DigitalOcean Pricing](https://www.digitalocean.com/pricing/app-platform) for current rates

### Alternative Deployment Options

#### Node.js Server Deployment (VPS/Self-hosted)

If you prefer to host on your own VPS or server using the included Node.js server:

1. Set environment variables:
```bash
export NODE_ENV=production
export PORT=80
```

2. Run the server:
```bash
npm run prod
```

#### Using Process Manager (PM2)

For production deployments with automatic restarts:

```bash
npm install -g pm2
pm2 start server.js --name surdmc
pm2 startup
pm2 save
```

#### Docker Deployment

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