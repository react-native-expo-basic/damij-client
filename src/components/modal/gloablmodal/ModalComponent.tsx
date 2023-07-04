import React from "react";
import { Modal, View } from "react-native";
import LikeNotification from "../LikeNotification";
import EditFolderModal from "../EditFolderModal";
import LikeProductListModal from "../LikeProductListModal";
import ConfirmModal from "../ConfirmModal";
import FolderSelectionModal from "../selectionModal/FolderSelectionModal";
import AlertModal from "../AlertModal";

interface ModalComponentProps {
  modalType: string;
  props: any;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  modalType,
  props,
}) => {
  const MODAL_COMPONENTS: { [key: string]: JSX.Element } = {
    alarm: <LikeNotification {...props} />,
    editFolder: <EditFolderModal {...props} />,
    likeDetail: <LikeProductListModal {...props} />,
    confirm: <ConfirmModal {...props} />,
    handleFolder: <FolderSelectionModal {...props} />,
    alert: <AlertModal {...props} />,
  };

  return <View>{MODAL_COMPONENTS[modalType]}</View>;
};
export default ModalComponent;
