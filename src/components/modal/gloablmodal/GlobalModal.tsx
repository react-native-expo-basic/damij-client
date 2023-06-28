import React from "react";
import { useSelector } from "react-redux";
import ModalComponent from "./ModalComponent";
import { ModalState } from "redux/modules/modal";

interface GlobalModalProps {
  modal: ModalState;
}

export default function GlobalModal(): JSX.Element {
  const modals = useSelector((state: GlobalModalProps) => state.modal.modals);

  if (modals === undefined) {
    return <></>;
  }

  return (
    <>
      {modals.length > 0
        ? modals.map((modal: any) => (
            <ModalComponent
              key={modal.modalType}
              modalType={modal.modalType}
              props={modal.props}
            />
          ))
        : ""}
    </>
  );
}
