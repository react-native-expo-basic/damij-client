import React, { useState, useEffect } from "react";
import { ProductType } from "../types/types";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import { ProductItem } from "./modal/LikeProductListModal";

export default function LikeProduct(props: ProductItem) {
  const { name, image, price } = props;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
