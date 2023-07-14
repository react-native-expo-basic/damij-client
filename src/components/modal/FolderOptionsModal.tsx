import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useModal from "../../hooks/useModal";
import { deleteFolder } from "../../redux/modules/folderActions";
import { useDispatch } from "react-redux";

interface EditFavoritFolderModalProps {
  folderName: string;
  offsetX: number;
  offsetY: number;
}

export default function FolderOptionsModal({
  folderName,
  offsetX,
  offsetY,
}: EditFavoritFolderModalProps) {
  const TranslateX = useRef(new Animated.Value(200)).current;
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch();
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
  }, [TranslateX]);

  const handleEdit = () => {
    openModal("editFolder", {
      title: "폴더 이름 바꾸기",
      placeholder: "폴더 이름을 입력해주세요.",
      value: folderName,
    });
    closeModal("FolderOption");
  };
  const handleCloseEvent = () => {
    closeModal("FolderOption");
  };
  return (
    <Modal transparent={true} onRequestClose={handleCloseEvent}>
      <TouchableWithoutFeedback onPress={handleCloseEvent}>
        <ModalBackground>
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
            offsetX={offsetX}
            offsetY={offsetY}
          >
            <FlexContainer onPress={handleEdit} isFirst>
              <EditTextButton>폴더 이름 바꾸기</EditTextButton>
              <FontAwesome name="pencil-square-o" size={19} color="black" />
            </FlexContainer>
            <FlexContainer onPress={() => dispatch(deleteFolder(folderName))}>
              <DeleteTextButton>삭제</DeleteTextButton>
              <AntDesign name="delete" size={19} color="red" />
            </FlexContainer>
          </Wrapper>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
const Wrapper = styled(Animated.View)<{ offsetX: number; offsetY: number }>`
  position: absolute;
  left: ${(props) => props.offsetX - 170}px;
  top: ${(props) => props.offsetY - 100}px;
  background: white;
  width: 180px;
  padding: 20px;
  border-radius: 5px;
  elevation: 3;
  transform-origin: right;
`;
const FlexContainer = styled.TouchableOpacity<{ isFirst?: boolean }>`
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
const ModalBackground = styled.View`
  flex: 1;
  position: relative;
  left: 0;
  top: 0;
`;

const EditTextButton = styled.Text`
  font-size: 18px;
`;
