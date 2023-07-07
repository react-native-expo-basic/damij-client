import AsyncStorage from "@react-native-async-storage/async-storage";

export default class TokenService {
  static token: string | null = null;

  static async get(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("토큰을 가져오는 도중에 오류가 발생했습니다.", error);
      return null;
    }
  }

  static async set(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("토큰을 저장하는 도중에 오류가 발생했습니다.", error);
    }
  }

  static async remove(): Promise<void> {
    try {
      await AsyncStorage.removeItem("token");
      console.log("토큰 삭제");
    } catch (error) {
      console.error("토큰을 삭제하는 도중에 오류가 발생했습니다.", error);
    }
  }
}
