import React from "react";
import styled from "styled-components/native";
import Product from "../../Product";
import { filteredIsBest, filteredIsNew } from "../../../utils/productUtils";
import { ProductType } from "types/types";

export interface MainProps {
  productInfo: ProductType[];
}

export default function ProductSection({ productInfo }: MainProps) {
  const popularProducts = filteredIsBest(productInfo);
  const newProducts = filteredIsNew(productInfo);
  return (
    <PaddingView>
      <ProductContainer>
        <TitleContainer>
          <TitleText>당신을 위한 최고의 아이템</TitleText>
        </TitleContainer>
        <Product products={popularProducts} />
      </ProductContainer>
      <ProductContainer>
        <TitleContainer>
          <TitleText>오늘의 아이템</TitleText>
        </TitleContainer>
        <Product products={newProducts} />
      </ProductContainer>
    </PaddingView>
  );
}

const PaddingView = styled.View`
  padding: 15px 15px 0;
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
  padding-top: 20px;
`;
