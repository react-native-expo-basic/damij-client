import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import EditButtonContainer from "../components/likes/EditButtonContainer";
import LikeFolder from "../components/likes/index";
import { fetchLikeFolderData } from "../utils/productUtils";
import { loadingSpinnerColor } from "../style";
import LoadingSpinner from "../components/LoadingSpinner";

export interface LikesFolderType {
  image: Array<string>;
  productInfo: {
    folderName: string;
    length: number;
  };
}

export default function Likes() {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<LikesFolderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      const response = await fetchLikeFolderData();
      setCartItems(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  /*   cartItems.length > 0 && cartItems.map((item) => console.log(item.folderName)); */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);
      fetchProductData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <PaddingView>
      {isLoading ? (
        <LoadingSpinner size={30} color={loadingSpinnerColor} />
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productInfo.folderName}
          renderItem={({ item }) => <LikeFolder cartItem={[item]} />}
          ListHeaderComponent={<EditButtonContainer />}
          numColumns={2}
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
