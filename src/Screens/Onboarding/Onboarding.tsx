import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { COLORS } from "@/constants/theme";
import { OnboardingPage1 } from "./OnboardingPage1";
import { OnboardingPage2 } from "./OnboardingPage2";
import { OnboardingPage3 } from "./OnboardingPage3";
import { OnboardingPage4 } from "./OnboardingPage4";
import { OnboardingPage5 } from "./OnboardingPage5";

const { width } = Dimensions.get("window");

export const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onboardingPages = [
    <OnboardingPage1 />,
    <OnboardingPage2 />,
    <OnboardingPage3 />,
    <OnboardingPage4 />,
    <OnboardingPage5 />,
  ];

  const handleNext = () => {
    if (currentIndex < onboardingPages.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Navigate to main app when onboarding is complete
      navigation.replace(RootScreens.MAIN);
    }
  };

  const handleSkip = () => {
    navigation.replace(RootScreens.MAIN);
  };

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const renderItem = ({ item }: { item: JSX.Element }) => {
    return <View style={styles.pageContainer}>{item}</View>;
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingPages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex ? COLORS.primary : "#D9D9D9",
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const getButtonText = () => {
    return currentIndex === onboardingPages.length - 1
      ? "Hoàn thành"
      : "Tiếp theo";
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingPages}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>

        {renderDots()}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>{getButtonText()}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  pageContainer: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  nextText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});
