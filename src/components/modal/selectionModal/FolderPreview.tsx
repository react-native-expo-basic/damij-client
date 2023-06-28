import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { LikesFolderType } from "../../../screens/Likes";
import { borderFolderModalColor } from "../../../style";
import { useDispatch } from "react-redux";
import { changeFolder } from "../../../redux/modules/folder";
import useModal from "../../../hooks/useModal";

interface FolderPreviewProps {
  item: LikesFolderType;
  productId: number[];
}

export default function FolderPreview({ item, productId }: FolderPreviewProps) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleChangeFolder = (folderName: string) => {
    dispatch(
      changeFolder({
        products: productId,
        changeFolder: folderName,
      })
    );
    closeModal("handleFolder");
  };

  return (
    <Wrapper
      activeOpacity={1}
      onPress={() => handleChangeFolder(item.productInfo.folderName)}
    >
      <ImgContainer>
        <Img source={{ uri: item.image[0] }} resizeMode="cover" />
      </ImgContainer>
      <FolderInfo>
        <FolderName>{item.productInfo.folderName}</FolderName>
      </FolderInfo>
    </Wrapper>
  );
}
const Wrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  border-color: ${borderFolderModalColor};
  border-top-width: 1px;
`;
const ImgContainer = styled.View`
  aspect-ratio: 1/1.2;
  border-radius: 6px;
  aspect-ratio: 1/1;
  height: 60px;
  overflow: hidden;
  position: relative;
`;
const Img = styled.Image`
  flex: 1;
`;
const FolderInfo = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: 15px;
`;
const FolderName = styled.Text`
  font-weight: 600;
`;
