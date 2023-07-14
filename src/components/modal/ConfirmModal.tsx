import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { BasicButton as Button } from "../Button";
import useModal from "../../hooks/useModal";
import styled from "styled-components/native";
import { textConfirmButtonColor, textConfirmContentSize } from "../../style";

interface ConrifmModalProps {
  message: string;
  handler: () => void;
}

export default function ConfirmModal({ message, handler }: ConrifmModalProps) {
  const { closeModal } = useModal();

  const handleDeleteEvent = () => {
    try {
      closeModal("confirm");
      handler();
    } catch (error) {
      console.log("상품을 삭제하는 도중에 알 수 없는 오류가 발생했습니다.");
    }
  };
  const handleCancelEvent = () => {
    closeModal("confirm");
  };

  return (
    <Modal onRequestClose={handleCancelEvent} transparent>
      <TouchableWithoutFeedback onPress={handleCancelEvent}>
        <ModalBackground>
          <ModalBox>
            <MessageArea>
              <Message>{message}</Message>
            </MessageArea>
            <ButtonArea>
              <Button
                color={textConfirmButtonColor}
                onPress={handleDeleteEvent}
              >
                확인
              </Button>
              <Button
                color={textConfirmButtonColor}
                onPress={handleCancelEvent}
              >
                취소
              </Button>
            </ButtonArea>
          </ModalBox>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.View`
  background: white;
  padding: 15px 20px;
  border-radius: 3px;
  width: 80%;
`;

const MessageArea = styled.View`
  min-height: 40px;
`;
const Message = styled.Text`
  font-size: ${textConfirmContentSize};
`;
const ButtonArea = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
