import React, { useEffect, useState } from "react";
import { Image, View, Text, ActivityIndicator } from "react-native";
import ImageContainer from "./ImageContainer";
import styled from "styled-components/native";
import FolderInfo from "./FolderInfo";
import { LikesFolderType } from "../../screens/Likes";

interface LikeFolderProps {
  cartItem: LikesFolderType[];
}
export default function Index({ cartItem }: LikeFolderProps) {
  return (
    <>
      {cartItem.map((item, idx) => (
        <Wrapper
          key={item.productInfo.folderName}
          style={idx % 2 == 0 ? { marginRight: 7 } : { marginLeft: 7 }}
        >
          <ImageContainer images={item.image} />
          <FolderInfo productInfo={item.productInfo} />
        </Wrapper>
      ))}
    </>
  );
}

const Wrapper = styled.View`
  width: 50%;
  position: relative;
  padding: 5px;
`;
