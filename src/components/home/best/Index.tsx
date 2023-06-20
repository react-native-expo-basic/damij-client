import React from "react";
import Category from "../../Category";
import { MainProps } from "../../../types/types";
import Product from "../../Product";
import { filteredIsBest } from "../../../utils/productUtils";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { DataType } from "../../../types/types";

export default function Index({ productInfo }: MainProps) {
  const popularProducts = filteredIsBest(productInfo);
  const data = [{ id: "category" }, { id: "product" }];

  const renderItem = ({ item }: { item: DataType }) => {
    switch (item.id) {
      case "category":
        return <Category />;
      case "product":
        return <Product products={popularProducts} />;
      default:
        return null;
    }
  };
  return (
    <PaddingView>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </PaddingView>
  );
}
const PaddingView = styled.View`
  padding: 7px 15px 0;
  box-sizing: border-box;
`;
