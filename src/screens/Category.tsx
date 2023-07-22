import React, { useState, useEffect, useRef } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import CategoryMenu from "../components/category/CategoryMenu";
import { authInstance } from "../api/api";
import CategoryList from "../components/category/CategoryList";

export interface fetchCategoryType {
  [key: string]: { [key: string]: string };
}

export default function Category() {
  const [categoryList, setCateogryList] = useState<fetchCategoryType[]>([]);
  const [selectedButton, setSelectedButton] = useState("상의");
  const flatListRef = useRef<FlatList>(null);
  const superCategories: { [key: string]: string } = {
    TOP: "상의",
    BOTTOM: "하의",
    OUTER: "아우터",
    HOME_WEAR: "홈웨어",
  };
  const filteredItems = async () => {
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
  };

  useEffect(() => {
    filteredItems();
  }, []);

  useEffect(() => {
    scrollToCategory(selectedButton);
  }, [selectedButton]);

  // 선택한 카테고리로 스크롤하는 함수
  const scrollToCategory = (category: string) => {
    const superCategoryKey = Object.keys(superCategories).find(
      (key) => superCategories[key] === category
    );

    if (superCategoryKey) {
      // 스크롤할 인덱스 찾기
      const index = categoryList.findIndex(
        (item) => Object.keys(item)[0] === superCategoryKey
      );

      // 스크롤 실행
      if (flatListRef.current && index !== -1) {
        flatListRef.current.scrollToIndex({ animated: true, index });
      }
    }
  };
  return (
    <Wrapper>
      <CategoryMenu
        setSelectedButton={setSelectedButton}
        selectedButton={selectedButton}
      />
      <FlatList
        data={categoryList}
        ref={flatListRef}
        keyExtractor={(item, index) => index.toString()}
        initialScrollIndex={0}
        renderItem={({ item }) => (
          <CategoryList item={item} superCategories={superCategories} />
        )}
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
