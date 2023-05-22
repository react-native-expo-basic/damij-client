import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styled from "styled-components/native";
import { AntDesign, Fontisto } from "@expo/vector-icons";

import { LoginReqType } from "../types/types";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

const LOGIN_STORAGE_KEY = "@Login";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handleSignup = () => {
    navigation.navigate("SignupContainer");
  };
  const handleLogin = async () => {
    const confirmLogin: LoginReqType = {
      email: email,
      password: password,
    };
    try {
      await axios
        .get(`http://192.168.35.187:3000/user?email=${email}`)
        .then(async (res) => {
          if (res.data.email === email) {
            if (password === res.data.password) {
              Alert.alert("알림", "로그인 되었습니다");
              await AsyncStorage.setItem(LOGIN_STORAGE_KEY, "true");
            } else {
              Alert.alert("알림", "PASSWORD가 일치하지 않습니다");
              setPassword("");
            }
          } else {
            Alert.alert("알림", "EMAIL을 찾을 수 없습니다.");
            setEmail("");
            setPassword("");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <CloseIconContainer>
        <CloseIcon name="close" size={24} color="black" />
      </CloseIconContainer>
      <View>
        <Title>로그인</Title>
      </View>
      <InputOuter>
        <Fontisto name="email" size={18} color="grey" />
        <Input
          placeholder="Email(필수)"
          value={email}
          onChangeText={setEmail}
        />
      </InputOuter>
      <InputOuter>
        <Fontisto name="locked" size={18} color="grey" />
        <Input
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </InputOuter>
      <ButtonContainer>
        <LoginBtn>로그인</LoginBtn>
      </ButtonContainer>
      <BtnTextOuter>
        <Text>아이디/비밀번호 찾기</Text>
      </BtnTextOuter>
      <BtnTextOuter onPress={handleSignup}>
        <Text>회원가입</Text>
      </BtnTextOuter>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 30px;
`;

const Input = styled.TextInput`
  margin-left: 10px;
`;

const BtnTextOuter = styled(TouchableOpacity)`
  margin-top: 10px;
  font-weight: 500;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #2c2b2b;
  padding: 15px 20px;
  width: 100%;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const LoginBtn = styled.Text`
  color: white;
  font-weight: 400;
  font-size: 15px;
`;

const CloseIcon = styled(AntDesign)`
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const CloseIconContainer = styled.View`
  width: 100%;
  padding-top: 20px;
  display: flex;
  align-items: flex-end;
`;

const InputOuter = styled.View`
  width: 100%;
  height: 40px;
  border-color: "gray";
  border-width: 1px;
  margin-bottom: 12px;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export default Login;
