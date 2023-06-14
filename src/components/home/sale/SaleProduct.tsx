import React from "react";
import styled from "styled-components/native";
import { ProductType } from "../../../types/types";
import {
  textOriginalPriceColor,
  textOriginalPriceFontSize,
  textSalePriceName,
  textSalePriceFontSize,
} from "../../../style";
import DiscountCountdown from "./DiscountCountdown";
import { tabViewSelectColor } from "../../../style";

interface Props {
  product: ProductType[];
}

export default function SaleProduct({ product }: Props) {
  return (
    <Wrapper>
      {product?.map((productItem) => {
        const discountDateObject = new Date(productItem.discountDate);
        const currentDate = new Date();
        const timeDifference =
          discountDateObject.getTime() - currentDate.getTime();

        return (
          <ProductCard key={productItem.product_name}>
            <ImageContainer>
              <Img source={{ uri: productItem.image }} />
            </ImageContainer>
            <ProductContainer>
              <ProductName numberOfLines={1} ellipsizeMode="tail">
                {productItem.product_name}
              </ProductName>
              <OriginalPrice>
                {(productItem.product_price * productItem.discount_rate) / 100 +
                  productItem.product_price}
              </OriginalPrice>
              <FlexContainer>
                <DiscountRate>{`${productItem.discount_rate}%`}</DiscountRate>
                <ProductPrice>
                  {productItem.product_price.toLocaleString()}
                </ProductPrice>
              </FlexContainer>
              <SaleTimer>{DiscountCountdown(timeDifference)}</SaleTimer>
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
  border-radius: 10px;
`;

const ProductCard = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;
const ProductContainer = styled.View`
  display: flex;
  margin-left: 12px;
`;
const ProductName = styled.Text`
  font-size: ${textSalePriceName};
  font-family: "Noto-Sans-Regular";
  margin-bottom: -6px;
`;
const ProductPrice = styled.Text`
  font-size: ${textSalePriceFontSize};
  font-family: "Montserrat-SemiBold";
`;

const OriginalPrice = styled.Text`
  font-size: ${textOriginalPriceFontSize};
  color: ${textOriginalPriceColor};
  text-decoration: line-through;
`;
const SaleTimer = styled.Text`
  font-size: 15px;
`;

const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const DiscountRate = styled.Text`
  font-size: ${textSalePriceFontSize};
  font-family: "Montserrat-SemiBold";
  color: ${tabViewSelectColor};
  font-weight: 600;
  margin-right: 7px;
`;
