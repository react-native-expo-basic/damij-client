import React from "react";
import styled from "styled-components/native";
import { textEditColor } from "../../style";
import useModal from "../../hooks/useModal";

export default function EditButtonContainer() {
  const { openModal } = useModal();
  const handleNewFolderModal = () => {
    openModal("editFolder", {
      title: "새로운 폴더 만들기",
      placeholder: "폴더 이름은 최소 한글자 이상 입력해주세요.",
    });
  };
  return (
    <Container onPress={handleNewFolderModal}>
      <EditText>새폴더</EditText>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  margin-right: 15px;
  margin-bottom: 20px;
`;
const EditText = styled.Text`
  color: ${textEditColor};
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  margin-left: 3px;
`;
