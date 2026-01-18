# Quick Reference - SurdMC Landing Page

## 📁 File Structure

```
SurdMCLandingPage/
├── public/              # Static website files (web root)
│   ├── index.html      # Main landing page
│   ├── style.css       # Stylesheet
│   ├── favicon.svg     # Site favicon (vector)
│   ├── favicon.png     # Site favicon (raster)
│   ├── og-image.svg    # Social media preview (vector)
│   ├── og-image.png    # Social media preview (raster)
│   ├── robots.txt      # SEO crawler directives
│   └── sitemap.xml     # SEO sitemap
├── .do/
│   └── app.yaml        # DigitalOcean config (alternative location)
├── app.yaml            # DigitalOcean App Platform config
├── server.js           # Node.js static file server (optional)
├── package.json        # Node.js project config
├── DEPLOY.md           # Deployment guide
├── README.md           # Main documentation
└── IMPROVEMENTS.md     # Development roadmap
```

## 🚀 Deployment Options

### Option 1: DigitalOcean App Platform (Recommended)
**Best for:** Easy, free hosting with auto-deploy

1. Fork/clone repository to your GitHub
2. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
3. Click "Create App" → Connect GitHub → Select repository
4. DigitalOcean auto-detects `app.yaml` configuration
5. Review and deploy (Free tier available!)

**See:** [DEPLOY.md](DEPLOY.md) for detailed instructions

### Option 2: Node.js Server (VPS/Self-hosted)
**Best for:** Full control, custom domain on your own server

```bash
# Clone repository
git clone https://github.com/LetsUpdate/SurdMCLandingPage.git
cd SurdMCLandingPage

# Start server
npm start

# Or with custom settings
PORT=80 NODE_ENV=production npm start
```

### Option 3: Static Hosting (Netlify, Vercel, GitHub Pages)
**Best for:** Simple static hosting

Just point the hosting provider to the `public/` directory as the web root.

## 🛠️ Local Development

```bash
# Start development server
npm run dev

# Access at http://localhost:3000

# Server will serve files from public/ directory
```

## 🧪 Testing

```bash
# Test homepage
curl http://localhost:3000/

# Test health endpoint (Node.js server only)
curl http://localhost:3000/health

# Test static assets
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
```

## 📝 Configuration Files

### app.yaml (DigitalOcean)
- Configures static site deployment
- Points to `public/` directory as web root
- Enables auto-deploy on push to main branch
- Sets up routing and error handling

### server.js (Optional Node.js Server)
- Serves static files from `public/` directory
- Built-in file caching for performance
- Security headers included
- Health check endpoint at `/health`
- Zero external dependencies

## 🔧 Environment Variables (server.js)

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port |
| HOST | 0.0.0.0 | Server host |
| CACHE_ENABLED | true | Enable file caching |
| NODE_ENV | development | Environment mode |

Example:
```bash
PORT=8080 CACHE_ENABLED=true NODE_ENV=production npm start
```

## 📊 Key Features

- ✅ Static site ready for 1-click deployment
- ✅ Optional Node.js server included
- ✅ SEO optimized (meta tags, sitemap, robots.txt)
- ✅ Social media ready (Open Graph tags)
- ✅ Mobile responsive design
- ✅ Real-time server status integration
- ✅ Security headers configured
- ✅ Zero build process required
- ✅ Free tier compatible

## 🆘 Common Issues

**Q: Files not loading after deployment?**
- Ensure `public/` directory contains all files
- Verify `output_dir` in app.yaml is `/public`

**Q: How to update the site?**
- Just push changes to the main branch
- DigitalOcean auto-deploys (if configured)

**Q: How to add custom domain?**
- See [DEPLOY.md](DEPLOY.md) - Custom Domain Setup section

**Q: Server shows 404?**
- Check that server.js serves from `public/` directory
- Verify file paths are correct

## 📚 Documentation

- [README.md](README.md) - Full documentation
- [DEPLOY.md](DEPLOY.md) - Deployment guide
- [IMPROVEMENTS.md](IMPROVEMENTS.md) - Development roadmap

## 🔗 Useful Links

- [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
- [DigitalOcean Docs](https://docs.digitalocean.com/products/app-platform/)
- [GitHub Repository](https://github.com/LetsUpdate/SurdMCLandingPage)
