import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { StudyStackNavigator } from "@/Navigation/Study";
import { ForumContainer } from "@/Screens/Forum";
import { ChatContainer } from "@/Screens/Chat";
import { ProfileContainer } from "@/Screens/Profile";
import { MainTabParamList } from "@/Types/navigation";
import { Home, Study, Forum, Chat, User } from "@/assets/svgs";
import { COLORS } from "@/constants/theme";

const Tab = createBottomTabNavigator<MainTabParamList>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // Sử dụng các biểu tượng SVG thay vì Ionicons
          if (route.name === "Home") {
            return <Home width={size} height={size} color={color} />;
          } else if (route.name === "Study") {
            return <Study width={size} height={size} color={color} />;
          } else if (route.name === "Forum") {
            return <Forum width={size} height={size} color={color} />;
          } else if (route.name === "Chat") {
            return <Chat width={size} height={size} color={color} />;
          } else if (route.name === "Profile") {
            return <User width={size} height={size} color={color} />;
          }

          return null;
        },
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 5,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          title: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Study"
        component={StudyStackNavigator}
        options={{
          title: "Luyện tập",
        }}
      />
      <Tab.Screen
        name="Forum"
        component={ForumContainer}
        options={{
          title: "Diễn đàn",
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatContainer}
        options={{
          title: "Phòng vấn",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
        options={{
          title: "Tôi",
        }}
      />
    </Tab.Navigator>
  );
};
