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

interface LikesBtnProps {
  isSelected: boolean;
  productId: number;
}

interface LikesStateType {
  likes: { likes: { isLiked: boolean; productId: number | null } };
}
const LikeButton: React.FC<LikesBtnProps> = ({ isSelected, productId }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const likesState = useSelector((state: LikesStateType) => state.likes.likes);
  const [isLiked, setIsLiked] = useState(isSelected);

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

  useEffect(() => {
    if (productId === likesState.productId) {
      setIsLiked(likesState.isLiked);
      console.log(likesState.isLiked);
    }
  }, [likesState]);

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
