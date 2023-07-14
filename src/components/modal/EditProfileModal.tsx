import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  textProductColor,
  textHeaderTitleSize,
  textCountListColor,
} from "../../style";
import useModal from "../../hooks/useModal";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/modules/auth";

interface EditProfileModalProps {
  folderName: string;
}

export default function EditProfileModal({
  folderName,
}: EditProfileModalProps) {
  const { closeModal } = useModal();
  const handleCloseEvent = () => {
    closeModal("editProfile");
  };
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    closeModal("editProfile");
  };
  return (
    <Modal animationType="slide" onRequestClose={handleCloseEvent}>
      <Header>
        <FlexContainer>
          <SimpleLineIcons
            name="arrow-left"
            size={19}
            color={textProductColor}
            onPress={handleCloseEvent}
          />
          <HeaderTitle>{folderName}</HeaderTitle>
        </FlexContainer>
      </Header>
      <Section>
        <TitleSection>
          <CategoryTitle>내 정보</CategoryTitle>
          <TitleContainer>
            <Subtitle>유저 정보 수정</Subtitle>
          </TitleContainer>
        </TitleSection>
        <TitleSection>
          <CategoryTitle>설정</CategoryTitle>
          <TitleContainer onPress={handleLogout}>
            <Subtitle>로그아웃</Subtitle>
          </TitleContainer>
        </TitleSection>
      </Section>
    </Modal>
  );
}
const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px 15px;
  height: 50px;
  align-items: center;
`;
const HeaderTitle = styled.Text`
  font-size: ${textHeaderTitleSize};
  font-weight: 600;
  margin-left: 20px;
`;
const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Section = styled.View`
  background: white;
  padding: 20px 20px;
  margin-bottom: 10px;
`;
const CategoryTitle = styled.Text`
  font-size: 14px;
  color: ${textCountListColor};
  margin-bottom: 10px;
`;
const TitleSection = styled.View`
  padding: 15px 0;
`;
const TitleContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Subtitle = styled.Text`
  font-size: 17px;
  margin: 5px 0;
`;
