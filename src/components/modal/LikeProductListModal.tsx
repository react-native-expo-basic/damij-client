import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import styled from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import LikeProduct from "../../components/LikeProduct";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { textEditFolderColor } from "../../style";
export interface ProductItem {
  name: string;
  image: string;
  price: number;
}

export interface LikeProductProps {
  folderName: string;
  productItem: ProductItem[];
}

export default function LikeProductListModal({
  product,
}: {
  product: LikeProductProps;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const renderItem = ({ item }: { item: ProductItem }) => (
    <LikeProductContainer>
      <LikeProduct {...item} />
    </LikeProductContainer>
  );
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => setIsVisible(!isVisible)}
      visible={isVisible}
    >
      <Header>
        <FlexContainer>
          <SimpleLineIcons name="arrow-left" size={24} color="black" />
          <Text>{product.folderName}</Text>
        </FlexContainer>
        <TouchableOpacity>
          <EditButtonText>{isClicked ? "완료" : "편집"}</EditButtonText>
        </TouchableOpacity>
      </Header>
      <FlatList
        data={product.productItem}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        ListHeaderComponent={
          <EditButtonText>
            찜한 상품 수: {product.productItem.length}
          </EditButtonText>
        }
      />
      {isClicked ? (
        <View>
          <View>
            <MaterialCommunityIcons
              name="folder-move-outline"
              size={24}
              color="black"
            />
            <EditSecionText isClicked={isClicked}>폴더 이동</EditSecionText>
          </View>
          <View>
            <AntDesign name="delete" size={24} color="black" />
            <EditSecionText isClicked={isClicked}>삭제</EditSecionText>
          </View>
        </View>
      ) : (
        ""
      )}
    </Modal>
  );
}

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const EditButtonText = styled.Text`
  color: ${textEditFolderColor};
`;
const LikeProductContainer = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;
const EditSecionText = styled.View<{ isClicked: boolean }>`
  color: grey;
`;
