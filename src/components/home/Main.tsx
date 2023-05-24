import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ProductType } from "../../types/types";

interface MainProps {
  productInfo: ProductType[];
}

export default function Main({ productInfo }: MainProps) {
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
      <Section>
        <TitleContainer>
          <Text>당신에게 추천하는 </Text>
          <Text>BEST ITEM</Text>
        </TitleContainer>
      </Section>
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

const Section = styled.View`
  flex: 1;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
