import React, { useEffect, useState, useCallback } from "react";
import CategoryComponent from "../../CategoryComponent";
import { fetchProductData } from "../../../api/productApi";
import { ProductType } from "../../../types/types";
import Product from "../../Product";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { viewDisableColor } from "../../../style";
import { useSelector } from "react-redux";
import { MainAuthState } from "../../../types/types";
import { filtetedProductData } from "../../../api/productApi";

export default function Index() {
  const [newItems, setNewItems] = useState<ProductType[]>([]);
  const authState = useSelector((state: MainAuthState) => state.auth);
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

  useEffect(() => {
    fetchItems();
  }, [authState]);

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
          <CategoryContainer>
            <CategoryComponent
              filteredItems={filteredItems}
              fetchItems={fetchItems}
              background={viewDisableColor}
            />
          </CategoryContainer>
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
const CategoryContainer = styled.View`
  height: 48px;
  padding: 2px 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: ${viewDisableColor};
`;
