import { put, call, select, takeEvery } from "redux-saga/effects";
import { openModal, closeModal } from "./modal";
import { AddFolder, handleDeleteFolder } from "../../api/folderApi";
import { LikesFolderType } from "../../screens/Likes";
import { handleDeleteProducts } from "../../api/folderApi";
import {
  pending,
  success_addFolder,
  fail,
  success_deleteFolder,
  success_deleteProducts,
  filterdLikes,
} from "./folderActions";
import { DeleteFolderSaga, FolderType } from "./folderTypes";
import { DELETE_PRODUCTS, DELETE_FOLDER, ADD_FOLDER } from "./folderActions";
import { ProductItem } from "../../components/modal/LikeProductListModal";
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
