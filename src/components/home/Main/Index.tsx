import React from "react";
import SwiperComponent from "../main/SwiperComponent";
import ProductList from "../main/ProductList";
import { MainProps, DataType } from "../../../types/types";
import { View } from "react-native";
import { FlatList } from "react-native";

export default function Index() {
  const data = [{ id: "swiper" }, { id: "productList" }];

  const renderItem = ({ item }: { item: DataType }) => {
    switch (item.id) {
      case "swiper":
        return <SwiperComponent />;
      case "productList":
        return <ProductList />;
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
