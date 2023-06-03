import React from "react";
import { useSelector } from "react-redux";
import { Modal, View } from "react-native";
import modalState from "redux/modules/modal";
import useModal from "hooks/useModal";
import AlarmModal from "./AlarmModal";
import { modalActionType } from "redux/modules/modal";
export default function GlobalModal() {
  const { modalType, isOpen, props } = useSelector(
    (state: modalActionType) => state.modal
  );
  const { openModal, closeModal } = useModal();

  if (!isOpen) return;

  const MODAL_COMPONENTS = {
    alarm: <AlarmModal />,
  };
  return (
    <Modal>
      <View></View>
    </Modal>
  );
}
