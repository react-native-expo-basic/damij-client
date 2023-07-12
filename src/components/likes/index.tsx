import React, { useEffect, useState } from "react";
import ImageContainer from "./ImageContainer";
import styled from "styled-components/native";
import FolderInfo from "./FolderInfo";
import useModal from "../../hooks/useModal";
import { LikesFolderType } from "../../screens/Likes";

interface LikeFolderProps {
  cartItem: LikesFolderType;
  index: number;
}
export default function Index({ cartItem, index }: LikeFolderProps) {
  const { openModal } = useModal();
  const { folderCount, imgList, name } = cartItem;
  const productInfo = { folderCount, name };
  const handleLikeDetailModal = async (folderName: string) => {
    try {
      openModal("likeDetail", { folderName });
    } catch (error) {
      console.log("좋아요 폴더를 실행하는 도중에 오류가 발생했습니다.", error);
    }
  };
  return (
    <Wrapper
      onPress={() => handleLikeDetailModal(name)}
      style={index % 2 == 0 ? { marginRight: 7 } : { marginLeft: 7 }}
    >
      <ImageContainer images={imgList} />
      <FolderInfo productInfo={productInfo} />
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  width: 48%;
  position: relative;
  padding: 5px;
  margin-bottom: 10px;
`;
