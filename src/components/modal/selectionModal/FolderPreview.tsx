import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { LikesFolderType } from "../../../screens/Likes";
import { borderFolderModalColor } from "../../../style";
import { useDispatch } from "react-redux";
import { changeFolder } from "../../../redux/modules/folderActions";
import useModal from "../../../hooks/useModal";

interface FolderPreviewProps {
  item: LikesFolderType;
  productIdList: number[];
  isLastItem: boolean;
  originName: string;
}

export default function FolderPreview({
  item,
  productIdList,
  isLastItem,
  originName,
}: FolderPreviewProps) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleChangeFolder = (changeName: string) => {
    dispatch(
      changeFolder({
        productIdList,
        changeName,
        originName,
      })
    );
    closeModal("handleFolder");
  };

  return (
    <Wrapper
      activeOpacity={1}
      onPress={() => handleChangeFolder(item.name)}
      isLastItem={isLastItem}
    >
      <ImgContainer>
        {item.imgList[0] ? (
          <Img source={{ uri: item.imgList[0] }} resizeMode="cover" />
        ) : (
          <Img
            source={{
              uri: "https://contents.lotteon.com/itemimage/_v180423/LO/15/98/39/13/69/_1/59/83/91/37/1/LO1598391369_1598391371_1.jpg/dims/optimize/dims/resizemc/400x400",
            }}
            resizeMode="cover"
          />
        )}
      </ImgContainer>

      <FolderInfo>
        <FolderName>{item.name}</FolderName>
      </FolderInfo>
    </Wrapper>
  );
}
const Wrapper = styled.TouchableOpacity<{ isLastItem: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;

  border-color: ${(props) =>
    props.isLastItem ? "transparent" : borderFolderModalColor};
  border-bottom-width: 1px;
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
