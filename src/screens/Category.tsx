import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CategoryMenu from "../components/category/CategoryMenu";
import styled from "styled-components/native";
import SubCategory from "../components/category/SubCategory";

const categoryList = [
  { categoryTitle: "상의", categoryName: "topWear" },
  { categoryTitle: "하의", categoryName: "bottomWear" },
  { categoryTitle: "원피스", categoryName: "dress" },
];

export default function Category() {
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [currentCategoryData, setCurrentCategoryData] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.categoryList}>
          {categoryList.map((category) => (
            <CategoryMenu
              key={category.categoryName}
              categoryTitle={category.categoryTitle}
              categoryName={category.categoryName}
              setSubCategoryList={setSubCategoryList}
              setCurrentCategoryData={setCurrentCategoryData}
              currentCategoryData={currentCategoryData}
              isFocus={category.categoryTitle === currentCategoryData}
            />
          ))}
        </View>

        <View style={styles.subCategoryList}>
          <FlatList
            data={subCategoryList}
            renderItem={({ item }) => <SubCategory subCategoryTitle={item} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            contentContainerStyle={styles.subCategoryListContent}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  categoryList: {},
  subCategoryList: {
    flexDirection: "row",
  },
  subCategoryListContent: {},
});
