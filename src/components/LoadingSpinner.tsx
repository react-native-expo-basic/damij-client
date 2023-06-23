import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function LoadingSpinner({
  size = 30,
  color = "black",
}: LoadingSpinnerProps) {
  return <Spinner size={size} color={color} />;
}
const Spinner = styled.ActivityIndicator`
  position: absolute;
  left: 50%;
`;
