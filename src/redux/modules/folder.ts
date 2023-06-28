import { Action } from "redux-actions";
import { put, call, select, takeEvery } from "redux-saga/effects";
import { openModal } from "./modal";

interface FoldersType {
  products: number[];
  changeFolder: string;
}
interface FolderSagaAction {
  type: string;
  payload: FoldersType;
}
interface ModalStateType extends FoldersType {
  originFolder: string;
}
const prefix = "http://192.168.35.71:3000";

// 액션 타입 정의
const FOLDER = `${prefix}/FOLDER`;
const FOLDER_NAME = `${prefix}/FOLDER_NAME`;
const PENDING = `${prefix}/PENDING`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;

// 액션 생성자 함수 정의
export const openFolder = (originFolder: string) => ({
  type: FOLDER_NAME,
  payload: { originFolder },
});
export const changeFolder = (products: FoldersType) => ({
  type: FOLDER,
  payload: products,
});
const pending = () => ({ type: PENDING });
const success = (folders: FoldersType) => ({
  type: SUCCESS,
  payload: folders,
});

const fail = (error: Error | null) => ({ type: FAIL, payload: error });
const initialState = {
  changeFolder: "",
  originFolder: "",
  products: [],
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
      };

    case SUCCESS:
      return {
        ...state,
        changeFolder: action.payload.changeFolder,
        products: action.payload.products,
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
      console.log("같음");
      yield put(
        openModal("confirm", {
          message: "중복되는 애들이에요",
          handler: () => {
            console.log("ddd");
          },
        })
      );
      return;
    }
    yield put(
      success({
        changeFolder: action.payload.changeFolder,
        products: action.payload.products,
      })
    );
  } catch (error: any) {
    yield put(fail(error));
  }
}

export function* watchFolderSaga() {
  yield takeEvery(FOLDER, folderSaga);
}
export default folderState;
