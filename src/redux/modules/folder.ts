import { Action } from "redux-actions";
import { put, call, select, takeEvery } from "redux-saga/effects";
import { openModal, closeModal } from "./modal";
import { ProductItem } from "../../components/modal/LikeProductListModal";
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
}
const prefix = "http://192.168.35.71:3000";

// 액션 타입 정의
const FOLDER = `${prefix}/FOLDER`;
const FOLDER_NAME = `${prefix}/FOLDER_NAME`;
const PENDING = `${prefix}/PENDING`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

// 액션 생성자 함수 정의
export const openFolder = (originFolder: string, products: ProductItem[]) => ({
  type: FOLDER_NAME,
  payload: { originFolder, products },
});
export const changeFolder = (info: FoldersType) => ({
  type: FOLDER,
  payload: info,
});
const pending = () => ({ type: PENDING });
const success = (productsId: number[]) => ({
  type: SUCCESS,
  payload: productsId,
});

const fail = (error: Error | null) => ({ type: FAIL, payload: error });
const initialState = {
  changeFolder: "",
  originFolder: "",
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

    case FOLDER_NAME:
      return {
        ...state,
        originFolder: action.payload.originFolder,
        products: action.payload.products,
      };
    // success > 모달 내부의 상품리스트들로 수정 예정
    case SUCCESS:
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

function* folderSaga(action: FolderSagaAction) {
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
    console.log("필터링된 아이템", filterItems);
    yield put(success(filterItems));
  } catch (error: any) {
    yield put(fail(error));
  }
}

export function* watchFolderSaga() {
  yield takeEvery(FOLDER, folderSaga);
}
export default folderState;
