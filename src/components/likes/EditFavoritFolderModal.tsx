import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useModal from "../../hooks/useModal";
import axios from "axios";

interface FlexContainerProps {
  isFirst?: boolean;
}
interface EditFavoritFolderModalProps {
  onClose: () => void;
  folderName: string;
}
export default function EditFavoritFolderModal({
  onClose,
  folderName,
}: EditFavoritFolderModalProps) {
  const TranslateX = useRef(new Animated.Value(200)).current;
  const { openModal, closeModal } = useModal();
  const fadeIn = () => {
    Animated.timing(TranslateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
    return () => {
      TranslateX.setValue(200);
    };
  }, [onClose, TranslateX]);

  const handleDelete = async () => {
    try {
      await axios.delete("http://172.30.1.4:3000/likes", { data: folderName });
    } catch (error) {
      console.log("폴더를 삭제하는 도중 오류가 발생했습니다.", error);
    }
    onClose();
  };

  const handleEdit = () => {
    openModal("editFolder", {
      title: "폴더 이름 바꾸기",
      placeholder: "폴더 이름을 입력해주세요.",
      value: folderName,
    });
    onClose();
  };

  return (
    <Wrapper
      style={{
        transform: [
          { translateX: TranslateX },
          {
            scale: TranslateX.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0], // 오른쪽에서 왼쪽으로 확대/축소
              extrapolate: "clamp", // 범위 넘어갈 시 클램핑
            }),
          },
        ],
      }}
    >
      <FlexContainer onPress={handleEdit} isFirst>
        <EditTextButton>폴더 이름 바꾸기</EditTextButton>
        <FontAwesome name="pencil-square-o" size={19} color="black" />
      </FlexContainer>
      <FlexContainer onPress={handleDelete}>
        <DeleteTextButton>삭제</DeleteTextButton>
        <AntDesign name="delete" size={19} color="red" />
      </FlexContainer>
    </Wrapper>
  );
}
const Wrapper = styled(Animated.View)`
  position: absolute;
  bottom: 30px;
  right: 0;
  background: white;
  width: 180px;
  padding: 20px;
  border-radius: 5px;
  elevation: 3;
  transform-origin: right;
`;
const FlexContainer = styled.TouchableOpacity<FlexContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ isFirst }) => isFirst && "margin-bottom: 15px;"}
`;

const DeleteTextButton = styled.Text`
  color: red;
  font-size: 18px;
`;
const EditTextButton = styled.Text`
  font-size: 18px;
`;
