import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Signup from "../screens/Signup";
const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="Login" component={Signup} />
    </MainStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

// screenOptions 프로퍼티를 이용하여 화면 전환에 대한 옵션을 설정
// MainStack.Screen: 스택 내비게이션에 추가할 화면을 정의하는 컴포넌트입니다.
// name 프로퍼티는 해당 화면에 대한 고유한 이름을 정의하고, component 프로퍼티는 해당 화면을 렌더링할 컴포넌트를 지정합니다.
// createNativeStackNavigator의 옵션 중 하나로 headerShown: false: 스택 내에서 화면 전환 시, 헤더를 숨길지 여부를 결정하는 옵션입니다.
