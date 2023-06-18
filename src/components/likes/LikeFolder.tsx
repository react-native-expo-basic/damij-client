import React, { useEffect, useState } from "react";
import { Image, View, Text, ActivityIndicator } from "react-native";
import ImageContainer from "./ImageContainer";
import styled from "styled-components/native";
import FolderInfo from "./FolderInfo";
import { ProductType } from "types/types";
import { fetchProductLikeData } from "../../utils/productUtils";

interface Props {
  productInfo: ProductType[];
}

export default function LikeFolder({ productInfo }: Props) {
  return (
    <Wrapper>
      <ImageContainer products={productInfo} />
      <FolderInfo productCount={productInfo.length} />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 49%;
  position: relative;
`;
