import { all } from "redux-saga/effects";
import { callSaga } from "./likes";
import { watchFolderSaga } from "./folderSaga";
import { authSaga } from "./auth";
export default function* rootSaga() {
  yield all([callSaga(), watchFolderSaga(), authSaga()]); // 하위 사가들을 배열로 넣음
}
