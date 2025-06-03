import React from "react";
import { Start } from "./Start";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type StartScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.START
>;

export const StartContainer = ({
  navigation,
}: StartScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Start onNavigate={onNavigate} />;
};
