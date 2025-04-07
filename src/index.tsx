import React from "react";
import * as Localization from "expo-localization";
import { i18n, Language } from "@/Localization";
import { NativeBaseProvider, extendTheme } from "native-base";
import { store, persistor } from "@/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApplicationNavigator } from "./Navigation";
import { AuthProvider } from "./Context/AuthContext";
import { UserProvider } from "./Context/UserContext";
import { maybeCompleteAuthSession } from "./utils/WebBrowserFix";

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

// Handle the redirect from the authentication flow
maybeCompleteAuthSession();

// Define the config for NativeBase
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// Extend the theme
const customTheme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <UserProvider>
              <ApplicationNavigator />
            </UserProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
