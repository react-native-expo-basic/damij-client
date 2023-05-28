import { createActions, handleActions, Action } from "redux-actions";
import { takeEvery, put, call, select } from "redux-saga/effects";
import { updateProductLikedStatus } from "utils/productUtils";

export interface AuthState {
  token: boolean;
  likes: string[] | null;
  loading: boolean;
  error: any;
}

interface SuccessPayload {
  token: string;
  likes: string[];
  error: Error | null;
}

interface LikesSagaAction {
  type: string;
  payload: {
    productName: string;
    isLiked: boolean;
  };
}

const prefix = "my-books/auth";

// 액션 타입 정의
const PENDING = `${prefix}/PENDING`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;
const LIKES = `${prefix}/LIKES`;

// 액션 생성자 함수 정의
const pending = () => ({ type: PENDING });
const success = (likes: string[]) => ({
  type: SUCCESS,
  payload: likes,
});
const fail = (error: Error | null) => ({ type: FAIL, payload: error });
export const likes = (productName: string, isLiked: boolean) => ({
  type: LIKES,
  payload: { productName, isLiked },
});

// 초기 상태 정의
const initialState: AuthState = {
  token: false,
  likes: null,
  loading: false,
  error: null,
};

// 리듀서 함수 정의
const reducer = (
  state: AuthState = initialState,
  action: Action<SuccessPayload>
): AuthState => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      return {
        ...state,
        likes: action.payload.likes,
        loading: false,
        error: null,
      };
    case FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// 사가 함수 정의
function* likesSaga(action: LikesSagaAction) {
  try {
    yield put(pending());
    const { productName, isLiked } = action.payload;

    yield call(updateProductLikedStatus, { productName, isLiked });

    const currentLikes: string[] | null = yield select(
      (state: AuthState) => state.likes
    );
    const newLikes: string[] = currentLikes
      ? [...currentLikes, productName]
      : [productName];
    yield put(success(newLikes));
  } catch (error: any) {
    yield put(fail(error.response?.data?.error || new Error("UNKNOWN")));
  }
}

// 루트 사가 함수 정의
export function* callSaga() {
  yield takeEvery(LIKES, likesSaga);
}

export default reducer;
