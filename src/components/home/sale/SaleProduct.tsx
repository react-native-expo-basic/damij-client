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
        console.log(timeDifference);
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
                {productItem.discount_rate === 0
                  ? null
                  : (productItem.product_price * productItem.discount_rate) /
                      100 +
                    productItem.product_price}
              </OriginalPrice>
              <ProductPrice>
                {productItem.product_price.toLocaleString()}
              </ProductPrice>
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
