import React, { useEffect, useState } from "react";
import { Image, View, Text, ActivityIndicator } from "react-native";
import ImageContainer from "./ImageContainer";
import styled from "styled-components/native";
import FolderInfo from "./FolderInfo";
import { ProductType } from "types/types";
import { fetchProductLikeData } from "../../utils/productUtils";

interface Props {
  cartItem: ProductType[];
}

export default function Index({ cartItem }: Props) {
  return (
    <Wrapper>
      <ImageContainer products={cartItem} />
      <FolderInfo product={cartItem} />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 49%;
  position: relative;
`;
