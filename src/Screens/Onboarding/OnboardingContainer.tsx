import React from "react";
import { Onboarding } from "./Onboarding";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type OnboardingScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING
>;

export const OnboardingContainer = ({
  navigation,
}: OnboardingScreenNavigatorProps) => {
  return <Onboarding />;
};
