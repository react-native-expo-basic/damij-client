import React, { useCallback } from "react";
import { Alert } from "react-native";
import SignupForm from "./SignupForm";
import { SignupReqType } from "../../../types/types";
import instance from "../../../api/api";

export default function Signup() {
  const handleSignup = async (data: SignupReqType) => {
    try {
      console.log({
        email: data.email,
        nickname: "dddd",
        password: data.password,
      });
      const response = await instance.post("api/users/signUp", {
        email: data.email,
        nickname: "dddd",
        password: data.password,
      });
      console.log(response);
    } catch (error) {
      console.log("회원가입 도중에 오류가 발생했습니다.", error);
    }
  };

  return <SignupForm handleSignup={handleSignup} />;
}
