import React from "react";
import { View, Modal, Text } from "react-native";
import { BasicButton as Button } from "../Button";
import useModal from "../../hooks/useModal";
import styled from "styled-components/native";

interface ConrifmModalProps {
  message: string;
  handler: () => void;
}

export default function ConfirmModal({ message, handler }: ConrifmModalProps) {
  const { closeModal } = useModal();
  const closeEventHandler = () => {
    closeModal("confirm");
  };
  const handleDeleteEvent = async () => {
    try {
      /*      handler(); */
      closeModal("confirm");
    } catch (error) {
      console.log("상품을 삭제하는 도중에 알 수 없는 오류가 발생했습니다.");
    }
  };
  const handleCancelEvent = () => {
    closeModal("confirm");
  };
  return (
    <Modal onRequestClose={closeEventHandler} transparent>
      <ModalBackground onPress={closeEventHandler}>
        <View>
          <View>
            <Text>{message}</Text>
          </View>
          <View>
            <Button onPress={handleDeleteEvent}>확인</Button>
            <Button onPress={handleCancelEvent}>취소</Button>
          </View>
        </View>
      </ModalBackground>
    </Modal>
  );
}

const ModalBackground = styled.TouchableWithoutFeedback`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;
