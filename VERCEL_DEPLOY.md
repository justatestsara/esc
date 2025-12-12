# Deploy to Vercel - Instructions

## Option 1: GitHub Integration (Recommended)

1. **Commit and push your code to GitHub:**
   ```bash
   git add .
   git commit -m "SEO optimized version ready for Vercel"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository: `justatestsara/esc`
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Set Environment Variables** (if needed):
   - In Vercel dashboard → Project Settings → Environment Variables
   - Add: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SALT`
   - Redeploy

## Option 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **For production:**
   ```bash
   vercel --prod
   ```

## Option 3: Vercel Dashboard

1. Go to https://vercel.com/new
2. Import Git Repository
3. Select your repo
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `escort-de-seo` (if in subfolder)
5. Deploy

## Important Notes

- **Environment Variables**: Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SALT` in Vercel dashboard
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Node Version**: 18.x or higher

## After Deployment

Your site will be available at:
- Preview: `https://your-project-name.vercel.app`
- Production: `https://your-project-name.vercel.app` (after `vercel --prod`)

## Troubleshooting

If build fails:
1. Check `package.json` has all dependencies
2. Ensure `next.config.js` is correct
3. Check Vercel build logs for errors

