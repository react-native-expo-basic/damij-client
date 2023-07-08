import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import useModal from "../hooks/useModal";
import { logout } from "../redux/modules/auth";
import { AuthStateType } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import TokenService from "../services/TokenSerivce";

interface authState {
  auth: AuthStateType;
}

export default function Mypage() {
  const { openModal } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useSelector((state: authState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = async () => {
      const isToken = await TokenService.get();

      if (isToken === null) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    getToken();
  }, [auth]);

  const handleLogout = async () => {
    dispatch(logout());
  };
  return (
    <View>
      {isLoggedIn ? (
        <View>
          <TouchableOpacity onPress={() => handleLogout()}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => openModal("signIn")}>
            <Text>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openModal("signUp")}>
            <Text>회원가입</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
