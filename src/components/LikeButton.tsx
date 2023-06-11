import React from "react";
import styled from "styled-components/native";
import { Octicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { toggleLike } from "../redux/modules/likes";
import useModal from "../hooks/useModal";

interface LikesBtnProps {
  isLiked: boolean;
  productId: number;
}

const LikeButton: React.FC<LikesBtnProps> = ({ isLiked, productId }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const toggleProductLikedStatus = () => {
    dispatch(toggleLike({ productId, isLiked }));
    openModal("alarm", { isLiked, productId });
  };

  return (
    <LikesBtn
      name={isLiked ? "heart-fill" : "heart"}
      isLiked={isLiked}
      size={24}
      onPress={toggleProductLikedStatus}
    />
  );
};

export default LikeButton;

const LikesBtn = styled(Octicons)<LikesBtnProps>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 18px;
  color: ${(props) => (props.isLiked ? "#ff5a5a" : "white")};
`;
