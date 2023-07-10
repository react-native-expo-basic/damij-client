import React, { useState, useRef, useEffect, useCallback } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { textCountListColor } from "../../style";
import useModal from "../../hooks/useModal";

interface FolderInfoProps {
  name: string;
  folderCount: number;
}

interface IconOffsetType {
  left: number;
  top: number;
}

export default function FolderInfo({
  productInfo,
}: {
  productInfo: FolderInfoProps;
}) {
  const [iconOffset, setIconOffset] = useState<IconOffsetType>({
    left: 0,
    top: 0,
  });
  const iconOffsetRef = useRef<View>(null);
  const { openModal } = useModal();
  const { name, folderCount } = productInfo;

  const handleIconOffset = async () => {
    if (iconOffsetRef.current) {
      const { current } = iconOffsetRef;
      current.measure((x, y, width, height, pageX, pageY) => {
        // 아이콘의 offsetX와 Y 값을 계산하여 ref에 할당합니다
        const offsetX = pageX + width / 2;
        const offsetY = pageY + height / 2;
        setIconOffset({ left: offsetX, top: offsetY });
      });
    }
  };

  useEffect(() => {
    if (iconOffset.left !== 0 || iconOffset.top !== 0) {
      console.log(iconOffset);
      openModal("FolderOption", {
        folderName: name,
        offsetX: iconOffset.left,
        offsetY: iconOffset.top,
      });
    }
  }, [iconOffset]);

  return (
    <FlexContainer>
      <View>
        <FolderTitle>{name}</FolderTitle>
        <CountList>{`${folderCount}개`}</CountList>
      </View>
      {/*  {name !== "기본폴더" && ( */}
      <TouchableWithoutFeedback onPress={handleIconOffset}>
        <View ref={iconOffsetRef}>
          <Feather name="more-vertical" size={22} color="grey" />
        </View>
      </TouchableWithoutFeedback>
      {/*   )} */}
    </FlexContainer>
  );
}

const FlexContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
`;
const FolderTitle = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;
const CountList = styled.Text`
  color: ${textCountListColor};
`;
