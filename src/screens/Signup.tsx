import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { SignupReqType } from "../types/types";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import {
  UseFormReturn,
  useForm,
  useController,
  Control,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fontisto } from "@expo/vector-icons";
interface SignupProps {
  signup: (reqType: SignupReqType) => void;
}

export interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  /*  name: string; */
  address: string;
  /*   phoneNumb: number; */
}
//TextInput 컴포넌트의 속성들을 정의한 타입, input에 다른 속성들의 타입을 적용하기 위해 사용
export interface InputProps extends TextInputProps {
  name: keyof SignupFormValues;
  control: Control<SignupFormValues>;
}

//control >  패키지의 폼 관리를 위한 컨트롤러 객체 , name > eamil,password 등의 이름
const Input: React.FC<InputProps> = ({ name, control, ...textInputProps }) => {
  const { field } = useController({ control, defaultValue: "", name });
  return (
    <TextInput
      value={field.value?.toString()}
      onChangeText={field.onChange}
      {...textInputProps}
    />
  );
};

const Signup: React.FC<SignupProps> = ({ signup }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("유효한 이메일 형식이어야 합니다.")
      .required("이메일은 필수 입력입니다."),
    password: yup
      .string()
      .min(8, "최소 8자리 이상 가능합니다")
      .max(15, "최대 15자리 까지 가능합니다")
      .matches(
        /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/g,
        "영문, 숫자, 특수문자를 포함해주세요"
      )
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

  const onSubmit = (data: SignupFormValues) => {
    signup(data);
  };

  return (
    <Wrapper>
      <CloseIconContainer>
        <AntDesign name="close" size={24} color="black" />
      </CloseIconContainer>

      <TitleContainer>
        <TitleText>회원가입</TitleText>
      </TitleContainer>
      <SignupFormContainer>
        <InputWrapper>
          <Fontisto name="email" size={18} color="grey" />
          <InputContainer>
            <Input
              name="email"
              control={control}
              keyboardType="email-address"
              placeholder="Email(필수)"
            ></Input>
          </InputContainer>
        </InputWrapper>

        {/* <View>
          <ErrorText>{errors.email?.message}</ErrorText>
        </View> */}
        <InputWrapper>
          <Fontisto name="locked" size={18} color="grey" />
          <InputContainer>
            <Input
              name="password"
              control={control}
              secureTextEntry={true}
              placeholder="비밀번호 8~15자리 입력(대문자,소문자,특수문자 필수)"
            ></Input>
          </InputContainer>
        </InputWrapper>

        {/*    <View>
          <ErrorText>{errors.password?.message}</ErrorText>
        </View> */}
        <InputWrapper>
          <View>
            <Fontisto name="locked" size={18} color="grey" />
          </View>
          <InputContainer>
            <Input
              name="passwordConfirm"
              control={control}
              secureTextEntry={true}
              placeholder="비밀번호 확인"
            ></Input>
          </InputContainer>
        </InputWrapper>

        {/*  <AddressInput Input={Input} control={control}></AddressInput> */}
        <ErrorContainer>
          <ErrorText>
            {errors.email?.message ||
              errors.password?.message ||
              errors.passwordConfirm?.message}
          </ErrorText>
        </ErrorContainer>
        <TouchableOpacity>
          <ButtonContainer onPress={handleSubmit(onSubmit)}>
            <ButtonField>회원가입 하기</ButtonField>
          </ButtonContainer>
        </TouchableOpacity>
      </SignupFormContainer>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.View`
  flex: 1;
  background: white;
`;
const SignupFormContainer = styled.View`
  padding: 30px 20px;
  flex: 1;
`;
const CloseIconContainer = styled.View`
  width: 100%;
  padding: 20px 20px 0;
  display: flex;
  align-items: flex-end;
`;

const TitleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 3;
  border-bottom-color: #f1f1f1;
  border-bottom-style: solid;
  box-sizing: border-box;
`;
const TitleText = styled.Text`
  font-size: 30px;
  font-family: "Noto-Sans-Bold";
  margin-bottom: -5px;
`;

const ErrorText = styled.Text`
  margin: 2px 0;
  font-size: 12px;
  color: #c84040;
`;
const ErrorContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
`;
const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center; /* 세로 방향 가운데 정렬 */
  padding: 10px 15px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;
const InputContainer = styled.View`
  margin-left: 10px;
`;
const ButtonContainer = styled.TouchableOpacity`
  background-color: #2c2b2b;
  padding: 15px 20px;
  width: 100%;
  border-radius: 2px;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;
const ButtonField = styled.Text`
  font-size: 15px;
  color: white;
`;
