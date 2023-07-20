import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components/native";
import Product from "../../Product";
import { ProductType } from "../../../types/types";
import { fetchProductData } from "../../../api/productApi";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { MainLikesState, MainAuthState } from "../../../types/types";
import { ProductFolderState } from "screens/Likes";

export default function ProductList() {
  const [fetchData, setFetchData] = useState({
    new: { NewProduct: [] },
    best: { BestProduct: [] },
  });

  const [loading, setLoading] = useState(true);

  const products = useSelector(
    (state: ProductFolderState) => state.folder.products
  );
  const authState = useSelector((state: MainAuthState) => state.auth);

  const fetchItems = useCallback(async () => {
    try {
      const newProducts = await fetchProductData("NewProduct");
      const popularProducts = await fetchProductData("BestProduct");

      setFetchData({ new: newProducts, best: popularProducts });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [products, fetchItems, authState]);

  if (loading) {
    // 로딩 중일 때 표시할 내용
    return <LoadingSpinner />;
  }

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

const TitleContainer = styled.View``;

const TitleText = styled.Text`
  font-size: 20px;
  font-family: "Noto-Sans-Medium";
`;

const ProductContainer = styled.View`
  padding-top: 20px;
`;
