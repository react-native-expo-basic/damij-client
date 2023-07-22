import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

export interface SubCategoryType {
  category: {
    [key: string]: string;
  };
}

export default function SubCategories({ category }: SubCategoryType) {
  // 영어로 되어있는 키의 값을 한글로 변환
  const subCategories: { [key: string]: string } = {
    manToMan: "맨투맨",
    blouse: "블라우스",
    shirt: "셔츠",
    sleeveless: "민소매",
    neat: "니트",
    "t-shirt": "티셔츠",
    pants: "팬츠",
    skirt: "스커트",
    onePiece: "원피스",
    padding: "패딩",
    mustang: "무스탕",
    set: "세트",
    pajamas: "파잠",
    gown: "가운",
    best: "조끼",
    cardigan: "가디건",
    coat: "코트",
    jacket: "자켓",
  };
  return (
    <Wrapper>
      {Object.entries(category).map(([category, image], idx) => {
        const categoryName = subCategories[category];
        return (
          <Container key={idx}>
            <CategoryImage source={{ uri: image.trim() }} />
            <CategoryText>{categoryName}</CategoryText>
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
  width: 30%;
  margin: 3% 1.5%;
`;
const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 50px;
  aspect-ratio: 1/1;
  background: white;
  border-width: 1px;
  padding: 5px;
  border-color: #d9d9d92f;
`;
const CategoryImage = styled.Image`
  width: 60%;
  aspect-ratio: 1/1;
  border-radius: 50px;
  margin-bottom: 7px;
`;
const CategoryText = styled.Text``;
