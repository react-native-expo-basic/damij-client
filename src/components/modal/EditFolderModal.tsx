import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import useModal from "../../hooks/useModal";

interface EditFolderPropsType {
  title: string;
  placeholder: string;
  value: string;
}
export default function EditFolderModal(props: EditFolderPropsType) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { openModal, closeModal } = useModal();
  const inputRef = useRef<TextInput>(null);
  const windowWidth = Dimensions.get("window").width;

  const { title, placeholder, value } = props;

  const handleInputContainerPress = () => {
    inputRef?.current?.focus();
  };
  const closeEventHandler = () => {
    closeModal("editFolder");
  };
  const onChange = () => {};
  const completeEventHandler = async () => {
    try {
      const inputValue = inputRef.current?.props.value;
      console.log(inputValue);
      let response = await axios.post("http://192.168.35.190:3000/likes", {
        inputValue,
      });

      if (response.data !== 201) {
        closeModal("editFolder");
        openModal("confirm", { value: "중복된 폴더명이 존재합니다." });
      }
    } catch (error) {
      console.log("폴더명을 입력하는 과정에서 오류가 발생했습니다.", error);
    }
  };

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
            <TitleContainer>
              <Close name="close" size={20} color="black" />
              <Title>{title}</Title>
            </TitleContainer>

            <InputField>
              <InputContainer onPress={handleInputContainerPress}>
                <Input
                  ref={inputRef}
                  placeholder={placeholder}
                  defaultValue={value}
                  onChangeText={onChange}
                />
              </InputContainer>
              <TouchableOpacity onPress={() => completeEventHandler()}>
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

const Close = styled(AntDesign)`
  position: absolute;
  left: 0px;
`;

const TitleContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
  line-height: 20px;
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
