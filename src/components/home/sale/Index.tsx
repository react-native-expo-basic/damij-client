import React from "react";
import { FlatList, Text } from "react-native";
import { MainProps, DataType } from "../../../types/types";
import SaleProduct from "./SaleProduct";
import { filteredIsSale } from "../../../utils/productUtils";
import styled from "styled-components/native";

export default function Index({ productInfo }: MainProps) {
  const saleProducts = filteredIsSale(productInfo);

  const data = [{ id: "text" }, { id: "productList" }];

  const renderItem = ({ item }: { item: DataType }) => {
    switch (item.id) {
      case "text":
        return <TitleText>단 5일만 할인특가!</TitleText>;
      case "productList":
        return <SaleProduct product={saleProducts} />;
      default:
        return null;
    }
  };
  return (
    <PaddingView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </PaddingView>
  );
}

const TitleText = styled.Text`
  font-size: 21px;
  margin-bottom: 8px;
  font-weight: 600;
`;

const PaddingView = styled.View`
  padding: 20px 15px;
  box-sizing: border-box;
`;
