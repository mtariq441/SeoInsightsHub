# Vercel Deployment Guide

This guide will help you deploy your application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your Supabase project credentials

## Environment Variables

Before deploying, you need to configure the following environment variables in your Vercel project settings:

### Required Variables

1. **VITE_SUPABASE_URL**
   - Your Supabase project URL
   - Find this in your Supabase dashboard: Project Settings → API
   - Example: `https://your-project.supabase.co`

2. **VITE_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public API key
   - Find this in your Supabase dashboard: Project Settings → API
   - This is safe to expose in the frontend

### Optional Variables

3. **DATABASE_URL** (only if using Neon database for server-side operations)
   - Your Neon database connection string
   - Format: `postgresql://user:password@host/database`

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Add the required environment variables in the project settings:
   - Go to Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Add environment variables via CLI:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

5. Redeploy to apply environment variables:
   ```bash
   vercel --prod
   ```

## Post-Deployment Verification

After deployment, verify that everything works:

1. **Check the health endpoint:**
   - Visit: `https://your-domain.vercel.app/api/health`
   - Expected response: `{"status":"ok","message":"Server is running"}`

2. **Test authentication:**
   - Open your deployed application
   - Try signing up/signing in with Supabase authentication
   - Verify that users can authenticate successfully

3. **Check browser console:**
   - Open developer tools
   - Look for any errors related to environment variables
   - Verify Supabase client initializes correctly

## Project Structure

The deployment uses the following configuration:

- **Frontend:** Vite + React app (built to `dist/public`)
- **API Routes:** Vercel serverless functions in `/api` directory
- **Database:** Supabase (client-side authentication)
- **Static Assets:** Served from Vercel's CDN

## Troubleshooting

### "Missing Supabase environment variables" error

- Verify that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in Vercel project settings
- Redeploy after adding environment variables
- Check that variable names match exactly (case-sensitive)

### API endpoint returns 404

- Verify that `/api/health.ts` exists in your repository
- Check that `vercel.json` is properly configured
- Serverless functions should be in the `/api` directory at the root level

### Application doesn't load

- Check Vercel deployment logs for build errors
- Verify that the build command completed successfully
- Ensure `dist/public` directory was created during build

### Authentication not working

- Verify Supabase environment variables are correct
- Check that your Supabase project allows the Vercel domain in the URL allowlist
- Go to Supabase Dashboard → Authentication → URL Configuration
- Add your Vercel domain (e.g., `https://your-app.vercel.app`)

## Local Development vs. Production

- **Local (Replit):** Uses Express server with Vite middleware
- **Production (Vercel):** Uses static hosting + serverless functions

Both environments work with the same codebase thanks to the configuration in `vercel.json`.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## Need Help?

If you encounter issues not covered in this guide:
1. Check Vercel deployment logs in the dashboard
2. Review Vercel's troubleshooting documentation
3. Check Supabase status page for any outages
