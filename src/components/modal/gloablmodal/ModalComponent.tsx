import React from "react";
import { Modal, View } from "react-native";
import LikeNotification from "../LikeNotification";
import LikeProductListModal from "../LikeProductListModal";
import ConfirmModal from "../ConfirmModal";
import FolderSelectionModal from "../selectionModal/FolderSelectionModal";
import AlertModal from "../AlertModal";
import Signup from "../signup/Signup";
import SignIn from "../signin/SignIn";
import FolderOptionsModal from "../FolderOptionsModal";
import EditFolderNameModal from "../EditFolderNameModal";
import EditProfileModal from "../EditProfileModal";

interface ModalComponentProps {
  modalType: string;
  props: any;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  modalType,
  props,
}) => {
  const MODAL_COMPONENTS: { [key: string]: JSX.Element } = {
    alarm: <LikeNotification key={`${modalType}-${Date.now()}`} {...props} />,
    editFolder: <EditFolderNameModal {...props} />,
    editProfile: <EditProfileModal {...props} />,
    FolderOption: <FolderOptionsModal {...props} />,
    likeDetail: <LikeProductListModal {...props} />,
    confirm: <ConfirmModal {...props} />,
    handleFolder: <FolderSelectionModal {...props} />,
    alert: <AlertModal {...props} />,
    signUp: <Signup {...props} />,
    signIn: <SignIn {...props} />,
  };

  return <View>{MODAL_COMPONENTS[modalType]}</View>;
};
export default ModalComponent;
