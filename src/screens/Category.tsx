import React, { useState, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import CategoryMenu from "../components/category/CategoryMenu";
import { authInstance } from "../api/api";
import CategoryList from "../components/category/CategoryList";

export interface fetchCategoryType {
  [key: string]: {
    [key: string]: string;
  };
}

export default function Category() {
  const [categoryList, setCateogryList] = useState<fetchCategoryType[]>([]);
  const [offset, setOffset] = useState(0);

  const filteredItems = useCallback(async () => {
    try {
      const response = await authInstance.get("/api/product/categorylist");
      const data: fetchCategoryType = response.data;

      // 데이터를 배열로 변환하여 setCategoryList에 저장
      const categoryArray: fetchCategoryType[] = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const categoryData = data[key];
          categoryArray.push({ [key]: categoryData });
        }
      }
      setCateogryList(categoryArray);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    filteredItems();
  }, []);

  return (
    <Wrapper>
      <CategoryMenu setOffset={setOffset} />
      <FlatList
        data={categoryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CategoryList item={item} />}
      />
    </Wrapper>
  );
}
const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: #fdfdfd;
  flex: 1;
`;
