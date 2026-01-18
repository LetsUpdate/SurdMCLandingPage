# Deployment Guide - DigitalOcean App Platform

This guide will help you deploy the SurdMC Landing Page to DigitalOcean App Platform with just a few clicks.

## 🚀 Quick Deploy (1-Click)

### Prerequisites
- A [DigitalOcean account](https://cloud.digitalocean.com/registrations/new)
- This repository forked or accessible in your GitHub account

### Step-by-Step Deployment

1. **Sign in to DigitalOcean**
   - Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click **"Create App"**

2. **Connect GitHub Repository**
   - Select **GitHub** as your source
   - Authorize DigitalOcean to access your GitHub account
   - Select this repository: `LetsUpdate/SurdMCLandingPage`
   - Choose the branch (usually `main`)
   - Click **"Next"**

3. **Review Configuration**
   - DigitalOcean will **automatically detect** the `.do/app.yaml` file
   - The configuration will show:
     - **Type**: Static Site
     - **Output Directory**: `public`
     - **Build Command**: None (static files)
   - Click **"Next"**

4. **Configure App Settings**
   - **App Name**: `surdmc-landing-page` (or customize)
   - **Region**: Frankfurt (fra) - or choose your preferred region
   - Click **"Next"**

5. **Review and Deploy**
   - Review the plan (Static sites are **FREE** on DigitalOcean)
   - Click **"Create Resources"**
   - Wait 2-3 minutes for deployment to complete

6. **Access Your Site**
   - Once deployed, DigitalOcean will provide a URL like:
     - `https://surdmc-landing-page-xxxxx.ondigitalocean.app`
   - You can add a custom domain later in the App settings

## 🔧 Configuration Details

### Static Site Configuration

The repository includes a pre-configured `.do/app.yaml` file with the following settings:

```yaml
name: surdmc-landing-page
region: fra

static_sites:
  - name: surdmc-static
    github:
      repo: LetsUpdate/SurdMCLandingPage
      branch: main
      deploy_on_push: true
    output_dir: public
    catchall_document: index.html
    error_document: index.html
```

### What This Configuration Does:
- ✅ Deploys as a **static website** (no server required)
- ✅ Uses the `public/` directory as the web root
- ✅ Automatically deploys when you push to the `main` branch
- ✅ Sets up proper routing with `index.html` as catchall
- ✅ Handles 404 errors gracefully
- ✅ Deploys to Frankfurt region (low latency for EU users)

## 🌍 Custom Domain Setup

After deployment, you can add your custom domain:

1. Go to your App in DigitalOcean
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Enter your domain (e.g., `surdmc.eu`)
5. Follow the DNS configuration instructions
6. Wait for DNS propagation (usually 5-30 minutes)

### DNS Configuration for surdmc.eu

Add these DNS records in your domain registrar:

- **Type**: A Record
- **Name**: @ (or leave blank)
- **Value**: (IP provided by DigitalOcean)

OR for CNAME:

- **Type**: CNAME
- **Name**: www
- **Value**: `surdmc-landing-page-xxxxx.ondigitalocean.app`

## 💰 Pricing

- **Static Sites**: **FREE** (up to 3 static sites)
- **Bandwidth**: 100 GB/month included
- **Build Minutes**: Unlimited for static sites

No credit card required for the free tier!

## 🔄 Automatic Deployments

Once set up:
- Every push to the `main` branch automatically triggers a deployment
- Deployment typically takes 1-2 minutes
- You can view deployment logs in the DigitalOcean dashboard

## 🐛 Troubleshooting

### Site shows 404 error
- Check that the `public/` directory contains all your files
- Verify the `output_dir` in `.do/app.yaml` is set to `public`

### Deployment fails
- Check deployment logs in DigitalOcean dashboard
- Ensure `.do/app.yaml` syntax is correct
- Verify GitHub repository permissions

### CSS/Images not loading
- Check file paths in `index.html` are relative
- Verify all assets are in the `public/` directory

## 📚 Additional Resources

- [DigitalOcean App Platform Documentation](https://docs.digitalocean.com/products/app-platform/)
- [Static Site Deployment Guide](https://docs.digitalocean.com/products/app-platform/how-to/manage-static-sites/)
- [Custom Domains Guide](https://docs.digitalocean.com/products/app-platform/how-to/manage-domains/)

## 🆘 Support

For issues with this deployment:
- Check the [GitHub Issues](https://github.com/LetsUpdate/SurdMCLandingPage/issues)
- Contact DigitalOcean support for platform-specific issues

---

**Ready to deploy?** [Get started with DigitalOcean App Platform](https://cloud.digitalocean.com/apps) 🚀
