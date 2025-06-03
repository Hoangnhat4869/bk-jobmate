import React, { useState, useRef, useCallback } from "react";
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
  const onboardingData = [
    { id: "1", component: OnboardingPage1 },
    { id: "2", component: OnboardingPage2 },
    { id: "3", component: OnboardingPage3 },
    { id: "4", component: OnboardingPage4 },
    { id: "5", component: OnboardingPage5 },
  ];
  const handleNext = useCallback(() => {
    console.log(
      "handleNext called, currentIndex:",
      currentIndex,
      "total pages:",
      onboardingData.length
    );
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      console.log("Scrolling to index:", nextIndex);

      // Cập nhật state trước khi scroll
      setCurrentIndex(nextIndex);

      // Sử dụng scrollToOffset thay vì scrollToIndex
      flatListRef.current?.scrollToOffset({
        offset: width * nextIndex,
        animated: true,
      });
    } else {
      console.log("Navigating to MAIN");
      navigation.replace(RootScreens.MAIN);
    }
  }, [currentIndex, onboardingData.length, navigation]);

  const handleSkip = () => {
    navigation.replace(RootScreens.MAIN);
  };
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      console.log("Viewable items changed, new index:", viewableItems[0].index);
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({
    item,
  }: {
    item: { id: string; component: React.ComponentType };
  }) => {
    const Component = item.component;
    return (
      <View style={styles.pageContainer}>
        <Component />
      </View>
    );
  };
  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index: number) => (
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
    return currentIndex === onboardingData.length - 1
      ? "Hoàn thành"
      : "Tiếp theo";
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
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
