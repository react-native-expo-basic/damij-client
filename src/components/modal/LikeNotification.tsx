import React, { useEffect, useState, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import useModal from "../../hooks/useModal";

interface LikeNotificationProps {
  isLiked: boolean;
  productId: boolean;
}

export default function LikeNotification(props: LikeNotificationProps) {
  const { isLiked, productId } = props;
  const [isVisible, setIsVisible] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const translateY = useRef(new Animated.Value(60)).current;
  const { closeModal } = useModal();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Node.js.Timeout : Node.js환경에서 사용되는 타이머 관련 객체.
  // setTimeout을 사용하면 반환되는 값으로, 타이머를 식별하고 제어하는 데 사용

  const modalEventHandler = () => {
    Animated.timing(translateY, {
      toValue: -60,
      duration: 400,
      useNativeDriver: true,
    }).start((finished) => {
      if (finished) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          closeModal("alarm");
        }, 2000);
        timerRef.current = timer;
      }
    });
  };

  useEffect(() => {
    modalEventHandler();
    return () => {
      if (timerRef.current) {
        translateY.setValue(60);
        clearTimeout(timerRef.current!);
        timerRef.current = null;
      }
    };
  }, [isLiked, productId]);

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
      <LikesText>
        {isLiked ? "찜한 상품이 해제됐어요" : "찜한 상품이 추가됐어요"}
      </LikesText>
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
