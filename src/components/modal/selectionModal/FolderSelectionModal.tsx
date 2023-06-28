import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, FlatList } from "react-native";
import { Modal, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { fetchLikeFolderData } from "../../../utils/productUtils";
import styled from "styled-components/native";
import FolderPreview from "./FolderPreview";
import { textEditFolderFontSize } from "../../../style";
import { LikesFolderType } from "../../../screens/Likes";
import useModal from "../../../hooks/useModal";

interface FolderItemsType {
  image: string[];
  productInfo: {
    folderName: string;
    length: number;
  };
}

export default function FolderSelectionModal({
  title,
  productsId,
}: {
  title: string;
  productsId: number[];
}) {
  const [folderItems, setFolderItems] = useState<FolderItemsType[]>([]);
  const { closeModal } = useModal();
  console.log(folderItems);
  const fetchFolderData = async () => {
    try {
      // api 수정 예정
      const response = await fetchLikeFolderData();
      setFolderItems(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = () => {
    closeModal("handleFolder");
  };
  const handleContainerPress = (e: TouchEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    fetchFolderData();
  }, []);

  const renderItem = ({ item }: { item: LikesFolderType }) => {
    return <FolderPreview item={item} productId={productsId} />;
  };
  return (
    <Modal transparent onRequestClose={handleCloseModal}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <ModalBackground>
          <ModalContainer
            onPress={() => handleContainerPress}
            activeOpacity={1}
          >
            <Header>
              <TitleField>{title}</TitleField>
              <Close name="close" size={20} color="black" />
            </Header>
            <Content>
              <FlatList
                data={folderItems}
                keyExtractor={(item) => item.productInfo.folderName}
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
