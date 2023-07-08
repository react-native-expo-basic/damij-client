import React, { useState, useEffect } from "react";
import { ProductType } from "../types/types";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { textPriceFontSize, textPriceName } from "../style";
import LikeButton from "./LikeButton";
import { Dimensions } from "react-native";
interface ProductProps {
  products: ProductType[];
}

interface ProductColorType {
  color: string;
}

export default function Product({ products }: ProductProps) {
  const width = Dimensions.get("window").width / 2 - 20;

  return (
    <Wrapper>
      {products?.map((product) => {
        return (
          <ProductCard key={product.id} width={width}>
            <ImageContainer>
              <Img source={{ uri: product.img }} />
              <LikeButton isSelected={product.picked} productId={product.id} />
            </ImageContainer>
            <ProductContainer>
              <FlexContainer>
                {product?.colorList?.map((color) => {
                  return <ProductColor key={color} color={color} />;
                })}
              </FlexContainer>

              <ProductName numberOfLines={1} ellipsizeMode="tail">
                {product.name}
              </ProductName>
              <ProductPrice>{product.price}</ProductPrice>
            </ProductContainer>
          </ProductCard>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  min-width: 51%;
`;

const ProductColor = styled.View<ProductColorType>`
  background-color: ${(props) => props.color};
  border-width: ${(props) => (props.color === "#fff" ? "1px" : 0)};
  border-color: #eaeaea;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 3px;
  margin-bottom: 3px;
`;

const ImageContainer = styled.View`
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;

const Img = styled.Image`
  aspect-ratio: 1/1.3;
  border-radius: 10px;
`;

const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: -5px;
`;

const ProductCard = styled.View<{ width: number }>`
  max-width: ${(props) => props.width}px;
  min-width: 49%;

  margin: 8px 0;
`;
const ProductContainer = styled.View`
  margin: 10px 0 10px;
  height: 60px;
  display: flex;
  justify-content: center;
`;
const ProductName = styled.Text`
  font-size: ${textPriceName};
  font-family: "Noto-Sans-Regular";
  height: 25px;
`;
const ProductPrice = styled.Text`
  font-size: ${textPriceFontSize};
  font-family: "Montserrat-SemiBold";
  margin-bottom: 2px;
`;
