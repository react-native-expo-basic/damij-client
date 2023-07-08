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

interface LikesBtnProps {
  isSelected: boolean;
  productId: number;
}

const LikeButton: React.FC<LikesBtnProps> = ({ isSelected, productId }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const [isLiked, setIsSelected] = useState(isSelected);
  const toggleProductLikedStatus = async () => {
    const isToken = await TokenService.get();

    if (isToken !== null) {
      dispatch(toggleLike({ productId, isLiked }));
      openModal("alarm", { isLiked, productId });
      return;
    }

    openModal("alert", {
      message: "좋아요 버튼은 로그인을 하셔야 사용가능합니다.",
    });
  };

  return (
    <LikesBtn
      name={isSelected ? "heart-fill" : "heart"}
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
