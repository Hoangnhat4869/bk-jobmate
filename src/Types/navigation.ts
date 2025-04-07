import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootScreens } from "@/Screens";
import { RootStackParamList } from "@/Navigation";

// Define the param list for the main tab navigator
export type MainTabParamList = {
  Home: undefined;
  Study: undefined;
  Forum: undefined;
  Chat: undefined;
  Profile: undefined;
};

// Define the navigation prop types for the main tab screens
export type MainTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

// Define screen-specific navigation props
export type HomeScreenNavigationProp = MainTabNavigationProp;
export type StudyScreenNavigationProp = MainTabNavigationProp;
export type ForumScreenNavigationProp = MainTabNavigationProp;
export type ChatScreenNavigationProp = MainTabNavigationProp;
export type ProfileScreenNavigationProp = MainTabNavigationProp;

// Define route prop types
export type HomeScreenRouteProp = RouteProp<MainTabParamList, "Home">;
export type StudyScreenRouteProp = RouteProp<MainTabParamList, "Study">;
export type ForumScreenRouteProp = RouteProp<MainTabParamList, "Forum">;
export type ChatScreenRouteProp = RouteProp<MainTabParamList, "Chat">;
export type ProfileScreenRouteProp = RouteProp<MainTabParamList, "Profile">;

// Define screen props that combine navigation and route props
export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export type StudyScreenProps = {
  navigation: StudyScreenNavigationProp;
  route: StudyScreenRouteProp;
};

export type ForumScreenProps = {
  navigation: ForumScreenNavigationProp;
  route: ForumScreenRouteProp;
};

export type ChatScreenProps = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
};
