import React, { useState } from "react";
import { Alert } from "react-native";
import SignupForm from "./SignupForm";
import { SignupReqType } from "../../../types/types";
import { authInstance } from "../../../api/api";
import useModal from "../../../hooks/useModal";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { closeModal } = useModal();
  const handleSubmitSignup = async (data: SignupReqType) => {
    try {
      await handleSignup(data);
      Alert.alert("회원가입이 완료 되었습니다.");
      closeModal("signUp");
    } catch (error) {
      console.log("회원가입 도중에 오류가 발생했습니다.", error);
      // 오류 처리 로직 추가
    }
  };

  const handleSignup = async (data: SignupReqType) => {
    try {
      const response = await authInstance.post("api/users/signUp", {
        email: data.email,
        password: data.password,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <SignupForm handleSignup={handleSubmitSignup} errorMessage={errorMessage} />
  );
}
