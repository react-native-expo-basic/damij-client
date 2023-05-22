import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";

export default function Main() {
  const renderPagination = (index: number, total: number) => {
    return (
      <PaginationContainer>
        <CurrentPaginationText>{`${index + 1}`}</CurrentPaginationText>
        <TotalPaginationText>{` / ${total}`}</TotalPaginationText>
      </PaginationContainer>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.4 }}>
        <Swiper
          showsButtons={false}
          loop={true}
          renderPagination={renderPagination}
        >
          <ImageContainer>
            <Img source={require("../../../assets/image/m_slide1.png")} />
          </ImageContainer>
          <ImageContainer>
            <Img source={require("../../../assets/image/m_slide2.png")} />
          </ImageContainer>
          <ImageContainer>
            <Img source={require("../../../assets/image/m_slide3.png")} />
          </ImageContainer>
        </Swiper>
      </View>
      <View>
        <Text>dd</Text>
      </View>
    </View>
  );
}

const ImageContainer = styled.View`
  border-top-width: 1px;
  border-top-color: #efefef;
`;
const Img = styled.Image`
  width: 100%;
  height: 100%;
`;
const PaginationContainer = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
`;
const CurrentPaginationText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const TotalPaginationText = styled.Text`
  color: #b7b7b7;
  font-size: 12px;
  font-weight: 600;
`;
