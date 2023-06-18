import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { searchCategory } from "../../utils/categoryUtils";

export default function CategoryMenu({
  categoryTitle,
  categoryName,
  setSubCategoryList,
  setCurrentCategoryData,
  isFocus,
  currentCategoryData,
}) {
  const handlePress = () => {
    searchCategory(categoryName).then((res) => {
      setSubCategoryList(res.data[0].subCategoryList);
      setCurrentCategoryData(categoryTitle);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.categoryBtn} onPress={handlePress}>
        <Text style={isFocus ? styles.btnTextOnFocus : styles.btnText}>
          {categoryTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    fontWeight: "400",
    paddingHorizontal: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "white",
  },
  btnTextOnFocus: {
    fontSize: 20,
    fontWeight: "400",
    paddingHorizontal: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "gray",
  },
  container: {
    backgroundColor: "white",
  },
  categoryBtn: {},
});
