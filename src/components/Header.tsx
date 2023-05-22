import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export default function Header() {
  return (
    <Wrapper>
      <View>
        <LogoImage source={require("../../assets/image/logo.png")} />
      </View>
      <UtilContainer>
        <Ionicons
          name="ios-search-sharp"
          size={25}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Feather name="shopping-bag" size={22} color="black" />
      </UtilContainer>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-sizing: border-box;
  background: white;
`;

const LogoImage = styled(Image)`
  max-width: 90px;
  height: 40px;
  object-fit: contain;
`;

const UtilContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
