import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ImageContainer from "./ImageContainer";
import styled from "styled-components/native";
import FolderInfo from "./FolderInfo";
import { fetchLikeProductData } from "../../utils/productUtils";
import { LikesFolderType } from "../../screens/Likes";
import useModal from "../../hooks/useModal";
interface LikeFolderProps {
  cartItem: LikesFolderType[];
}
export default function Index({ cartItem }: LikeFolderProps) {
  const { openModal } = useModal();
  const handleLikeDetailModal = async (folderName: string) => {
    try {
      openModal("likeDetail", { folderName });
    } catch (error) {
      console.log("좋아요 폴더를 실행하는 도중에 오류가 발생했습니다.", error);
    }
  };
  return (
    <>
      {cartItem.map((item, idx) => {
        return (
          <Wrapper
            key={item.productInfo.folderName}
            onPress={() => handleLikeDetailModal(item.productInfo.folderName)}
            style={idx % 2 == 0 ? { marginRight: 7 } : { marginLeft: 7 }}
          >
            <ImageContainer images={item.image} />
            <FolderInfo productInfo={item.productInfo} />
          </Wrapper>
        );
      })}
    </>
  );
}

const Wrapper = styled.TouchableOpacity`
  width: 50%;
  position: relative;
  padding: 5px;
`;
