import { Action } from "redux-actions";

export interface ModalActionType<P = any> {
  modalType: string;
  isOpen: boolean;
  props: P;
}
export interface ModalState {
  modals: ModalActionType[];
}
const prefix = "http://192.168.35.71:3000";

// 액션 타입 정의

const MODAL = `${prefix}/MODAL`;

// 액션 생성자 함수 정의
export const openModal = (modalType: string, props: {}) => ({
  type: MODAL,
  payload: { modalType, isOpen: true, props },
});
export const closeModal = (modalType: string) => ({
  type: MODAL,
  payload: { modalType, isOpen: false },
});
// 초기 상태 정의

const initialState: ModalState = {
  modals: [],
};

// 리듀서 함수 정의
const modalState = (state = initialState, action: Action<ModalActionType>) => {
  switch (action.type) {
    case MODAL: {
      const { modalType, isOpen, props } = action.payload;
      if (isOpen) {
        // 모달 열기
        return {
          modals: [
            ...state.modals,
            {
              modalType,
              isOpen,
              props,
            },
          ],
        };
      } else {
        // 모달 닫기
        const updatedModals = state.modals.filter(
          (modal) => modal.modalType !== modalType
        );
        return {
          modals: updatedModals,
        };
      }
    }

    default:
      return state;
  }
};

export default modalState;
