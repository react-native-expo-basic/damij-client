import React, { useEffect, useState } from "react";
import Category from "../../Category";
import { fetchProductData } from "../../../api/productApi";
import { MainProps, ProductType } from "../../../types/types";
import Product from "../../Product";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { DataType } from "../../../types/types";

export default function Index() {
  const data = [{ id: "category" }, { id: "product" }];

  const [bestItems, setBestItems] = useState<ProductType[]>([]);
  console.log(bestItems);
  const fetchItems = async () => {
    try {
      const popularProducts = await fetchProductData("BestProduct");
      setBestItems(popularProducts.BestProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item }: { item: ProductType }) => {
    return <Product products={[item]} />;
  };
  return (
    <PaddingView>
      <FlatList
        data={bestItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<Category />}
        numColumns={2}
      />
    </PaddingView>
  );
}
const PaddingView = styled.View`
  padding: 7px 15px 0;
`;
