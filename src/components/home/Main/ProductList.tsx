import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Product from "../../Product";
import { ProductType } from "../../../types/types";
import { fetchProductData } from "../../../api/productApi";
export interface MainProps {
  newProduct: ProductType[];
  bestProduct: ProductType[];
}

export default function ProductList() {
  const [fetchData, setFetchData] = useState({
    new: { NewProduct: [] },
    best: { BestProduct: [] },
  });
  const fetchItems = async () => {
    try {
      const [newProducts, popularProducts] = await Promise.all([
        fetchProductData("NewProduct"),
        fetchProductData("BestProduct"),
      ]);
      setFetchData({ new: newProducts, best: popularProducts });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <PaddingView>
      <ProductContainer>
        <TitleContainer>
          <TitleText>당신을 위한 최고의 아이템</TitleText>
        </TitleContainer>
        <Product products={fetchData.best.BestProduct} />
      </ProductContainer>
      <ProductContainer>
        <TitleContainer>
          <TitleText>오늘의 아이템</TitleText>
        </TitleContainer>
        <Product products={fetchData.new.NewProduct} />
      </ProductContainer>
    </PaddingView>
  );
}

const PaddingView = styled.View`
  padding: 15px 15px 0;
  box-sizing: border-box;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-family: "Noto-Sans-Medium";
`;

const ProductContainer = styled.View`
  padding-top: 20px;
`;
