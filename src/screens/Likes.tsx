import React, { useEffect, useState } from "react";
import { Image, View, Text, ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import EditButtonContainer from "../components/likes/EditButtonContainer";
import LikeFolder from "../components/likes/LikeFolder";
import { DataType, ProductType } from "../types/types";
import { fetchProductLikeData } from "../utils/productUtils";
import { useSelector } from "react-redux";
import { LikesProductType } from "../types/types";

interface LikesState {
  likes: LikesProductType;
}

export default function Likes() {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductData = async () => {
    const response = await fetchProductLikeData();
    setCartItems(response);
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      fetchProductData();
    });

    return unsubscribe;
  }, []);

  const data = [{ id: "button" }, { id: "productList" }];

  const renderItem = ({ item }: { item: DataType }) => {
    switch (item.id) {
      case "swiper":
        return <EditButtonContainer />;
      case "productList":
        return <LikeFolder productInfo={cartItems} />;
      default:
        return null;
    }
  };

  return (
    <PaddingView>
      {isLoading ? (
        <LoadingSpinner size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </PaddingView>
  );
}

const PaddingView = styled.View`
  padding: 20px 15px 0;
  background-color: white;
  flex: 1;
`;

const LoadingSpinner = styled.ActivityIndicator`
  position: absolute;
  left: 50%;
`;
