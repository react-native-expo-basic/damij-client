import React, { useEffect, useState, useCallback } from "react";
import Category from "../../Category";
import { fetchProductData } from "../../../api/productApi";
import { MainProps, ProductType } from "../../../types/types";
import Product from "../../Product";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { ProductFolderState } from "../../../screens/Likes";
import { useSelector } from "react-redux";
import { LikesState } from "../../../types/types";
import { filtetedProductData } from "../../../api/productApi";

export default function Index({ productInfo }: MainProps) {
  const [newItems, setNewItems] = useState<ProductType[]>([]);
  const likesState = useSelector((state: LikesState) => state.likes);

  const fetchItems = useCallback(async () => {
    try {
      const NewProducts = await fetchProductData("NewProduct");

      setNewItems(NewProducts.NewProduct);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const filteredItems = useCallback(async (category: string) => {
    try {
      const filteredItem = await filtetedProductData(category);
      setNewItems(filteredItem[category]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderItem = ({ item }: { item: ProductType }) => {
    return <Product products={[item]} />;
  };

  return (
    <PaddingView>
      <FlatList
        data={newItems}
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
  flex: 1;
  padding: 7px 15px 0;
  box-sizing: border-box;
  position: relative;
`;
