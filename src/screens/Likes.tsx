import React, { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import EditButtonContainer from "../components/likes/EditButtonContainer";
import LikeFolder from "../components/likes/index";
import { fetchLikeFolderData } from "../api/productApi";
import { loadingSpinnerColor } from "../style";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { addFolderList } from "../redux/modules/folderActions";
import { ProductItem } from "../components/modal/LikeProductListModal";
import { LikesState } from "../types/types";
import { MainAuthState } from "../types/types";

export interface LikesFolderType {
  folderCount: number;
  imgList: string[];
  name: string;
}
export interface ProductFolderState {
  folder: {
    filteredProducts: ProductItem[];
    originFolder: LikesFolderType[];
    products: ProductItem[];
  };
}

export default function Likes() {
  const [cartItems, setCartItems] = useState<LikesFolderType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const originfolder = useSelector(
    (state: ProductFolderState) => state.folder.originFolder
  );
  const products = useSelector(
    (state: ProductFolderState) => state.folder.products
  );
  const authState = useSelector((state: MainAuthState) => state.auth);
  const likesState = useSelector((state: LikesState) => state.likes.likes);

  const fetchFolderData = useCallback(async () => {
    try {
      const response = await fetchLikeFolderData();
      setCartItems(response.MyPickList);
      dispatch(addFolderList(response.MyPickList));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [products]);

  const handleFilteredFolder = useCallback(() => {
    setCartItems(originfolder);
  }, [originfolder]);

  useEffect(() => {
    setIsLoading(true);
    fetchFolderData();
  }, [likesState, products, authState]); // 전체 폴더리스트 가지고 올 때 >> 내부 폴더 상품리스트, 토큰, 좋아요 상태 변화시 적용

  useEffect(() => {
    handleFilteredFolder();
  }, [originfolder]); // 새폴더 추가했을 때 전체 폴더 리스트 가지고 옴

  return (
    <PaddingView>
      <EditButtonContainer />
      {isLoading ? (
        <LoadingSpinner size={30} color={loadingSpinnerColor} />
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <LikeFolder cartItem={item} index={index} />
          )}
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
