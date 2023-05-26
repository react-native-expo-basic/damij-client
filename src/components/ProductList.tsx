import React from "react";
import { View, Text, Image } from "react-native";
import { ProductType } from "../types/types";
import styled from "styled-components/native";

interface ProductListProps {
  props: ProductType[];
}

interface ProductColorType {
  color: string;
}

export default function ProductList({ props }: ProductListProps) {
  return (
    <Wrapper>
      {props.map((product) => {
        return (
          <ProductCard key={product.product_name}>
            <ImageContainer>
              <Img source={{ uri: product.image }} />
            </ImageContainer>
            <ProductContainer>
              <FlexContainer>
                {product.product_color?.map((color) => {
                  return <ProductColor key={color} color={color} />;
                })}
              </FlexContainer>

              <ProductName numberOfLines={1} ellipsizeMode="tail">
                {product.product_name}
              </ProductName>
            </ProductContainer>
            <ProductPrice>
              {product.product_price.toLocaleString()}
            </ProductPrice>
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
`;

const ProductColor = styled.View<ProductColorType>`
  background: ${(props) => props.color};
  border-width: ${(props) => (props.color === "#fff" ? "1px" : 0)};
  border-color: #eaeaea;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 3px;
  margin-bottom: 3px;
`;

const ImageContainer = styled.View`
  border-radius: 20px;
  overflow: hidden;
`;

const Img = styled.Image`
  aspect-ratio: 1/1.3;
  border-radius: 40px;
`;

const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: -5px;
`;

const ProductCard = styled.View`
  width: 48%;

  margin: 8px 0;
`;
const ProductContainer = styled.View`
  margin: 15px 0 3px;
  height: 30px;
  display: flex;
  justify-content: center;
`;
const ProductName = styled.Text`
  font-size: 12px;
  font-family: "Noto-Sans-Regular";
`;
const ProductPrice = styled.Text`
  font-size: 16px;
  font-family: "Montserrat-SemiBold";

  margin-bottom: 2px;
`;
