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
            <Img source={{ uri: product.image }} />
            <View>
              <FlexContainer>
                {product.product_color?.map((color) => {
                  return <ProductColor key={color} color={color} />;
                })}
              </FlexContainer>
            </View>
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
  width: 11px;
  height: 11px;
  border-radius: 50px;
  margin-right: 3px;
`;

const Img = styled.Image`
  aspect-ratio: 1/1.5;
  border-radius: 40px;
`;

const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const ProductCard = styled.View`
  width: 48%;
`;
