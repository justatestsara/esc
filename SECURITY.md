# Security Implementation Guide

## Admin Panel Security

### Current Security Features

1. **Secure Authentication**
   - Password authentication via API routes (not client-side)
   - HTTP-only cookies for session tokens
   - Rate limiting (5 attempts per 15 minutes)
   - Secure token generation

2. **Protected Routes**
   - Middleware protection for admin routes
   - Server-side authentication verification
   - Automatic redirect for unauthorized access

3. **Data Protection**
   - Sensitive data should be stored server-side (not in localStorage)
   - Encryption utilities available for sensitive data
   - API routes protected with authentication checks

### Setup Instructions

1. **Set Environment Variables**

   Create a `.env.local` file in the project root:

   ```env
   ADMIN_USERNAME=your-admin-username
   ADMIN_PASSWORD=your-secure-password
   ADMIN_SALT=random-salt-string-change-this
   NODE_ENV=production
   ```

2. **Generate Password Hash** (Optional but recommended)

   For production, generate a password hash:

   ```bash
   node -e "const crypto = require('crypto'); const password = 'your-password'; const salt = 'your-salt'; console.log(crypto.createHash('sha256').update(password + salt).digest('hex'))"
   ```

   Then set `ADMIN_PASSWORD_HASH` in your `.env.local` file.

3. **Secure Your Data Storage**

   **IMPORTANT**: Currently, ads and contact submissions are stored in browser localStorage, which is:
   - Publicly accessible via browser DevTools
   - Not secure for production use
   - Lost when browser data is cleared

   **Recommended**: Move to server-side database:
   - Use PostgreSQL, MySQL, or MongoDB
   - Store images on cloud storage (AWS S3, Cloudinary, etc.)
   - Implement proper database access controls

4. **Production Checklist**

   - [ ] Set strong `ADMIN_PASSWORD` in environment variables
   - [ ] Set `ADMIN_PASSWORD_HASH` for extra security
   - [ ] Change `ADMIN_SALT` to a random string
   - [ ] Move data storage from localStorage to database
   - [ ] Store images on cloud storage (not base64 in localStorage)
   - [ ] Enable HTTPS in production
   - [ ] Set up proper CORS policies
   - [ ] Implement database backups
   - [ ] Set up monitoring and logging
   - [ ] Regular security audits

### Security Best Practices

1. **Never commit `.env.local` to git**
2. **Use strong passwords** (minimum 12 characters, mixed case, numbers, symbols)
3. **Rotate passwords regularly**
4. **Monitor login attempts** (rate limiting is implemented)
5. **Use HTTPS in production** (required for secure cookies)
6. **Keep dependencies updated**
7. **Implement proper database access controls**
8. **Encrypt sensitive data at rest**

### Current Limitations

- Password hashing uses SHA-256 (consider bcrypt for production)
- Rate limiting is in-memory (resets on server restart)
- Data stored in localStorage (move to database)
- Images stored as base64 (move to cloud storage)

### Next Steps for Production

1. Install database (PostgreSQL recommended)
2. Create database schema for ads and contacts
3. Implement image upload to cloud storage
4. Replace localStorage with database queries
5. Add proper error logging
6. Implement audit logging for admin actions
7. Set up automated backups

