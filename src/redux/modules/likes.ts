import { Action } from "redux-actions";
import { takeEvery, put, call, select } from "redux-saga/effects";
import { updateProductLikedStatus } from "../../utils/productUtils";
import { ProductType } from "types/types";
import { fetchProductData } from "../../utils/productUtils";

export interface AuthState {
  token: boolean;
  likes: number[] | null;
  loading: boolean;
  error: any;
}

interface SuccessPayload {
  token: string;
  likes: number[];
  error: Error | null;
}

interface LikesSagaAction {
  type: string;
  payload: {
    productId: number;
    isLiked: boolean;
  };
}

const prefix = "http://192.168.35.87:3000";

// 액션 타입 정의
const PENDING = `${prefix}/PENDING`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;
const LIKES = `${prefix}/LIKES`;

// 액션 생성자 함수 정의
const pending = () => ({ type: PENDING });
const success = (likes: number[]) => ({
  type: SUCCESS,
  payload: likes,
});
const fail = (error: Error | null) => ({ type: FAIL, payload: error });
/* export const likes = (productId: number) => ({
  type: LIKES,
  payload: productId,
}); */

// 초기 상태 정의
const initialState: AuthState = {
  token: false,
  likes: [],
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
/* function* likesSaga(action: LikesSagaAction) {
  try {
    yield put(pending());
    const { productId, isLiked } = action.payload;

    yield call(updateProductLikedStatus, { productId, isLiked });
    const updatedLikes: ProductType[] = yield call(fetchProductData);

    const currentLikes: number[] = updatedLikes
      .filter((product) => product.isLiked)
      .map((product) => product.id);

    const newLikes: number[] = currentLikes
      ? [...currentLikes, productId]
      : [productId];
    const uniqueLikes: number[] = Array.from(new Set(newLikes));
    yield put(success(uniqueLikes));
  } catch (error: any) {
    yield put(fail(error.response?.data?.error || new Error("UNKNOWN")));
  }
} */

function* likesSaga(action: LikesSagaAction) {
  try {
    const { productId, isLiked } = action.payload;

    yield call(updateProductLikedStatus, { productId, isLiked });

    const currentLikes: number[] | null = yield select((state) => state.likes);
    const updatedLikes = currentLikes ? [...currentLikes] : [];
    if (isLiked) {
      updatedLikes.push(productId);
    } else {
      const index = updatedLikes.indexOf(productId);
      if (index !== -1) {
        updatedLikes.splice(index, 1);
      }
    }

    // 성공 액션 디스패치
    yield put(success(updatedLikes));
  } catch (error: any) {
    yield put(fail(error));
  }
}

// 루트 사가 함수 정의
export function* callSaga() {
  yield takeEvery(LIKES, likesSaga);
}

export default reducer;
