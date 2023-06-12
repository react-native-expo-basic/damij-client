import React from "react";
import styled from "styled-components/native";
import { ProductType } from "../../../types/types";
import {
  textOriginalPriceColor,
  textOriginalPriceFontSize,
  textSalePriceName,
  textSalePriceFontSize,
} from "../../../style";

interface Props {
  product?: ProductType[];
}

export default function SaleProduct({ product }: Props) {
  return (
    <Wrapper>
      {product?.map((product) => {
        return (
          <ProductCard key={product.product_name}>
            <ImageContainer>
              <Img source={{ uri: product.image }} />
            </ImageContainer>
            <ProductContainer>
              <ProductName numberOfLines={1} ellipsizeMode="tail">
                {product.product_name}
              </ProductName>
              <OriginalPrice>
                {product.discount_rate === 0
                  ? null
                  : (product.product_price * product.discount_rate) / 100 +
                    product.product_price}
              </OriginalPrice>
              <ProductPrice>
                {product.product_price.toLocaleString()}
              </ProductPrice>
              <SaleTimer>{product.registration_date}</SaleTimer>
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
`;

const ImageContainer = styled.View`
  aspect-ratio: 1/1;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
`;

const Img = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

const ProductCard = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;
const ProductContainer = styled.View`
  display: flex;
  justify-content: center;
  margin-left: 10px;
`;
const ProductName = styled.Text`
  font-size: ${textSalePriceName};
  font-family: "Noto-Sans-Regular";
`;
const ProductPrice = styled.Text`
  font-size: ${textSalePriceFontSize};
  font-family: "Montserrat-SemiBold";
  margin-bottom: 7px;
`;

const OriginalPrice = styled.Text`
  font-size: ${textOriginalPriceFontSize};
  font-family: "Montserrat-Regular";
  color: ${textOriginalPriceColor};
  text-decoration: line-through;
`;
const SaleTimer = styled.Text`
  font-size: 15px;
  font-family: "Noto-Sans-Medium";
`;
