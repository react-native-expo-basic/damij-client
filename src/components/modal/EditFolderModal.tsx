import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import useModal from "../../hooks/useModal";

export default function EditFolderModal() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { openModal, closeModal } = useModal();
  const inputRef = useRef<TextInput>(null);

  const handleInputContainerPress = () => {
    inputRef?.current?.focus();
  };
  const closeEventHandler = () => {
    closeModal("editFolder");
  };

  const completeEventHandler = () => {};

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={closeEventHandler}
      transparent
    >
      <TouchableWithoutFeedback onPress={closeEventHandler}>
        <ModalBackground>
          <ModalContainer
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          >
            <View>
              <AntDesign name="close" size={20} color="black" />
              <Title>{}</Title>
            </View>

            <InputField>
              <InputContainer onPress={handleInputContainerPress}>
                <Input ref={inputRef} />
              </InputContainer>
              <TouchableOpacity onPress={completeEventHandler}>
                <ConfirmText>확인</ConfirmText>
              </TouchableOpacity>
            </InputField>
          </ModalContainer>
        </ModalBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;
const InputField = styled.View`
  display: flex;
  flex-direction: row;
`;
const InputContainer = styled.TouchableOpacity`
  padding: 2px 10px;
  width: 100%;
  border-width: 1px;
  border-radius: 10px;
  border-color: #e3e3e3;
  display: flex;
  justify-content: center;
  flex: 1;
`;
const ConfirmText = styled.Text`
  padding: 13px 22px;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-left: 10px;
  border-radius: 8px;
  background: #171616;
`;
const ModalContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #fff;
  padding: 20px 10px;
`;

const Input = styled.TextInput<any>`
  font-size: 18px;
`;
