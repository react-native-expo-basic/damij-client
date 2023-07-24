import React, { useEffect, useState, useCallback } from "react";
import { fetchProductData } from "../../../api/productApi";
import { ProductType } from "../../../types/types";
import Product from "../../Product";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { MainAuthState } from "../../../types/types";
import { useSelector } from "react-redux";
import { filtetedProductData } from "../../../api/productApi";
import CategoryComponent from "../../CategoryComponent";

export default function Index() {
  const [bestItems, setBestItems] = useState<ProductType[]>([]);
  const authState = useSelector((state: MainAuthState) => state.auth);
  const fetchItems = useCallback(async () => {
    try {
      const popularProducts = await fetchProductData("BestProduct");

      setBestItems(popularProducts.BestProduct);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filteredItems = useCallback(async (category: string) => {
    try {
      const filteredItem = await filtetedProductData(category);

      setBestItems(filteredItem[category]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [authState]);

  const renderItem = ({ item }: { item: ProductType }) => {
    return <Product products={[item]} />;
  };
  return (
    <PaddingView>
      <FlatList
        data={bestItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <CategoryComponent
            filteredItems={filteredItems}
            fetchItems={fetchItems}
          />
        }
        numColumns={2}
      />
    </PaddingView>
  );
}
const PaddingView = styled.View`
  padding: 7px 15px 0;
`;
