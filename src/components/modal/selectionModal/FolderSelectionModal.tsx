import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, FlatList } from "react-native";
import { Modal, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { fetchLikeFolderData } from "../../../api/productApi";
import styled from "styled-components/native";
import FolderPreview from "./FolderPreview";
import { textEditFolderFontSize } from "../../../style";
import { LikesFolderType } from "../../../screens/Likes";
import useModal from "../../../hooks/useModal";

interface FolderItemsType {
  title: string;
  productsId: number[];
  originFolder: string;
}
interface FolderPreviewType {
  item: LikesFolderType;
  index: number;
}

export default function FolderSelectionModal({
  title,
  productsId,
  originFolder,
}: FolderItemsType) {
  const [folderItems, setFolderItems] = useState<LikesFolderType[]>([]);
  const { closeModal } = useModal();

  const fetchFolderData = async () => {
    try {
      const response = await fetchLikeFolderData();
      setFolderItems(response.MyPickList);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = () => {
    closeModal("handleFolder");
  };

  useEffect(() => {
    fetchFolderData();
  }, []);

  const renderItem = ({ item, index }: FolderPreviewType) => {
    const isLastItem = index === folderItems.length - 1; // 마지막 요소 여부 확인
    return (
      <FolderPreview
        item={item}
        productIdList={productsId}
        isLastItem={isLastItem}
        originName={originFolder}
      />
    );
  };

  return (
    <Modal transparent onRequestClose={handleCloseModal}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <ModalBackground>
          <ModalContainer activeOpacity={1}>
            <Header>
              <TitleField>{title}</TitleField>
              <Close
                name="close"
                size={20}
                color="black"
                onPress={handleCloseModal}
              />
            </Header>
            <Content>
              <FlatList
                data={folderItems}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
              />
            </Content>
          </ModalContainer>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const ModalContainer = styled.TouchableOpacity`
  flex: 0.5;
  background: white;

  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Header = styled.View`
  margin-bottom: 5px;
  padding: 15px;
`;
const TitleField = styled.Text`
  text-align: center;
  font-size: ${textEditFolderFontSize};
  font-weight: 600;
`;
const Close = styled(AntDesign)`
  position: absolute;
  left: 15px;
  top: 16px;
`;
const Content = styled.View`
  padding: 0 15px;
`;
