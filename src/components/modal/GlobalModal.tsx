import React from "react";
import { useSelector } from "react-redux";
import { Modal, View } from "react-native";
import { ModalActionType } from "redux/modules/modal";
import LikeNotification from "./LikeNotification";
import EditFolderModal from "./EditFolderModal";
import LikeProductListModal from "./LikeProductListModal";

interface ModalState {
  modal: ModalActionType;
}

export default function GlobalModal(): JSX.Element {
  const { modalType, isOpen, props } = useSelector(
    (state: ModalState) => state.modal
  );

  if (!isOpen) {
    return <></>;
  }

  const MODAL_COMPONENTS: { [key: string]: JSX.Element } = {
    alarm: <LikeNotification {...props} />,
    editFolder: <EditFolderModal {...props} />,
    LikeDetail: <LikeProductListModal {...props} />,
  };
  return <View>{MODAL_COMPONENTS[modalType]}</View>;
}
