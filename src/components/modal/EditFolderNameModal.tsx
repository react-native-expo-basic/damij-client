import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AddFolder } from "../../api/folderApi";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import useModal from "../../hooks/useModal";
import Input from "../Input";
import { addFolder } from "../../redux/modules/folder";
import { useDispatch, useSelector } from "react-redux";
import { AddFolderState } from "../../types/types";

interface EditFolderPropsType {
  title: string;
  placeholder: string;
  value: string;
}

export default function EditFolderNameModal(props: EditFolderPropsType) {
  const { openModal, closeModal } = useModal();
  const [inputValue, setInputValue] = useState(props.value);
  const dispatch = useDispatch();
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  /*  const addFolderState = useSelector(
    (state: AddFolderState) => state.folder.originFolder
  ); */

  const inputRef = useRef<TextInput>(null);
  const { title, placeholder, value } = props;

  const closeEventHandler = () => {
    closeModal("editFolder");
  };

  const onChange = (text: string) => {
    setInputValue(text);
    setIsButtonEnabled(text.trim().length <= 0);
  };
  const completeEventHandler = async () => {
    if (!isButtonEnabled) {
      try {
        dispatch(addFolder(inputValue));

        /*   if (response.data == 201) {
          closeModal("editFolder");
          openModal("alert", { value: "중복된 폴더명이 존재합니다." });
        } */
        closeEventHandler();
      } catch (error) {
        console.log("폴더명을 입력하는 과정에서 오류가 발생했습니다.", error);
      }
    }
  };

  useEffect(() => {
    Keyboard.dismiss();
    const timeout = setTimeout(() => {
      inputRef?.current?.focus();
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Modal onRequestClose={closeEventHandler} transparent>
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
              <InputContainer>
                <Input
                  ref={inputRef}
                  placeholder={placeholder}
                  value={value}
                  fontSize={18}
                  onChange={onChange}
                />
              </InputContainer>
              <TouchableOpacity
                onPress={completeEventHandler}
                disabled={isButtonEnabled}
              >
                <ConfirmText isButtonEnabled={isButtonEnabled}>
                  확인
                </ConfirmText>
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
const ConfirmText = styled.Text<{ isButtonEnabled: boolean }>`
  padding: 13px 22px;
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-left: 10px;
  border-radius: 8px;
  background: ${(props) => (props.isButtonEnabled ? "grey" : "#171616")};
`;
const ModalContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #fff;
  padding: 20px 10px;
`;
