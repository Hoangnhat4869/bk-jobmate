# Environment Configuration Guide

## Overview

BKJobmate supports multiple environments (local, staging, production) with flexible configuration through environment variables. This allows you to easily switch between different API endpoints and settings without code changes.

## Quick Start

### 1. Choose Your Environment

```bash
# For local development
npm run env:local

# For staging
npm run env:staging

# For production
npm run env:production
```

### 2. Start the App

```bash
# Start with current environment
npm start

# Or start with specific environment
npm run start:local      # Local development
npm run start:staging    # Staging environment
npm run start:production # Production environment
```

## Environment Files

### Available Templates

- `.env.local.example` - Local development configuration
- `.env.staging.example` - Staging environment configuration
- `.env.production.example` - Production environment configuration
- `.env.example` - Default/production configuration

### Environment Variables

| Variable                               | Description                    | Default                 |
| -------------------------------------- | ------------------------------ | ----------------------- |
| `EXPO_PUBLIC_BASE_URL`                 | API base URL                   | `https://api.cyese.me/` |
| `EXPO_PUBLIC_ENVIRONMENT`              | Current environment            | `production`            |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`     | Google OAuth Web Client ID     | -                       |
| `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` | Google OAuth Android Client ID | -                       |
| `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`     | Google OAuth iOS Client ID     | -                       |
| `EXPO_PUBLIC_DEV_MODE`                 | Enable development features    | `false`                 |
| `EXPO_PUBLIC_DEBUG_API`                | Enable API debugging           | `false`                 |

## Environment-Specific Configurations

### Local Development

```env
EXPO_PUBLIC_BASE_URL=http://localhost:3000/api/
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_DEV_MODE=true
EXPO_PUBLIC_DEBUG_API=true
```

**Features:**

- Points to local development server
- Debug mode enabled
- Development tools available
- Detailed API logging

### Staging

```env
EXPO_PUBLIC_BASE_URL=https://staging-api.cyese.me/
EXPO_PUBLIC_ENVIRONMENT=staging
EXPO_PUBLIC_DEV_MODE=false
EXPO_PUBLIC_DEBUG_API=true
```

**Features:**

- Points to staging server
- Debug mode for testing
- Production-like environment
- API logging enabled

### Production

```env
EXPO_PUBLIC_BASE_URL=https://api.cyese.me/
EXPO_PUBLIC_ENVIRONMENT=production
EXPO_PUBLIC_DEV_MODE=false
EXPO_PUBLIC_DEBUG_API=false
```

**Features:**

- Points to production server
- Optimized performance
- No debug logging
- Production security settings

## CLI Tools

### Environment Switcher Script

```bash
# Interactive mode
npm run env:switch

# Direct switch
npm run env:local
npm run env:staging
npm run env:production
```

### PowerShell Script (Windows)

```powershell
# Show available environments
.\scripts\switch-env.ps1

# Switch to specific environment
.\scripts\switch-env.ps1 local
.\scripts\switch-env.ps1 staging
.\scripts\switch-env.ps1 production
```

### Node.js Script (Cross-platform)

```bash
# Show available environments
node scripts/switch-env.js

# Switch to specific environment
node scripts/switch-env.js local
node scripts/switch-env.js staging
node scripts/switch-env.js production
```

## Setup Instructions

### 1. Initial Setup

1. Choose your target environment
2. Copy the appropriate template file to `.env`
3. Fill in your actual values (Google OAuth client IDs, etc.)

```bash
# Example for local development
cp .env.local.example .env
# Edit .env with your actual values
```

### 2. Google OAuth Setup

For each environment, you'll need separate Google OAuth client IDs:

1. **Development:** Use web client ID for Expo Go
2. **Staging:** Separate client IDs for staging domain
3. **Production:** Production client IDs for app store builds

### 3. Verify Configuration

The app will log environment information in debug mode:

```
🔧 Environment Configuration:
  Environment: development
  Base URL: http://localhost:3000/api/
  Debug Mode: true
  Dev Mode: true
```

## Best Practices

### Security

- ❌ Never commit `.env` files to version control
- ✅ Use separate client IDs for each environment
- ✅ Keep production secrets secure
- ✅ Use environment-specific redirect URIs

### Development Workflow

1. **Start with local environment** for development
2. **Test on staging** before production deployment
3. **Switch to production** only for releases
4. **Use debug mode** for troubleshooting

### Environment Management

- Keep `.env.*.example` files updated
- Document any new environment variables
- Test all environments before deployment
- Use consistent naming conventions

## Troubleshooting

### Common Issues

1. **Environment not switching:**

   - Check if `.env` file was created
   - Restart Expo development server
   - Clear Expo cache: `expo start --clear`

2. **API calls failing:**

   - Verify `EXPO_PUBLIC_BASE_URL` is correct
   - Check if backend server is running
   - Enable debug mode to see detailed logs

3. **Google OAuth not working:**
   - Verify client IDs for current environment
   - Check redirect URIs in Google Console
   - Ensure environment-specific configuration

### Debug Commands

```bash
# Check current environment
npm run env:switch

# Start with debug logging
EXPO_PUBLIC_DEBUG_API=true npm start

# Clear cache and restart
expo start --clear
```

## Advanced Configuration

### Custom Environment Variables

You can add custom environment variables by:

1. Adding them to `.env.*.example` files
2. Updating `src/Config/index.ts`
3. Using `EnvironmentConfig` utility if needed

### Environment Detection

```typescript
import { Config } from "@/Config";
import { EnvironmentConfig } from "@/utils/EnvironmentConfig";

// Check current environment
if (EnvironmentConfig.isDevelopment()) {
  // Development-specific code
}

// Access configuration
const apiUrl = Config.BASE_URL;
const isDebug = Config.DEBUG_API;
```

## Migration Guide

### From Single Environment

If you were using a single API URL:

1. Replace hardcoded URLs with `Config.BASE_URL`
2. Create environment-specific `.env` files
3. Update your deployment scripts
4. Test each environment

### Adding New Environment

1. Create `.env.newenv.example` file
2. Add switch script for new environment
3. Update documentation
4. Test the new configuration

---

For more information, see:

- [Google OAuth Setup Guide](./GOOGLE_AUTH_SETUP.md)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [React Native Configuration](https://reactnative.dev/docs/environment-variables)
