import { Action } from "redux-actions";
import { put, call, takeEvery } from "redux-saga/effects";
import jwtDecode from "jwt-decode";
import TokenService from "../../services/TokenSerivce";

interface LoginPayload {
  token: string;
  nickname: string;
  email: string;
}
export interface AuthStateType extends LoginPayload {
  isLogin: boolean;
  error?: Error | null;
}

const prefix = "http://192.168.35.71:3000";

// 액션 타입 정의
const SIGN_IN = `${prefix}/SIGNIN`;
const LOG_OUT = `${prefix}/LOGOUT`;
const SIGN_IN_SUCCESS = `${prefix}/SIGNIN_SUCCESS`;
const LOG_OUT_SUCCESS = `${prefix}/LOGOUT_SUCCESS`;
const FAIL = `${prefix}/FAIL`;

// 액션 생성자 함수 정의
export const signin = (token: string) => ({
  type: SIGN_IN,
  payload: token,
});

export const logout = () => ({
  type: LOG_OUT,
  payload: undefined,
});
const signinSuccess = (payload: LoginPayload) => ({
  type: SIGN_IN_SUCCESS,
  payload,
});
const logoutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
  payload: undefined,
});
const fail = (error: Error | null) => ({ type: FAIL, payload: error });

const initialState = {
  isLogin: false,
  nickname: "",
  token: "",
  email: "",
  error: null,
};

// 리듀서 함수 정의
const authState = (state = initialState, action: Action<AuthStateType>) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        nickname: action.payload.nickname,
        token: action.payload.token,
        email: action.payload.email,
      };
    case LOG_OUT_SUCCESS:
      return {
        isLogin: false,
        nickname: "",
        token: "",
        email: "",
      };
    case FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function* loginSaga(action: Action<string>) {
  try {
    const decodedToken = jwtDecode<LoginPayload>(action.payload);
    const { nickname, email } = decodedToken; // 토큰에서 사용자 정보 분류

    yield call(TokenService.set, action.payload); // AsyncStorage에 토큰 저장
    const payload: LoginPayload = {
      token: action.payload,
      nickname,
      email,
    };
    yield put(signinSuccess(payload)); // 리듀서에 유저 정보 저장
  } catch (error: any) {
    yield put(fail(error));
  }
}
function* logoutSaga() {
  try {
    yield call(TokenService.remove); // AsyncStorage에 토큰 삭제
    yield put(logoutSuccess()); // 리듀서에 유저 정보 초기화
  } catch (error: any) {
    yield put(fail(error));
  }
}

export function* authSaga() {
  yield takeEvery(SIGN_IN, loginSaga);
  yield takeEvery(LOG_OUT, logoutSaga);
}
export default authState;
