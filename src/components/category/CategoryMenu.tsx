import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import styled from "styled-components/native";
import { FilterButton } from "../../components/Button";
import { viewDisableColor } from "../../style";

interface CategoryMenuProps {
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export default function CategoryMenu({ setOffset }: CategoryMenuProps) {
  const categoryItems = [
    { 상의: "TOP" },
    { 하의: "BOTTOM" },
    { 아우터: "OUTER" },
    { 홈웨어: "HOME_WEAR" },
  ];
  const [selectedButton, setSelectedButton] = useState("");
  const getComponentOffset = () => {};
  const handleButtonPress = (key: string /* , value: string */) => {
    setSelectedButton(key);
    getComponentOffset();
  };
  return (
    <CategoryContainer>
      {categoryItems.map((category, idx) => {
        const categoryKey = Object.keys(category)[0];
        const categoryValue = Object.values(category)[0];
        let isSelected = selectedButton === categoryKey;
        return (
          <ButtonContainer key={idx.toString()}>
            <FilterButton
              onPress={() => handleButtonPress(categoryKey)}
              isSelected={isSelected}
            >
              {categoryKey}
            </FilterButton>
          </ButtonContainer>
        );
      })}
    </CategoryContainer>
  );
}
const CategoryContainer = styled.View`
  display: flex;
  flex-direction: column;
  height: ${Dimensions.get("window").height}px;
  background: ${viewDisableColor};
`;
const ButtonContainer = styled.View`
  height: 50px;
`;
