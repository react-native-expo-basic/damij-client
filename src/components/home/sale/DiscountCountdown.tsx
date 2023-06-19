import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const DiscountCountdown = (discountTime: number) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const calculateRemainingTime = () => {
      if (discountTime > 0) {
        const seconds = Math.floor(discountTime / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const days = Math.floor(hours / 24);

        const remainingMinutes = minutes % 60;
        const remainingHours = hours % 24;
        const remainingSeconds = seconds % 60;

        setRemainingTime(
          `${days}일 ${padZero(remainingHours)}시간 ${padZero(
            remainingMinutes
          )}분 ${padZero(remainingSeconds)}초가 남았습니다.`
        );
      } else {
        setRemainingTime("할인 시간이 종료되었습니다.");
      }
    };

    //타이머 식별자
    const timer = setInterval(calculateRemainingTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [discountTime]);

  //두 자리 숫자
  const padZero = (num: number) => {
    return String(num).padStart(2, "0");
  };

  return (
    <View>
      {remainingTime !== null ? (
        <RemainingTimeText>{remainingTime}</RemainingTimeText>
      ) : (
        <RemainingTimeText>할인 기간이 종료되었습니다.</RemainingTimeText>
      )}
    </View>
  );
};

export default DiscountCountdown;

const RemainingTimeText = styled.Text`
  color: #8ccec7;
  font-family: "Noto-Sans-Medium";
  font-size: 14px;
`;
