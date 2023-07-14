import AsyncStorage from "@react-native-async-storage/async-storage";

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
      await AsyncStorage.setItem(
        tokenType === "user" ? "userToken" : "guestToken",
        token
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
}
