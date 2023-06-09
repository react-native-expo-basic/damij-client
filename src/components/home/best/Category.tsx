import React, { useState } from "react";
import { FilterButton } from "../../Button";
import styled from "styled-components/native";
import { viewDisableColor } from "../../../style";

export default function Category() {
  const [selectedButton, setSelectedButton] = useState("전체");
  const category = ["전체", "상의", "하의", "아우터", "홈웨어"];
  const handleButtonPress = (item: string) => {
    setSelectedButton(item);
  };
  console.log(selectedButton);
  return (
    <CategoryContainer>
      {category.map((item, idx) => {
        let isSelected = selectedButton === item;
        return (
          <FilterButton
            texts={item}
            event={() => handleButtonPress(item)}
            isSelected={isSelected}
            key={idx}
          />
        );
      })}
    </CategoryContainer>
  );
}
const CategoryContainer = styled.View`
  height: 50px;
  padding: 2px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: ${viewDisableColor};
`;
