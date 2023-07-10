import { Action } from "redux-actions";
import { put, call, select, takeEvery } from "redux-saga/effects";
import { openModal, closeModal } from "./modal";
import { ProductItem } from "../../components/modal/LikeProductListModal";
import { AddFolder } from "../../api/folderApi";
import { LikesFolderType } from "../../screens/Likes";

interface FoldersType {
  productsId: number[];
  changeFolder: string;
}

interface FolderSagaAction {
  type: string;
  payload: FoldersType;
}
interface ModalStateType extends FoldersType {
  originFolder: string;
  products: ProductItem[];
  productList: LikesFolderType[];
}

interface AddFolderType {
  type: string;
  payload: { inputValue: string };
}
const prefix = "http://192.168.35.71:3000";

// 액션 타입 정의
const FOLDER = `${prefix}/FOLDER`;
const FOLDER_NAME = `${prefix}/FOLDER_NAME`;
const DELETE_FOLDER = `${prefix}/DELETE_FOLDER`;
const PENDING = `${prefix}/PENDING`;
const SUCCESS_ADD = `${prefix}/SUCCESS_ADD`;
const FAIL = `${prefix}/FAIL`;
const ADD_FOLDER = `${prefix}/ADD_FOLDER`;
const ADD_FOLDER_LIST = `${prefix}/ADD_FOLDER_LIST`;

// 액션 생성자 함수 정의

export const addFolder = (inputValue: string) => ({
  type: ADD_FOLDER,
  payload: { inputValue },
});

export const addFolderList = (productList: LikesFolderType[]) => ({
  type: ADD_FOLDER_LIST,
  payload: productList,
});
export const openFolder = (originFolder: string, products: ProductItem[]) => ({
  type: DELETE_FOLDER,
  payload: { originFolder, products },
});
export const changeFolder = (info: FoldersType) => ({
  type: FOLDER,
  payload: info,
});
const pending = () => ({ type: PENDING });
const success_deleteProducts = (productsId: number[]) => ({
  type: DELETE_FOLDER,
  payload: productsId,
});
const success_addFolder = (inputValue: string) => ({
  type: SUCCESS_ADD,
  payload: inputValue,
});
const fail = (error: Error | null) => ({ type: FAIL, payload: error });
const initialState = {
  changeFolder: "",
  originFolder: [],
  products: [],
  productsId: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

// 리듀서 함수 정의
const folderState = (state = initialState, action: Action<ModalStateType>) => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case ADD_FOLDER:
      return {
        ...state,
        originFolder: [
          ...state.originFolder,
          { name: action.payload, folderCount: 0, imgList: [] },
        ],
      };
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
    case FOLDER_NAME:
      return {
        ...state,
        originFolder: action.payload.originFolder,
        products: action.payload.products,
      };
    case DELETE_FOLDER:
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function* filterProductSaga(action: FolderSagaAction) {
  try {
    yield put(pending());
    const { originFolder } = yield select((state) => state.folder);

    if (action.payload.changeFolder === originFolder) {
      // alert 모달 추가 후 수정 예정
      yield put(closeModal("likeDetail"));
      yield put(
        openModal("alert", {
          message: "같은 폴더로는 상품을 옮길 수 없습니다.",
        })
      );
      return;
    }
    // 서버 연동 할 함수 추가 예정
    const { products } = yield select((state) => state.folder);

    const filterItems = products.filter(
      (product: ProductItem) => !action.payload.productsId.includes(product.id)
    );
    yield put(success_deleteProducts(filterItems));
  } catch (error: any) {
    yield put(fail(error));
  }
}
function* addFolderSaga(action: AddFolderType) {
  try {
    yield put(pending());
    yield call(AddFolder, action.payload.inputValue);
    yield put(success_addFolder(action.payload.inputValue));
    yield put(closeModal("editFolder"));
  } catch (error: any) {
    yield put(fail(error));
  }
}
export function* watchFolderSaga() {
  yield takeEvery(DELETE_FOLDER, filterProductSaga);
  yield takeEvery(ADD_FOLDER, addFolderSaga);
}
export default folderState;
