import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { OnboardingContainer } from "@/Screens/Onboarding";
import { LoginContainer } from "@/Screens/Login";
import { RegisterContainer } from "@/Screens/Register";
import { ForgotPasswordContainer } from "@/Screens/ForgotPassword";
import { EditProfile, Settings } from "@/Screens/Profile";
import { RootScreens } from "@/Screens";
import { AuthGuard } from "@/Components";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.REGISTER]: undefined;
  [RootScreens.FORGOT_PASSWORD]: undefined;
  [RootScreens.HOME]: undefined;
  [RootScreens.STUDY]: undefined;
  [RootScreens.FORUM]: undefined;
  [RootScreens.CHAT]: undefined;
  [RootScreens.PROFILE]: undefined;
  [RootScreens.EDIT_PROFILE]: undefined;
  [RootScreens.SETTINGS]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <AuthGuard>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={RootScreens.WELCOME}
        >
          <RootStack.Screen
            name={RootScreens.WELCOME}
            component={WelcomeContainer}
          />
          <RootStack.Screen
            name={RootScreens.ONBOARDING}
            component={OnboardingContainer}
          />
          <RootStack.Screen
            name={RootScreens.LOGIN}
            component={LoginContainer}
          />
          <RootStack.Screen
            name={RootScreens.REGISTER}
            component={RegisterContainer}
          />
          <RootStack.Screen
            name={RootScreens.FORGOT_PASSWORD}
            component={ForgotPasswordContainer}
          />
          <RootStack.Screen
            name={RootScreens.MAIN}
            component={MainNavigator}
            options={{}}
          />
          <RootStack.Screen
            name={RootScreens.EDIT_PROFILE}
            component={EditProfile}
            options={{}}
          />
          <RootStack.Screen
            name={RootScreens.SETTINGS}
            component={Settings}
            options={{}}
          />
        </RootStack.Navigator>
      </AuthGuard>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
export default ApplicationNavigator;
