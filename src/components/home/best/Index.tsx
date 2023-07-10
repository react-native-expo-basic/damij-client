import React, { useEffect, useState, useCallback } from "react";
import Category from "../../Category";
import { fetchProductData } from "../../../api/productApi";
import { MainProps, ProductType } from "../../../types/types";
import Product from "../../Product";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { MainLikesState, MainAuthState } from "../../../types/types";
import { useSelector } from "react-redux";
import { LikesState } from "../../../types/types";
import { filtetedProductData } from "../../../api/productApi";

export default function Index() {
  const data = [{ id: "category" }, { id: "product" }];
  const [bestItems, setBestItems] = useState<ProductType[]>([]);
  const likesState = useSelector((state: MainLikesState) => state.likes);
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
          <Category filteredItems={filteredItems} fetchItems={fetchItems} />
        }
        numColumns={2}
      />
    </PaddingView>
  );
}
const PaddingView = styled.View`
  padding: 7px 15px 0;
`;
