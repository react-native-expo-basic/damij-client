import { useDispatch } from "react-redux";
import { openModal, closeModal, modalActionType } from "../redux/modules/modal";

function useModal() {
  const dispatch = useDispatch();

  const handleOpenModal = ({ modalType, props }: modalActionType) => {
    dispatch(openModal(modalType, props));
  };

  const handleCloseModal = (modalType: string) => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
}

export default useModal;
