import React, { useCallback } from "react";
import { Alert } from "react-native";
import Signup from "../screens/Signup";
import { SignupReqType } from "../types/types";
import axios from "axios";

export default function SignupContainer() {
  const signup = useCallback(async ({ email, password }: SignupReqType) => {
    try {
      /*    Alert.alert(JSON.stringify({ email, password })); */
      const response = await axios.get("http://192.168.35.221:3000/posts");
      const data = response.data; // 응답 데이터
      Alert.alert(JSON.stringify(response));
    } catch (error: any) {
      Alert.alert(JSON.stringify(error.message));
    }
  }, []);
  return <Signup signup={signup} />;
}
