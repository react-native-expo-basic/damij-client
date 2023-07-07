import React, { useState, useEffect } from "react";
import { FlatList, Text } from "react-native";
import { MainProps, DataType, ProductType } from "../../../types/types";
import { fetchProductData } from "../../../api/productApi";
import SaleProduct from "./SaleProduct";
import styled from "styled-components/native";

export default function Index() {
  const [saleItem, setSaleItem] = useState<ProductType[]>([]);

  const fetchItems = async () => {
    try {
      const saleProducts = await fetchProductData("NowSale");
      setSaleItem(saleProducts.NowSale);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item }: { item: ProductType }) => {
    return <SaleProduct product={[item]} />;
  };
  /*  */
  return (
    <PaddingView>
      <FlatList
        data={saleItem}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<TitleText>단 5일만 할인특가!</TitleText>}
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
