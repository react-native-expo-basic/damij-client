import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { fetchCategoryType } from "../../screens/Category";

export interface SubCategoryType {
  category: {
    [key: string]: string;
  };
}

export default function SubCategories({ category }: SubCategoryType) {
  const subCategories = {
    best: "조끼",
    cardigan: "가디건",
    coat: "코트",
    jacekt: "자켓",
  };
  return (
    <Wrapper>
      {Object.entries(category).map(([category, image], idx) => {
        console.log(image);
        return (
          <Container key={idx}>
            <CategoryImage source={{ uri: image.trim() }} />
            <CategoryText>{category}</CategoryText>
          </Container>
        );
      })}
    </Wrapper>
  );
}
const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CategoryImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;
const CategoryText = styled.Text``;
