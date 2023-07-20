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
    <>
      {Object.entries(category).map(([category, image], idx) => {
        return (
          <Container key={idx}>
            <CategoryImage source={{ uri: image.trim() }} />
            <CategoryText>{category}</CategoryText>
          </Container>
        );
      })}
    </>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 31%;
  margin: 3% 1.5%;
  border-radius: 50px;
  aspect-ratio: 1/1;
  background: white;
  border-width: 1px;
  padding: 3px;
  border-color: #d9d9d92f;
`;
const CategoryImage = styled.Image`
  width: 60%;
  aspect-ratio: 1/1;
  border-radius: 50px;
  margin-bottom: 7px;
`;
const CategoryText = styled.Text``;
