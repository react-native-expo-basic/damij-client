import React from "react";
import Category from "../../Category";
import { filteredIsNew } from "../../../utils/productUtils";
import { MainProps, DataType } from "../../../types/types";
import Product from "../../Product";
import styled from "styled-components/native";
import { FlatList } from "react-native";

export default function Index({ productInfo }: MainProps) {
  const newProducts = filteredIsNew(productInfo);
  const data = [{ id: "category" }, { id: "product" }];

  const renderItem = ({ item }: { item: DataType }) => {
    switch (item.id) {
      case "category":
        return <Category />;
      case "product":
        return <Product products={newProducts} />;
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
  flex: 1;
  padding: 7px 15px 0;
  box-sizing: border-box;
  position: relative;
`;
