import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
export default function SubCategory({ subCategoryTitle }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require("../../../assets/image/m_slide1.png")}
          style={styles.image}
        />
        <Text style={styles.subBtnText}>{subCategoryTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 5, paddingHorizontal: 2 },
  subBtnText: { textAlign: "center" },
  image: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
});
