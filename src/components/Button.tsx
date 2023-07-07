import React from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";
import { ButtonType } from "../types/types";
import styled from "styled-components/native";
import { textDisableColor, viewDisableColor } from "../style";

interface FilterButtonProps extends ButtonType {
  color?: string;
  isSelected?: boolean;
}

const width = Dimensions.get("window").width / 5 - 7;

export const BasicButton: React.FC<ButtonType> = ({
  children,
  onPress,
  color = "black",
  background = "white",
}) => {
  return (
    <ButtonContainer
      onPress={onPress}
      accessibilityLabel={children}
      background={background}
    >
      <BasicButtonText color={color}>{children}</BasicButtonText>
    </ButtonContainer>
  );
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  onPress,
  background = "white",
  isSelected = false,
}) => {
  return (
    <FilterContainer
      onPress={onPress}
      accessibilityLabel={children}
      isSelected={isSelected}
      background={background}
      width={width}
    >
      <FilterButtonText isSelected={isSelected}>{children}</FilterButtonText>
    </FilterContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{ background?: string }>`
  border-radius: 5px;
  padding: 5px 10px;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
`;
const BasicButtonText = styled.Text<{ color?: string }>`
  color: ${(props) => props.color};
`;
const FilterContainer = styled.TouchableOpacity<{
  isSelected: boolean;
  background?: string;
  width: number;
}>`
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  background: ${(props) => (props.isSelected ? "#fff" : viewDisableColor)};
  width: ${(props) => props.width}px;
`;

const FilterButtonText = styled.Text<{ isSelected?: boolean }>`
  text-align: center;
  color: ${(props) => (props.isSelected ? "#444444" : textDisableColor)};
  font-weight: 600;
`;
