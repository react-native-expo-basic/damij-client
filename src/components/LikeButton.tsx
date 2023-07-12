import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Octicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../redux/modules/likes";
import useModal from "../hooks/useModal";
import { uploadProductLikeData } from "../utils/productUtils";
import { ProductType } from "../types/types";
import { LikesProductType } from "../types/types";
import TokenService from "../services/TokenSerivce";
import { MainLikesState } from "../types/types";
import { ProductFolderState } from "../screens/Likes";

interface LikesBtnProps {
  isSelected: boolean;
  productId: number;
}
interface LikesProductsList {
  folder: { likesProducts: number[] };
}
interface LikesStateType {
  likes: { likes: { isLiked: boolean; productId: number | null } };
}
const LikeButton: React.FC<LikesBtnProps> = ({ isSelected, productId }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const likeButtonState = useSelector(
    (state: LikesStateType) => state.likes.likes
  );

  const [isLiked, setIsLiked] = useState(isSelected);
  const likedProducts = useSelector(
    (state: LikesProductsList) => state.folder.likesProducts // 변경: products를 likesProducts로 변경
  );

  const toggleProductLikedStatus = async () => {
    const isToken = await TokenService.get();

    if (isToken === null) {
      openModal("alert", {
        message: "좋아요 버튼은 로그인을 하셔야 사용가능합니다.",
      });
      return;
    }
    dispatch(toggleLike({ productId, isLiked }));
    openModal("alarm", { isLiked, productId });
  };

  // 좋아요 버튼을 눌렀을 때 로컬 버튼 상태변경
  useEffect(() => {
    if (productId === likeButtonState.productId) {
      setIsLiked(likeButtonState.isLiked);
    }
  }, [likeButtonState]);

  //찜 카테고리에서 삭제된 상품리스트들을 참고하여 로컬 좋아요 버튼 상태 변경
  useEffect(() => {
    if (likedProducts.includes(productId)) {
      setIsLiked(false);
    }
  }, [likedProducts]);
  return (
    <LikesBtn
      name={isLiked ? "heart-fill" : "heart"}
      isSelected={isLiked}
      size={24}
      onPress={toggleProductLikedStatus}
    />
  );
};

export default LikeButton;

const LikesBtn = styled(Octicons)<{ isLiked: boolean }>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 18px;
  color: ${(props) => (props.isLiked ? "#ff5a5a" : "white")};
`;
