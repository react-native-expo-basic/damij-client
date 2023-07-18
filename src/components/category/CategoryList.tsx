import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { fetchCategoryType } from "../../screens/Category";
import SubCategories from "./SubCategories";
import { SubCategoryType } from "./SubCategories";

interface CategoryListProps {
  item: fetchCategoryType;
}

export default function CategoryList({ item }: CategoryListProps) {
  const [category, setCategory] = useState([]);
  const superCategories: { [key: string]: string } = {
    TOP: "상의",
    BOTTOM: "하의",
    OUTER: "아우터",
    HOME_WEAR: "홈웨어",
  };
  const renderItem = ({ item }: { item: { [key: string]: string } }) => {
    return <SubCategories category={item} />;
  };

  return (
    <CategoryContainer>
      {Object.entries(item).map(([key, value], idx) => {
        // superCategories에서 key에 해당하는 값을 가져옴
        const categoryItemText = superCategories[key];
        return (
          <View key={idx.toString()}>
            <View>
              <Text>{categoryItemText}</Text>
            </View>
            <View>
              <FlatList
                data={Object.entries(value).map(([category, image]) => ({
                  [category]: image,
                }))}
                renderItem={renderItem}
                keyExtractor={(item) => Object.keys(item)[0].toString()}
                numColumns={3}
              />
            </View>
          </View>
        );
      })}
    </CategoryContainer>
  );
}

const CategoryContainer = styled.View`
  width: 100%;
`;
