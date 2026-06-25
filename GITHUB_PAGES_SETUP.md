# GitHub Pages Deployment Guide

Your portfolio is now ready to be deployed to GitHub Pages! 🚀

## What Was Done

✅ Built the project for production  
✅ Created a `docs/` folder with all built files  
✅ Added `404.html` for client-side routing support  
✅ Committed everything to git

## Next Steps: Enable GitHub Pages

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/YOUR_USERNAME/designer_portfolio`

2. **Open Settings**
   - Click on "Settings" tab (top right)

3. **Find Pages Section**
   - Scroll down to "Pages" in the left sidebar
   - Or go directly to: `https://github.com/YOUR_USERNAME/designer_portfolio/settings/pages`

4. **Configure GitHub Pages**
   - Under "Source", select **Deploy from a branch**
   - Under "Branch", select **main** and **/docs** folder
   - Click **Save**

5. **Wait for Deployment**
   - GitHub will build and deploy your site
   - You'll see a green checkmark when it's done
   - Your site will be available at: `https://YOUR_USERNAME.github.io/designer_portfolio/`

## Why the `docs/` Folder?

GitHub Pages looks for either:
- A `gh-pages` branch, OR
- A `/docs` folder in the main branch

We used the `/docs` folder because it's simpler and keeps everything in one place.

## The 404.html File

This file is crucial for client-side routing! Since your portfolio uses React Router (Wouter), all routes need to redirect back to `index.html`. The `404.html` file handles this automatically.

## Updating Your Site

Every time you want to update your site:

```bash
# Make your changes
# ... edit files ...

# Build the project
pnpm build

# Copy built files to docs
cp -r dist/public/* docs/

# Commit and push
git add docs/
git commit -m "Update portfolio"
git push origin main
```

Or create a GitHub Actions workflow to automate this (ask if you want help with that!).

## Troubleshooting

**Site shows 404?**
- Wait a few minutes for GitHub to deploy
- Check that the `/docs` folder is selected in Settings → Pages
- Make sure `index.html` exists in the `docs/` folder

**Routes not working?**
- Verify `404.html` exists in the `docs/` folder
- It should be identical to `index.html`

**Assets not loading?**
- Check browser console for 404 errors
- Ensure all files are in the `docs/` folder
- Try clearing browser cache

## Custom Domain (Optional)

If you have a custom domain:

1. Go to Settings → Pages
2. Under "Custom domain", enter your domain
3. Update your domain's DNS settings (GitHub will show instructions)
4. GitHub will automatically create an HTTPS certificate

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-common-issues-with-github-pages)

---

**Your portfolio is ready to go live!** 🎉
