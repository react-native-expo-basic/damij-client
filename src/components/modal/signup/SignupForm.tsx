import React from "react";
import { Modal } from "react-native";
import { SignupReqType } from "../../../types/types";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { UseFormReturn, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fontisto } from "@expo/vector-icons";
import useModal from "../../../hooks/useModal";
import SignupInput from "./SignupInput";

export interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}
interface SignupFormProps {
  handleSignup: (data: SignupReqType) => void;
  errorMessage: string;
}
export default function SignupForm({
  handleSignup,
  errorMessage,
}: SignupFormProps) {
  const { closeModal } = useModal();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일 형식이어야 합니다.")
      .required("이메일은 필수 입력입니다."),
    password: yup
      .string()
      .min(8, "최소 8자리 이상 가능합니다")
      .max(15, "최대 15자리 까지 가능합니다")
      .matches(/^[a-zA-Z0-9]+$/, "영문과 숫자만 입력 가능합니다")
      .required("비밀번호는 필수 입력입니다."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<SignupFormValues> = useForm<SignupFormValues>({
    resolver: yupResolver(schema),
  });

  return (
    <Modal animationType="slide" onRequestClose={() => closeModal("signUp")}>
      <Wrapper>
        <CloseIconContainer onPress={() => closeModal("signUp")}>
          <AntDesign name="close" size={24} color="#a0a0a0" />
        </CloseIconContainer>
        <TitleContainer>
          <TitleText>회원가입</TitleText>
        </TitleContainer>
        <SignupFormContainer>
          <SignupInput
            name="email"
            control={control}
            keyboardType="email-address"
            placeholder="abc@email.com"
            errors={errors}
          >
            <Fontisto name="email" size={18} color="#a0a0a0" />
          </SignupInput>
          <SignupInput
            name="password"
            control={control}
            secureTextEntry={true}
            placeholder="영문,숫자 포함 8자 이상"
            errors={errors}
          >
            <Fontisto name="locked" size={18} color="grey" />
          </SignupInput>
          <SignupInput
            name="passwordConfirm"
            control={control}
            secureTextEntry={true}
            placeholder="비밀번호 확인"
            errors={errors}
          >
            <Fontisto name="locked" size={18} color="grey" />
          </SignupInput>
          <ButtonContainer onPress={handleSubmit(handleSignup)}>
            <ButtonField>회원가입 하기</ButtonField>
          </ButtonContainer>
        </SignupFormContainer>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.View`
  flex: 1;
  background: white;
`;
const SignupFormContainer = styled.View`
  padding: 30px 20px;
  flex: 1;
`;
const CloseIconContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 20px 0;
  display: flex;
  align-items: flex-end;
`;

const TitleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 3px;
  border-bottom-color: #f1f1f1;
  border-bottom-style: solid;
  box-sizing: border-box;
`;
const TitleText = styled.Text`
  font-size: 30px;
  font-family: "Noto-Sans-Bold";
  margin-bottom: -5px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #2c2b2b;

  padding: 15px 20px;
  width: 100%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const ButtonField = styled.Text`
  font-size: 15px;
  color: white;
`;
