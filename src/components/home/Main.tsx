import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ProductType } from "../../types/types";
import ProductList from "../ProductList";
import { filterdIsBest, filterdIsNew } from "../../utils/fetchProductData";

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

  const popularProducts = filterdIsBest(productInfo);
  const NewProducts = filterdIsNew(productInfo);
  return (
    <ScrollView style={{ flex: 5 }}>
      <View style={{ flex: 0.1 }}>
        <Swiper
          showsButtons={false}
          loop={true}
          renderPagination={renderPagination}
          style={{ height: 250 }}
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
        <ProductContainer>
          <TitleContainer>
            <TitleText>당신을 위한 최고의 아이템</TitleText>
          </TitleContainer>
          <ProductList props={popularProducts} />
        </ProductContainer>
        <ProductContainer>
          <TitleContainer>
            <TitleText>오늘의 아이템</TitleText>
          </TitleContainer>
          <ProductList props={NewProducts}></ProductList>
        </ProductContainer>
      </Section>
    </ScrollView>
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
  padding: 20px 15px;
  box-sizing: border-box;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-family: "Noto-Sans-Medium";
`;

const ProductContainer = styled.View`
  padding-top: 20px;
`;
