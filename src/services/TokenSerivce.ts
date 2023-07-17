import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Alert } from "react-native";
import { authType } from "types/types";

interface decodeTokenType extends authType {
  exp: number;
}

export default class TokenService {
  static async getToken(tokenType: "user" | "guest"): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(
        tokenType === "user" ? "userToken" : "guestToken"
      );
      return token;
    } catch (error) {
      console.error("토큰을 가져오는 도중에 오류가 발생했습니다.", error);
      return null;
    }
  }

  static async setToken(
    tokenType: "user" | "guest",
    token: string
  ): Promise<void> {
    try {
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 1일(24시간)을 밀리초로 계산
      // 토큰과 만료 시간 정보를 객체로 저장
      const tokenData = { token, expirationTime };
      await AsyncStorage.setItem(
        tokenType === "user" ? "userToken" : "guestToken",
        JSON.stringify(tokenData) // 토큰 데이터를 문자열로 변환하여 저장
      );
    } catch (error) {
      console.error("토큰을 저장하는 도중에 오류가 발생했습니다.", error);
    }
  }

  static async removeToken(tokenType: "user" | "guest"): Promise<void> {
    try {
      await AsyncStorage.removeItem(
        tokenType === "user" ? "userToken" : "guestToken"
      );
    } catch (error) {
      console.error("토큰을 삭제하는 도중에 오류가 발생했습니다.", error);
    }
  }
  static async checkTokenExpiration(token: string): Promise<boolean> {
    // 토큰의 만료 시간을 확인하는 로직 추가
    const decodedToken = await jwtDecode<decodeTokenType>(token);

    if (!decodedToken) {
      // 토큰이 유효하지 않은 경우
      AsyncStorage.removeItem("user");
      return false;
    }

    const expirationTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;

    if (expirationTime && expirationTime < currentTime) {
      // 토큰이 만료된 경우
      Alert.alert("토큰이 만료되었습니다.");
      AsyncStorage.removeItem("user");
      return false;
    }

    return true;
  }
}
