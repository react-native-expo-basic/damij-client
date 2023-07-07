import React, { useState } from "react";
import { SigninReqType } from "../../../types/types";
import { Image } from "react-native";
import styled from "styled-components/native";
import { View, TouchableOpacity, Modal } from "react-native";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { UseFormReturn, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useModal from "../../../hooks/useModal";
import AuthFormInput from "../../../components/AuthFormInput";

interface SignInProps {
  handleSignin: (data: SigninReqType) => void;
  errorMessage: string;
}

export default function SignInForm({
  handleSignin,
  errorMessage,
}: SignInProps) {
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
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<SigninReqType> = useForm<SigninReqType>({
    resolver: yupResolver(schema),
  });
  return (
    <Modal animationType="slide" onRequestClose={() => closeModal("signIn")}>
      <Wrapper>
        <CloseIconContainer onPress={() => closeModal("signIn")}>
          <AntDesign name="close" size={24} color="#a0a0a0" />
        </CloseIconContainer>

        <SignupFormContainer>
          <TitleContainer>
            <LogoImage
              source={require("../../../../assets/image/logo.png")}
              resizeMode="contain"
            />
          </TitleContainer>
          <AuthFormInput
            name="email"
            control={control}
            keyboardType="email-address"
            placeholder="abc@email.com"
            errors={errors}
          >
            <Fontisto name="email" size={18} color="#a0a0a0" />
          </AuthFormInput>
          <AuthFormInput
            name="password"
            control={control}
            secureTextEntry={true}
            placeholder="영문,숫자 포함 8자 이상"
            errors={errors}
          >
            <Fontisto name="locked" size={18} color="grey" />
          </AuthFormInput>
          <ErrorContainer>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorContainer>
          <ButtonContainer onPress={handleSubmit(handleSignin)}>
            <ButtonField>로그인</ButtonField>
          </ButtonContainer>
        </SignupFormContainer>
      </Wrapper>
    </Modal>
  );
}
const Wrapper = styled.View`
  flex: 1;
  padding: 30px 20px;
  background: white;
`;
const SignupFormContainer = styled.View`
  flex: 1;
  margin-top: 20%;
`;

const CloseIconContainer = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const TitleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
`;
const TitleText = styled.Text`
  font-size: 30px;
  font-family: "Noto-Sans-Bold";
  margin-bottom: -5px;
`;
const LogoImage = styled.Image`
  border-radius: 20px;
  margin-bottom: 20%;
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
const ErrorContainer = styled.View`
  width: 100%;
`;
const ErrorMessage = styled.Text`
  margin-left: 10px;
  text-align: center;
  font-size: 12px;
  color: #c84040;
`;
