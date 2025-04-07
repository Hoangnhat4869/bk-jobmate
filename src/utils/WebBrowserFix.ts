import * as WebBrowser from 'expo-web-browser';

/**
 * This function should be called at the root of your app to properly handle
 * the AuthSession redirect. It will close the authentication window when
 * the authentication flow is complete.
 */
export function maybeCompleteAuthSession() {
  try {
    return WebBrowser.maybeCompleteAuthSession();
  } catch (error) {
    console.warn('Error in maybeCompleteAuthSession:', error);
    return { type: 'failed' };
  }
}
