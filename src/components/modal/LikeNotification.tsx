import React, { useEffect, useState } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
export default function LikeNotification() {
  const [isVisible, setIsVisible] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const translateY = new Animated.Value(60);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: -5,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }
  return (
    <LikesView
      style={{
        transform: [{ translateY }],
        left: (windowWidth - windowWidth * 0.8) / 2,
      }}
    >
      <LikesText>찜한 상품이 추가됐어요</LikesText>
    </LikesView>
  );
}

const LikesView = styled(Animated.View)`
  position: absolute;
  padding: 15px 20px;
  border-radius: 10px;
  bottom: 0;
  transform: translateX(-50px);

  background: rgba(28, 29, 51, 0.8);
  width: 80%;
`;
const LikesText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
