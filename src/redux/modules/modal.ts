import { Action } from "redux-actions";

export interface ModalActionType<P = any> {
  modalType: string;
  isOpen: boolean;
  props: P;
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
  payload: { isOpen: false },
});
// 초기 상태 정의
const initialState: ModalActionType<{}> = {
  modalType: "",
  isOpen: false,
  props: {},
};

// 리듀서 함수 정의
const modalState = (state = initialState, action: Action<ModalActionType>) => {
  switch (action.type) {
    case MODAL:
      return {
        ...state,
        modalType: action.payload.modalType,
        isOpen: action.payload.isOpen,
        props: action.payload.props,
      };
    default:
      return state;
  }
};

export default modalState;
