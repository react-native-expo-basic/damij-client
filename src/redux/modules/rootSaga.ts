import { all } from "redux-saga/effects";
import { callSaga } from "./likes";
export default function* rootSaga() {
  yield all([callSaga()]); // 하위 사가들을 배열로 넣음
}
