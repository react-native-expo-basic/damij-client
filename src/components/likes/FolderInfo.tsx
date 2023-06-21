import React, { useState } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { textCountListColor } from "../../style";
import useModal from "../../hooks/useModal";
import EditFavoritFolderModal from "./EditFavoritFolderModal";
import { ProductType } from "types/types";

interface FolderInfoProps {
  folderName: string;
  length: number;
}

export default function FolderInfo({
  productInfo,
}: {
  productInfo: FolderInfoProps;
}) {
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
        <FolderTitle>{productInfo.folderName}</FolderTitle>
        <CountList>{`${productInfo.length}개`}</CountList>
      </View>
      <EditContainer onPress={clickEditModalHandler}>
        <Feather name="more-vertical" size={22} color="grey" />
      </EditContainer>
      {isModalOpen && (
        <EditFavoritFolderModal
          onClose={closeModal}
          folderName={productInfo.folderName}
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
  margin-top: 5px;
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
