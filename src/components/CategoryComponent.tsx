import React, { useState } from "react";
import { FilterButton as Button } from "./Button";
import styled from "styled-components/native";
import { viewDisableColor } from "../style";

interface CategoryProps {
  filteredItems: (value: string) => void;
  fetchItems: () => void;
}
export default function Category({ filteredItems, fetchItems }: CategoryProps) {
  const [selectedButton, setSelectedButton] = useState("전체");

  const categorys = [
    { 전체: "ALL" },
    { 상의: "TOP" },
    { 하의: "BOTTOM" },
    { 아우터: "OUTER" },
    { 홈웨어: "HOME_WEAR" },
  ];

  const handleButtonPress = (key: string, value: string) => {
    if (key === "전체") {
      setSelectedButton(key);
      fetchItems();
      return;
    }
    setSelectedButton(key);
    filteredItems(value);
  };

  return (
    <CategoryContainer>
      {categorys.map((category, idx) => {
        const categoryKey = Object.keys(category)[0];
        const categoryValue = Object.values(category)[0];
        let isSelected = selectedButton === categoryKey;
        return (
          <Button
            onPress={() => handleButtonPress(categoryKey, categoryValue)}
            isSelected={isSelected}
            background={viewDisableColor}
            key={idx}
          >
            {categoryKey}
          </Button>
        );
      })}
    </CategoryContainer>
  );
}
const CategoryContainer = styled.View`
  height: 48px;
  padding: 2px 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: ${viewDisableColor};
`;
