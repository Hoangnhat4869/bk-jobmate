# bk-jobmate

This is Mobile Development - semester 242 assignment.

# React Native Expo Redux Template

[![NPM Version](https://img.shields.io/npm/v/react-native-expo-redux-template)](https://www.npmjs.com/package/react-native-expo-redux-template)
[![Build Expo OTA](https://github.com/hpccbk/react-native-expo-redux-template/actions/workflows/update.yml/badge.svg)](https://github.com/hpccbk/react-native-expo-redux-template/actions/workflows/update.yml)

This is a template for building React Native apps with the Expo framework and Redux for state management. It includes a basic file structure and configuration for setting up a Redux store, along with some example actions and reducers.

## Environment Configuration

The app supports multiple environments through environment variables. You can configure different API endpoints and settings for development, staging, and production.

### Setup Environment Variables

1. **For Local Development:**

   ```bash
   cp .env.local.example .env
   ```

   Then edit `.env` with your local API endpoint (e.g., `http://localhost:3000/api/`)

2. **For Production:**
   ```bash
   cp .env.production.example .env
   ```
   Then edit `.env` with your production API endpoint (e.g., `https://api.cyese.me/`)

### Available Environment Variables

- `EXPO_PUBLIC_BASE_URL`: The base URL for API calls
- `EXPO_PUBLIC_ENVIRONMENT`: Current environment (development/staging/production)
- `EXPO_PUBLIC_GOOGLE_*_CLIENT_ID`: Google OAuth client IDs for different platforms
- `EXPO_PUBLIC_DEV_MODE`: Enable development mode features
- `EXPO_PUBLIC_DEBUG_API`: Enable API debugging

### Example Configurations

**Local Development:**

```env
EXPO_PUBLIC_BASE_URL=http://localhost:3000/api/
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_DEV_MODE=true
EXPO_PUBLIC_DEBUG_API=true
```

**Production:**

```env
EXPO_PUBLIC_BASE_URL=https://api.cyese.me/
EXPO_PUBLIC_ENVIRONMENT=production
EXPO_PUBLIC_DEV_MODE=false
EXPO_PUBLIC_DEBUG_API=false
```

## Getting Started

To use this template, you should have the Expo CLI installed on your system. You can install it globally using npm:

```bash
npm install -g expo-cli
```

To create a new project using this template, please clone this repository. Then run:

```bash
yarn install
```

## File Structure

The template's file structure is organized as follows:

- `src/`: This folder contains the source code for the template, organized into sub-folders as follows:

  - `Components/`: This folder contains reusable components for the app.

  - `Config/`: This folder contains configuration files for the app, such as API endpoints, environment settings, and theme configuration.

  - `Hooks/`: This folder contains Redux and custom hooks for the app.

  - `Localization/`: This folder contains localization files for the app, allowing for easy translation to different languages.

  - `Navigation/`: This folder contains navigation files for the app, such as stack navigation, drawer navigation, or tab navigation.

  - `Screens/`: This folder contains the main screens of the app.

  - `Services/`: This folder contains service files for the app, such as API calls or Firebase integration.

  - `Store/`: This folder contains Redux-related files, including the store configuration and reducers.

  - `Theme/`: This folder contains files related to the app's visual theme, such as colors, typography, and spacing.

## Known Issues

```js
ApiV2Error: Not Authorized.
```

Reason and how to remove this issue: https://github.com/expo/expo-cli/issues/2436#issuecomment-1308534521

## Contributing

If you have suggestions for how this template could be improved, or want to report a bug, please open an issue or a pull request. We welcome contributions from the community!
