import React, { useCallback } from "react";
import { Alert } from "react-native";
import Signup from "../screens/Signup";
import { SignupReqType } from "../types/types";
import axios from "axios";
import { saveUserToStorage } from "../services/UserService";

export default function SignupContainer() {
  const signup = useCallback(async ({ email, password }: SignupReqType) => {
    try {
      const response = await axios.post("http://192.168.35.221:3000/posts", {
        email,
        password,
      });

      saveUserToStorage(true);
      Alert.alert("회원가입이 완료되었습니다.");
    } catch (error: any) {
      Alert.alert(JSON.stringify(error.message));
    }
  }, []);
  return <Signup signup={signup} />;
}
