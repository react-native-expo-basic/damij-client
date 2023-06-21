import React, { useEffect } from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";
import { ProductType } from "../../types/types";

interface ImageContainerProps {
  images: Array<string>;
}
interface ProductCountProps {
  count: number;
}
export default function ImageContainer({ images }: ImageContainerProps) {
  return (
    <Container>
      {images && images.length >= 1 ? (
        <GridContainer>
          {images.length >= 4 ? (
            images.slice(0, 4).map((item) => (
              <ImageWrapper count={images.length} key={item}>
                <ImgFile
                  source={{
                    uri: item,
                  }}
                  resizeMode="cover"
                />
              </ImageWrapper>
            ))
          ) : (
            <ImageWrapper count={images.length}>
              <ImgFile
                source={{
                  uri: images[0],
                }}
                resizeMode="cover"
              />
            </ImageWrapper>
          )}
        </GridContainer>
      ) : (
        <ImgFile
          source={{
            uri: "https://contents.lotteon.com/itemimage/_v180423/LO/15/98/39/13/69/_1/59/83/91/37/1/LO1598391369_1598391371_1.jpg/dims/optimize/dims/resizemc/400x400",
          }}
          resizeMode="cover"
        />
      )}
    </Container>
  );
}

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.View<ProductCountProps>`
  flex-basis: ${(props) => (props.count === 4 ? "50%" : "100%")};
  aspect-ratio: 1;
`;

const ImgFile = styled.Image`
  flex-basis: 100%;
  flex: 1;
  border-radius: 20px;
`;

const Container = styled.View`
  aspect-ratio: 1/1;
  border-radius: 8px;
  overflow: hidden;
`;
