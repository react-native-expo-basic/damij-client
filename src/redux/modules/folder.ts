import { Action } from "redux-actions";
import { put, call, select, takeEvery } from "redux-saga/effects";
import { openModal, closeModal } from "./modal";
import { ProductItem } from "../../components/modal/LikeProductListModal";
import { AddFolder, handleDeleteFolder } from "../../api/folderApi";
import { LikesFolderType } from "../../screens/Likes";
import { handleDeleteProducts } from "../../api/folderApi";

interface ChangeFoldersType {
  productsId: number[];
  changeFolder: string;
}
interface DeleteProductType {
  choiceName: string;
  productId: number[];
}
interface DeleteFolderSaga {
  type: string;
  payload: DeleteProductType;
}
interface FolderSagaAction {
  type: string;
  payload: ChangeFoldersType;
}
interface ModalStateType extends ChangeFoldersType {
  originFolder: string;
  products: ProductItem[];
  productList: LikesFolderType[];
  filteredFolders: LikesFolderType[];
  inputValue: string;
}

interface FolderType {
  type: string;
  payload: { inputValue: string };
}
const prefix = "http://192.168.35.71:3000";

// 액션 타입 정의
const FOLDER = `${prefix}/FOLDER`;
const ADD_PRODUCT_LIST = `${prefix}/ADD_PRODUCT_LIST`;
const DELETE_FOLDER = `${prefix}/DELETE_FOLDER`;
const DELETE_PRODUCTS = `${prefix}/DELETE_PRODUCTS`;
const CHANGE_FOLDER = `${prefix}/CHANGE_FOLDER`;
const PENDING = `${prefix}/PENDING`;
const SUCCESS_ADD = `${prefix}/SUCCESS_ADD`;
const LIKES_PRODUCT_LIST = `${prefix}/LIKES_PROUCT_LIST`;
const SUCCESS_DELETE_FOLDER = `${prefix}/SUCCESS_DELETE_FOLDER`;
const SUCCESS_DELETE_PRODUCTS = `${prefix}/SUCCESS_DELETE_PRODUCTS`;
const FAIL = `${prefix}/FAIL`;
const ADD_FOLDER = `${prefix}/ADD_FOLDER`;
const ADD_FOLDER_LIST = `${prefix}/ADD_FOLDER_LIST`;

// 상태를 업데이트 할 액션 생성자 함수

export const addFolder = (inputValue: string) => ({
  type: ADD_FOLDER,
  payload: { inputValue },
});

export const addFolderList = (productList: LikesFolderType[]) => ({
  type: ADD_FOLDER_LIST,
  payload: productList,
});
export const deleteFolder = (inputValue: string) => ({
  type: DELETE_FOLDER,
  payload: { inputValue },
});
export const deleteProductList = (choiceName: string, productId: number[]) => ({
  type: DELETE_PRODUCTS,
  payload: { choiceName, productId },
});
export const openFolder = (products: ProductItem[]) => ({
  type: ADD_PRODUCT_LIST,
  payload: { products },
});
export const changeFolder = (info: ChangeFoldersType) => ({
  type: CHANGE_FOLDER,
  payload: info,
});

// 업데이트 한 상태를 활용할 액션 생성자 함수
const pending = () => ({ type: PENDING });
const filterdLikes = (likesList: number[]) => ({
  type: LIKES_PRODUCT_LIST,
  payload: likesList,
});
const success_deleteProducts = (productsId: number[]) => ({
  type: SUCCESS_DELETE_PRODUCTS,
  payload: productsId,
});
const success_addFolder = (inputValue: string) => ({
  type: SUCCESS_ADD,
  payload: inputValue,
});
const success_deleteFolder = (inputValue: string) => ({
  type: SUCCESS_DELETE_FOLDER,
  payload: inputValue,
});
const fail = (error: Error | null) => ({ type: FAIL, payload: error });

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

/* function* filterProductSaga(action: FolderSagaAction) {
  try {
    yield put(pending());
    const { products } = yield select((state) => state.folder);

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
    const { originFolder } = yield select((state) => state.folder);

    const filterItems = products.filter(
      (product: ProductItem) => !action.payload.productsId.includes(product.id)
    );
    yield put(success_deleteProducts(filterItems));
  } catch (error: any) {
    yield put(fail(error));
  }
}
 */
function* addFolderSaga(action: FolderType) {
  try {
    yield put(pending());
    yield call(AddFolder, action.payload.inputValue);
    yield put(success_addFolder(action.payload.inputValue));
    yield put(closeModal("editFolder"));
  } catch (error: any) {
    yield put(fail(error));
  }
}
function* deleteFolderSaga(action: FolderType) {
  try {
    yield put(pending());
    const { originFolder } = yield select((state) => state.folder);

    // 입력받은 폴더를 filteredFolders에서 삭제
    const updatedFolders = originFolder.filter(
      (folder: LikesFolderType) => folder.name !== action.payload.inputValue
    );
    // 필터링한 폴더 리스트를 리듀서에 저장
    yield put(success_deleteFolder(updatedFolders));
    // 서버에 삭제할 폴더 전송
    yield call(handleDeleteFolder, action.payload.inputValue);
    yield put(closeModal("FolderOption"));
  } catch (error: any) {
    yield put(fail(error));
  }
}
function* deleteProductSaga(action: DeleteFolderSaga) {
  try {
    yield put(pending());
    const { products } = yield select((state) => state.folder);

    const filteredProducts = products.filter((product: ProductItem) => {
      return !action.payload.productId.includes(product.id); // 필터링된 상품들을 반환
    });
    yield call(
      handleDeleteProducts,
      action.payload.choiceName,
      action.payload.productId
    );
    yield put(success_deleteProducts(filteredProducts));
    console.log("ㅇㅇㅇ", action.payload.productId);
    yield put(filterdLikes(action.payload.productId));
  } catch (error: any) {
    yield put(fail(error));
  }
}
export function* watchFolderSaga() {
  yield takeEvery(DELETE_PRODUCTS, deleteProductSaga);
  /*   yield takeEvery(CHANGE_FOLDER, filterProductSaga); */
  yield takeEvery(DELETE_FOLDER, deleteFolderSaga);
  yield takeEvery(ADD_FOLDER, addFolderSaga);
}
export default folderState;
