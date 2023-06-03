import { Action } from "redux-actions";

export interface modalActionType {
  [x: string]: any;
  modalType: string;
  isOpen: boolean;
  props: {};
}

const prefix = "http://192.168.35.87:3000";

// 액션 타입 정의

const MODAL = `${prefix}/MODAL`;

// 액션 생성자 함수 정의
export const openModal = (modalType: string, props: {}) => ({
  type: MODAL,
  payload: { modalType, isOpen: true, props },
});
export const closeModal = () => ({
  type: MODAL,
  payload: { modalType: "", isOpen: false },
});
// 초기 상태 정의
const initialState: modalActionType = {
  modalType: "",
  isOpen: false,
  props: {},
};

// 리듀서 함수 정의
const modalState = (state = initialState, action: Action<modalActionType>) => {
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
