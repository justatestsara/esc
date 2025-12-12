# Security Setup Instructions

## Quick Start

1. **Create `.env.local` file** in the project root:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-very-secure-password-here
ADMIN_SALT=random-salt-string-change-this-to-something-random
NODE_ENV=production
```

2. **Important Security Notes**:

   - ⚠️ **Never commit `.env.local` to git** (already in `.gitignore`)
   - ⚠️ **Change the default password** immediately
   - ⚠️ **Use a strong password** (12+ characters, mixed case, numbers, symbols)
   - ⚠️ **Data is still in localStorage** - Move to database for production

## Current Security Features

✅ **Implemented:**
- Server-side authentication API
- HTTP-only secure cookies
- Rate limiting (5 attempts per 15 minutes)
- Protected admin routes via middleware
- Environment variable configuration
- Password hashing (SHA-256, upgrade to bcrypt for production)

⚠️ **Still Needs Work:**
- Move data from localStorage to database
- Store images on cloud storage (not base64)
- Implement proper password hashing (bcrypt)
- Add database access controls

## Testing the Security

1. Try logging in with wrong password 5 times - should be rate limited
2. Try accessing `/adm2211/dashboard` without logging in - should redirect
3. Check browser cookies - `admin_token` should be httpOnly

## Production Checklist

- [ ] Set strong password in `.env.local`
- [ ] Change `ADMIN_SALT` to random string
- [ ] Move data storage to database
- [ ] Store images on cloud storage
- [ ] Enable HTTPS
- [ ] Set up monitoring

See `SECURITY.md` for detailed information.

