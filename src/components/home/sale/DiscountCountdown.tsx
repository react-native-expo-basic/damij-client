import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const DiscountCountdown = (discountTime: number) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const calculateRemainingTime = () => {
      if (discountTime > 0) {
        const seconds = Math.floor(discountTime / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        setRemainingTime(
          `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`
        );
      } else {
        setRemainingTime("");
      }
    };

    const timer = setInterval(calculateRemainingTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [discountTime]);

  const padZero = (num: number) => {
    return String(num).padStart(2, "0");
  };

  return (
    <View>
      {remainingTime !== null ? (
        <Text>남은 시간: {remainingTime}</Text>
      ) : (
        <Text>할인 기간이 종료되었습니다.</Text>
      )}
    </View>
  );
};

export default DiscountCountdown;
