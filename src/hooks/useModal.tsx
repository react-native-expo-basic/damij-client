import { useDispatch } from "react-redux";
import { openModal, closeModal } from "../redux/modules/modal";

function useModal() {
  const dispatch = useDispatch();

  const handleOpenModal = (modalType: string, props: any) => {
    dispatch(openModal(modalType, props));
  };

  const handleCloseModal = (modalType: string) => {
    dispatch(closeModal(modalType));
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
}

export default useModal;
