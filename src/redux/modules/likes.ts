import { Action } from "redux-actions";
import { takeEvery, put, call, select } from "redux-saga/effects";
import { LikesProductType } from "types/types";
import { updateProductLikedStatus } from "../../utils/productUtils";

export interface AuthState {
  likes: LikesProductType;
  loading: boolean;
  error: any;
}

interface LikesSagaAction {
  type: string;
  payload: LikesProductType;
}

const prefix = "http://192.168.35.71:3000";

// 액션 타입 정의
const PENDING = `${prefix}/PENDING`;
const SUCCESS = `${prefix}/SUCCESS`;
const FAIL = `${prefix}/FAIL`;
const TOGGLE_LIKE = `${prefix}/TOGGLE_LIKE`;

// 액션 생성 함수
const pending = () => ({ type: PENDING });
const success = (likes: LikesProductType) => ({
  type: SUCCESS,
  payload: likes,
});
const fail = (error: Error | null) => ({ type: FAIL, payload: error });

export const toggleLike = (product: LikesProductType) => ({
  type: TOGGLE_LIKE,
  payload: product,
});

// 초기 상태 정의
const initialState: AuthState = {
  likes: { productId: null, isLiked: false },
  loading: false,
  error: null,
};

// 리듀서 함수 정의
const reducer = (
  state: AuthState = initialState,
  action: Action<LikesProductType>
): AuthState => {
  switch (action.type) {
    case PENDING:
      return { ...state, loading: true };
    case SUCCESS:
      return {
        ...state,
        likes: action.payload,
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
    yield call(updateProductLikedStatus, {
      productId: action.payload.productId,
      isLiked: !action.payload.isLiked,
    });

    // 성공 액션 디스패치
    yield put(
      success({
        productId: action.payload.productId,
        isLiked: !action.payload.isLiked,
      })
    );
  } catch (error: any) {
    yield put(fail(error));
  }
}

// 루트 사가 함수 정의
export function* callSaga() {
  yield takeEvery(TOGGLE_LIKE, likesSaga);
}

export default reducer;
