import React, { useState, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { SignupReqType } from "../types/types";
import { UseFormReturn, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface SignupProps {
  signup: (reqType: SignupReqType) => void;
}
interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
}
export function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  }: UseFormReturn<SignupFormValues> = useForm<SignupFormValues>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
        password: yup
          .string()
          .min(8, "최소 8자리 이상 가능합니다")
          .max(15, "최대 15자리 까지 가능합니다")
          .matches(
            /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/g,
            "영문, 숫자, 특수문자를 포함해주세요"
          )
          .required(),
        passwordConfirm: yup
          .string()
          .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
      })
    ),
  });

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text>회원가입</Text>
      </View>
      <View>
        <Text>이메일 : </Text>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          /*  style={}
          onChangeText={(text) => } */
          {...register("email")}
        />
      </View>
      <View>
        <Text> 비밀번호 : </Text>
        <TextInput
          secureTextEntry={true}
          /*    onChangeText={(text) => }
          style={styles.input} */
          {...register("password")}
        />
      </View>
    </View>
  );
}
