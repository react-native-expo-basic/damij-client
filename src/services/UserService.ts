// 로그인 시 사용자 정보를 로컬 스토리지에 저장하는 함수
import { SigninReqType } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserToStorage = async (isLogin: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(isLogin));
    console.log("사용자 정보가 로컬 스토리지에 저장되었습니다.");
  } catch (error) {
    console.log("로컬 스토리지 저장 중 오류가 발생했습니다:", error);
  }
};

// 로그아웃 시 로컬 스토리지에서 사용자 정보를 제거하는 함수
export const removeUserFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("user");
    console.log("사용자 정보가 로컬 스토리지에서 제거되었습니다.");
  } catch (error) {
    console.log("로컬 스토리지 제거 중 오류가 발생했습니다:", error);
  }
};

// 현재 로그인한 사용자를 확인하는 함수
export const checkLoggedInUser = async (): Promise<void> => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user !== null) {
      // 사용자 정보가 존재하는 경우 로그인 상태로 간주
      console.log("사용자가 로그인되어 있습니다.");
      // user 변수를 원하는 곳에서 활용하면 됩니다.
    } else {
      console.log("사용자가 로그인되어 있지 않습니다.");
    }
  } catch (error) {
    console.log("로컬 스토리지 확인 중 오류가 발생했습니다:", error);
  }
};
