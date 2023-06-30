import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import { alertModalColor } from "../../style";
import { closeModal } from "../../redux/modules/modal";

interface AlertModalProps {
  message: string;
}

export default function AlertModal(props: AlertModalProps) {
  const { message } = props;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const windowWidth = Dimensions.get("window").width;
  const handlerAlertModal = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start((finished) => {
      if (finished) {
        const timer = setTimeout(() => {
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }).start(() => {
            closeModal("alert");
          });
        }, 2000);
        timerRef.current = timer;
      }
    });
  };

  useEffect(() => {
    handlerAlertModal();
    return () => {
      if (timerRef.current) {
        scaleValue.setValue(0);
        clearTimeout(timerRef.current!);
        timerRef.current = null;
      }
    };
  }, []);

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <AlertView windowWidth={windowWidth} style={{ transform: [{ scale }] }}>
      <AlertText>{message}</AlertText>
    </AlertView>
  );
}

const AlertView = styled(Animated.View)<{ windowWidth: number }>`
  position: absolute;
  background: ${alertModalColor};
  border-radius: 5px;
  bottom: 10px;
  width: 90%;
  padding: 15px;
  left: ${(props) => (props.windowWidth - props.windowWidth * 0.9) / 2}px;
`;

const AlertText = styled.Text`
  color: white;
  text-align: center;
`;
