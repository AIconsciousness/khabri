# Vercel Deployment Guide for Khabri News

## Step-by-Step Deployment Instructions

### 1. Prerequisites
- GitHub repository: https://github.com/AIconsciousness/khabri
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas database ready

### 2. Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository: `AIconsciousness/khabri`
4. Click "Import"

### 3. Configure Environment Variables

⚠️ **IMPORTANT**: Add these environment variables in Vercel Dashboard before deploying.

Go to: **Project Settings → Environment Variables**

#### Required Environment Variables:

```env
# Database - MongoDB Atlas
MONGODB_URI=mongodb+srv://kamleshsharmathink:Kamlesh%40%232005@cluster0.lpwxhp7.mongodb.net/khabri?retryWrites=true&w=majority&appName=Cluster0

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=https://your-app-name.vercel.app

# Google OAuth (Optional - leave empty if not using)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Razorpay (Optional - for payments)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Email Service (Optional - Resend)
RESEND_API_KEY=

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_ADSENSE_ID=

# Redis (Optional - for caching)
REDIS_URL=
```

### 4. Generate NEXTAUTH_SECRET

Run this command in terminal to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online: https://generate-secret.vercel.app/32

### 5. Update NEXTAUTH_URL

Replace with your actual Vercel URL:
```
NEXTAUTH_URL=https://khabri-your-username.vercel.app
```

### 6. Deploy

1. After adding all environment variables, click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Once deployed, you'll get your live URL

### 7. Post-Deployment

#### Test Your Deployment:

1. **Homepage**: `https://your-app.vercel.app`
2. **Login**: `https://your-app.vercel.app/login`
3. **Register**: `https://your-app.vercel.app/register`
4. **Categories**: `https://your-app.vercel.app/category/politics`

#### Verify MongoDB Connection:

1. Go to Register page
2. Create a test account
3. Check MongoDB Atlas → Database → Collections → users
4. You should see the new user

### 8. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., khabri.com)
3. Update DNS settings as instructed
4. Update `NEXTAUTH_URL` environment variable with new domain

### 9. Troubleshooting

#### Build Errors:

**Error**: "Missing DATABASE_URL"
**Solution**: We're using MongoDB, not Prisma. Make sure `MONGODB_URI` is set.

**Error**: "Module not found"
**Solution**: Clear build cache in Vercel and redeploy.

**Error**: "Memory allocation failed"
**Solution**: Already optimized in `next.config.js`. Vercel has enough memory.

#### Runtime Errors:

**Error**: "MongoDB connection failed"
**Solution**:
1. Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Vercel)
2. Verify MONGODB_URI in environment variables
3. Check MongoDB cluster is running

**Error**: "NextAuth configuration error"
**Solution**:
1. Verify `NEXTAUTH_SECRET` is set
2. Verify `NEXTAUTH_URL` matches your deployment URL
3. Redeploy after updating

### 10. Performance Optimization

✅ Already configured in the project:
- Image optimization disabled for memory savings
- Webpack cache optimized
- Build settings optimized for Vercel

### 11. Monitoring

- **Vercel Dashboard**: Monitor deployments and logs
- **MongoDB Atlas**: Monitor database connections and queries
- **Vercel Analytics**: Enable in project settings (optional)

### 12. Continuous Deployment

✅ Automatic deployments enabled:
- Push to `main` branch → Auto-deploys to production
- Create preview deployments for pull requests

---

## Quick Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| MONGODB_URI | ✅ Yes | MongoDB Atlas connection string |
| NEXTAUTH_SECRET | ✅ Yes | Random secret for NextAuth |
| NEXTAUTH_URL | ✅ Yes | Your Vercel deployment URL |
| GOOGLE_CLIENT_ID | ❌ No | For Google OAuth login |
| GOOGLE_CLIENT_SECRET | ❌ No | For Google OAuth login |
| CLOUDINARY_* | ❌ No | For image uploads |
| RAZORPAY_* | ❌ No | For payment processing |

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Verify all environment variables are set correctly
4. Try redeploying with cache cleared

---

🎉 **Your Khabri News website should now be live on Vercel!**

Live URL: https://khabri-your-username.vercel.app
