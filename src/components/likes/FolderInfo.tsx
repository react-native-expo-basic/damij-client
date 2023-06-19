import React, { useState } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { textCountListColor } from "../../style";
import useModal from "../../hooks/useModal";
import EditFavoritFolderModal from "./EditFavoritFolderModal";
import { ProductType } from "types/types";

interface FolderInfoProps {
  product: ProductType[];
}

export default function FolderInfo({ product }: FolderInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickEditModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <FlexContainer>
      <View>
        <FolderTitle>{product[0]?.folderName}</FolderTitle>
        <CountList>{`${product.length}개`}</CountList>
      </View>
      <EditContainer onPress={clickEditModalHandler}>
        <Feather name="more-vertical" size={22} color="grey" />
      </EditContainer>
      {isModalOpen && (
        <EditFavoritFolderModal
          onClose={closeModal}
          folderName={product[0]?.folderName}
        />
      )}
    </FlexContainer>
  );
}

const FlexContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
`;
const FolderTitle = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;
const CountList = styled.Text`
  color: ${textCountListColor};
`;

const EditContainer = styled.TouchableOpacity`
  position: relative;
`;
