import React from "react";
import SwiperComponent from "./SwiperComponent";
import ProductList from "./ProductList";
import { MainProps, DataType } from "../../../types/types";
import Section from "../Section";
import { FlatList } from "react-native";

export default function Index({ productInfo }: MainProps) {
  const data = [{ id: "swiper" }, { id: "productList" }];

  const renderItem = ({ item }: { item: DataType }) => {
    switch (item.id) {
      case "swiper":
        return <SwiperComponent />;
      case "productList":
        return <ProductList productInfo={productInfo} />;
      default:
        return null;
    }
  };

  return (
    <Section>
      <FlatList data={data} renderItem={renderItem} />
    </Section>
  );
}
