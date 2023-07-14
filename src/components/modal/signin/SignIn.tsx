import React, { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signin } from "../../../redux/modules/auth";
import { useDispatch } from "react-redux";
import SignInForm from "./SignInForm";
import { SigninReqType } from "../../../types/types";
import { authInstance } from "../../../api/api";
import useModal from "../../../hooks/useModal";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmitSignin = async (data: SigninReqType) => {
    try {
      await handleSignin(data);
    } catch (error) {
      console.log("로그인 도중에 오류가 발생했습니다.", error);
    }
  };

  const handleSignin = async (data: SigninReqType) => {
    try {
      const response = await authInstance.post("api/users/login", {
        email: data.email,
        password: data.password,
      });
      const token = response.headers.authorization;

      dispatch(signin(token));
      closeModal("signIn");
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <SignInForm handleSignin={handleSubmitSignin} errorMessage={errorMessage} />
  );
}
