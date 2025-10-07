# Environment Variables Configuration

This file documents all the environment variables needed for the Password Vault application.

## Quick Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in the `.env` file

## Required Environment Variables

### Database Configuration
- **MONGODB_URI**: Your MongoDB Atlas connection string
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?options`
  - Get this from your MongoDB Atlas dashboard

### Authentication Configuration  
- **NEXTAUTH_URL**: The base URL of your application
  - Development: `http://localhost:3000`
  - Production: `https://your-domain.com`

- **NEXTAUTH_SECRET**: A random string used to encrypt JWT tokens
  - Generate with: `openssl rand -base64 32`
  - Must be at least 32 characters

### Encryption Configuration
- **ENCRYPTION_KEY**: Used for client-side password encryption
  - Must be exactly 32 characters
  - Generate a strong random string

### Optional Variables
- **NODE_ENV**: Application environment (`development` | `production`)
- **NEXT_TELEMETRY_DISABLED**: Set to `1` to disable Next.js telemetry

## File Hierarchy
- `.env.local` - Takes precedence, used for local development secrets
- `.env` - Default environment variables, can be committed
- `.env.example` - Template file showing required variables (safe to commit)

## Security Notes
- Never commit `.env` or `.env.local` files with real secrets
- Use different values for development and production
- Regularly rotate your secrets in production
- The `ENCRYPTION_KEY` should be unique per environment