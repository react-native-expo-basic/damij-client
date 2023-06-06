import React from "react";
import styled from "styled-components/native";
import ProductList from "./ProductList";
import { filterdIsBest, filterdIsNew } from "../../../utils/productUtils";
import { MainProps } from "types/types";
import SwiperComponent from "./SwiperComponent";

export default function ProductSection({ productInfo }: MainProps) {
  const popularProducts = filterdIsBest(productInfo);
  const newProducts = filterdIsNew(productInfo);
  return (
    <Section>
      <ProductContainer>
        <TitleContainer>
          <TitleText>당신을 위한 최고의 아이템</TitleText>
        </TitleContainer>
        <ProductList products={popularProducts} />
      </ProductContainer>
      <ProductContainer>
        <TitleContainer>
          <TitleText>오늘의 아이템</TitleText>
        </TitleContainer>
        <ProductList products={newProducts}></ProductList>
      </ProductContainer>
    </Section>
  );
}

const Section = styled.View`
  flex: 0.8;
  padding: 20px 15px;
  box-sizing: border-box;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-family: "Noto-Sans-Medium";
`;

const ProductContainer = styled.View`
  flex: 1;
  padding-top: 20px;
`;
