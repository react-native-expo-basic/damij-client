import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([]); // 하위 사가들을 배열로 넣음
}
