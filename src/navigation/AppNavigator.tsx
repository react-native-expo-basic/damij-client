import React, { useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Category from "../screens/Category";
import Likes from "../screens/Likes";
import Mypage from "../screens/Mypage";
import GlobalModal from "../components/modal/gloablmodal/GlobalModal";
import { tabViewSelectColor } from "../style";

const Tab = createBottomTabNavigator();

type IoniconsName =
  | "home-outline"
  | "home-sharp"
  | "person-sharp"
  | "person-outline"
  | "ios-heart-outline"
  | "ios-heart-sharp"
  | "menu-outline";

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: IoniconsName = "home-sharp";

            if (route.name === "홈") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "카테고리") {
              iconName = "menu-outline";
            } else if (route.name === "찜") {
              iconName = focused ? "ios-heart-sharp" : "ios-heart-outline";
            } else if (route.name === "마이페이지") {
              iconName = focused ? "person-sharp" : "person-outline";
            }

            const iconColor = focused ? tabViewSelectColor : "grey";

            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
          tabBarLabel: ({ focused }) => {
            const labelColor = focused ? tabViewSelectColor : "grey";

            return (
              <Text style={{ color: labelColor, fontSize: 12 }}>
                {route.name}
              </Text>
            );
          },
          tabBarStyle: {
            height: 50, // 탭 바의 높이를 조절합니다.
          },
        })}
      >
        <Tab.Screen name="홈" component={Home} />
        <Tab.Screen name="카테고리" component={Category} />
        <Tab.Screen name="찜" component={Likes} />
        <Tab.Screen name="마이페이지" component={Mypage} />
      </Tab.Navigator>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, position: "relative" }}>
        <Main />
        <GlobalModal />
      </View>
    </NavigationContainer>
  );
};

export default App;
