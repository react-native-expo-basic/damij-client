import React from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";
import { ButtonType } from "../types/types";
import styled from "styled-components/native";
import { textDisableColor, viewDisableColor } from "../style";

interface FilterButtonProps extends ButtonType {
  isSelected?: boolean;
}

const width = Dimensions.get("window").width / 5 - 7;

export const BasicButton: React.FC<ButtonType> = ({ texts, event }) => {
  return (
    <TouchableOpacity onPress={event} accessibilityLabel={texts}>
      <Text>{texts}</Text>
    </TouchableOpacity>
  );
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  texts,
  event,
  isSelected,
}) => {
  return (
    <ButtonContainer
      onPress={event}
      accessibilityLabel={texts}
      isSelected={isSelected}
      style={{ width: width }}
    >
      <ButtonText style={{ color: isSelected ? "#444444" : textDisableColor }}>
        {texts}
      </ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{ isSelected?: boolean }>`
  border-radius: 5px;
  padding: 10px 15px;
  height: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) => (props.isSelected ? "#fff" : viewDisableColor)};
`;
const ButtonText = styled.Text<{ isSelected?: boolean }>`
  text-align: center;
  font-weight: 600;
`;
