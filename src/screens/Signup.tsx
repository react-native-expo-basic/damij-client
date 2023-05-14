import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, TextInputProps } from "react-native";
import { SignupReqType } from "../types/types";
import {
  UseFormReturn,
  useForm,
  useController,
  Control,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkLoggedInUser } from "../services/UserService";
import styled from "styled-components/native";

interface SignupProps {
  signup: (reqType: SignupReqType) => void;
}

interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  /*  name: string; */
  /*   address: string; */
  /*   phoneNumb: number; */
}
//TextInput 컴포넌트의 속성들을 정의한 타입, input에 다른 속성들의 타입을 적용하기 위해 사용
interface InputProps extends TextInputProps {
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
  useEffect(() => {
    checkLoggedInUser();
  }, []);
  return (
    <Wrapper>
      <View>
        <Text>회원가입</Text>
      </View>
      <View>
        <Text>이메일 : </Text>
        <Input
          name="email"
          control={control}
          keyboardType="email-address"
        ></Input>
      </View>
      <View>
        <Text>{errors.email?.message}</Text>
      </View>
      <View>
        <Text> 비밀번호 : </Text>
        <Input name="password" control={control} secureTextEntry={true}></Input>
      </View>
      <View>
        <Text>{errors.password?.message}</Text>
      </View>
      <View>
        <Input
          name="passwordConfirm"
          control={control}
          secureTextEntry={true}
        ></Input>
      </View>
      <View>
        <Text>{errors.passwordConfirm?.message}</Text>
      </View>
      <Button title="회원가입하기" onPress={handleSubmit(onSubmit)} />
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;
