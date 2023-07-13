import {
  PENDING,
  ADD_FOLDER_LIST,
  SUCCESS_ADD,
  ADD_PRODUCT_LIST,
  SUCCESS_DELETE_FOLDER,
  SUCCESS_DELETE_PRODUCTS,
  LIKES_PRODUCT_LIST,
  FAIL,
} from "./folderActions";
import { ModalStateType } from "./folderTypes";
import { Action } from "redux-actions";

const initialState = {
  changeFolder: "",
  originFolder: [],
  products: [],
  productsId: [],
  filteredProducts: [],
  filteredFolders: [],
  likesProducts: [],
  loading: false,
  error: null,
};

// 리듀서 함수 정의
const folderState = (state = initialState, action: Action<ModalStateType>) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };

    case ADD_FOLDER_LIST:
      return { ...state, originFolder: action.payload };
    case SUCCESS_ADD:
      return {
        ...state,
        originFolder: [
          ...state.originFolder,
          { name: action.payload, folderCount: 0, imgList: [] },
        ],
      };
    case ADD_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload.products,
      };
    case SUCCESS_DELETE_FOLDER:
      return {
        ...state,
        originFolder: action.payload,
      };
    case SUCCESS_DELETE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case LIKES_PRODUCT_LIST:
      return {
        ...state,
        likesProducts: action.payload,
      };
    case FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default folderState;
