import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
export default function SwiperComponent() {
  const renderPagination = (index: number, total: number) => {
    return (
      <PaginationContainer>
        <CurrentPaginationText>{`${index + 1}`}</CurrentPaginationText>
        <TotalPaginationText>{` / ${total}`}</TotalPaginationText>
      </PaginationContainer>
    );
  };
  return (
    <Swiper
      showsButtons={false}
      loop={true}
      renderPagination={renderPagination}
      style={{ height: 300 }}
    >
      <ImageContainer>
        <Img source={require("../../../../assets/image/m_slide1.png")} />
      </ImageContainer>
      <ImageContainer>
        <Img source={require("../../../../assets/image/m_slide2.png")} />
      </ImageContainer>
      <ImageContainer>
        <Img source={require("../../../../assets/image/m_slide3.png")} />
      </ImageContainer>
    </Swiper>
  );
}

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

const ImageContainer = styled.View`
  border-top-width: 1px;
  border-top-color: #efefef;
`;
const Img = styled.Image`
  width: 100%;
  height: 100%;
`;
