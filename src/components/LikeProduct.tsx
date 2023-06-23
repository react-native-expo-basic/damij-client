import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ProductItem } from "./modal/LikeProductListModal";
import {
  tabViewSelectColor,
  textPriceFontSize,
  textProductColor,
  textLikeProductsSize,
  textPriceName,
  selectedLikeButtonColor,
} from "../style";

interface LikeProductProps {
  props: ProductItem;
  selectedItems: number[];
  isEditable: boolean;
  toggleChecked: (id: number) => void;
}

export default function LikeProduct({
  props,
  selectedItems,
  toggleChecked,
  isEditable,
}: LikeProductProps) {
  const { product_name, image, product_price, discount_rate, id } = props;
  const checkedItem = selectedItems.includes(id);

  return (
    <Wrapper activeOpacity={1} onPress={() => toggleChecked(id)}>
      <ImgContainer>
        <Img source={{ uri: image }} resizeMode="cover" />
      </ImgContainer>

      {isEditable && (
        <SelectButtonContainer onPress={() => toggleChecked(id)}>
          <Circle checkedItem={checkedItem}>
            {checkedItem && (
              <AntDesign
                name="checkcircle"
                size={24}
                color={selectedLikeButtonColor}
              />
            )}
          </Circle>
        </SelectButtonContainer>
      )}
      <ProductName numberOfLines={1} ellipsizeMode="tail">
        {product_name}
      </ProductName>
      <PriceContainer>
        {discount_rate > 0 ? (
          <DiscountRate>{`${discount_rate}%`}</DiscountRate>
        ) : null}

        <ProductPrice>{product_price}</ProductPrice>
      </PriceContainer>
    </Wrapper>
  );
}
const Wrapper = styled.TouchableOpacity`
  width: 33.3%;
  padding: 7px 4px;
`;
const ImgContainer = styled.View`
  aspect-ratio: 1/1.2;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;
const SelectButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 15px;
  border-width: 2px;
  border-color: white;
  border-radius: 50px;
`;
const Circle = styled.View<{ checkedItem: boolean }>`
  background: ${(props) =>
    props.checkedItem ? "white" : "rgba(0, 0, 0, 0.2)"};
  min-width: 24px;
  min-height: 24px;
  border-radius: 50px;
`;
const PriceContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const DiscountRate = styled.Text`
  font-size: ${textLikeProductsSize};
  font-weight: 600;
  font-family: "Montserrat-SemiBold";
  color: ${tabViewSelectColor};
  margin-right: 5px;
`;
const ProductName = styled.Text`
  font-size: ${textPriceName};
  color: ${textProductColor};
  font-family: "Noto-Sans-Regular";
  height: 25px;
`;
const ProductPrice = styled.Text`
  font-size: ${textPriceFontSize};
  font-family: "Montserrat-SemiBold";
  margin-bottom: 2px;
`;

const Img = styled.Image`
  flex: 1;
`;
