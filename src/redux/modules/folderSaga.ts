import { put, call, select, takeEvery } from "redux-saga/effects";
import { openModal, closeModal } from "./modal";
import { AddFolder, handleDeleteFolder } from "../../api/folderApi";
import { LikesFolderType } from "../../screens/Likes";
import {
  handleDeleteProducts,
  handleChangeProducts,
} from "../../api/folderApi";
import { FolderSagaAction } from "./folderTypes";
import {
  pending,
  success_addFolder,
  fail,
  success_deleteFolder,
  success_deleteProducts,
  filterdLikes,
  DELETE_PRODUCTS,
  DELETE_FOLDER,
  ADD_FOLDER,
  CHANGE_FOLDER,
} from "./folderActions";
import { DeleteFolderSaga, FolderType, ChangeFoldersSaga } from "./folderTypes";
import { ProductItem } from "../../components/modal/LikeProductListModal";

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
      return !action.payload.productIdList.includes(product.id); // 필터링된 상품들을 반환
    });

    yield call(handleDeleteProducts, {
      choiceName: action.payload.choiceName,
      productIdList: action.payload.productIdList,
    });
    yield put(success_deleteProducts(filteredProducts));

    yield put(filterdLikes(action.payload.productIdList));
  } catch (error: any) {
    yield put(fail(error));
  }
}
function* changeProductSaga(action: FolderSagaAction) {
  try {
    yield put(pending());
    const { products } = yield select((state) => state.folder);

    if (action.payload.changeName === action.payload.originName) {
      // alert 모달 추가 후 수정 예정
      yield put(closeModal("likeDetail"));
      yield put(
        openModal("alert", {
          message: "같은 폴더로는 상품을 옮길 수 없습니다.",
        })
      );
      return;
    }

    const filteredProducts = products.filter((product: ProductItem) => {
      return !action.payload.productIdList.includes(product.id); // 필터링된 상품들을 반환
    });

    yield call(handleChangeProducts, {
      originName: action.payload.originName,
      changeName: action.payload.changeName,
      productIdList: action.payload.productIdList,
    });
    yield put(success_deleteProducts(filteredProducts));
  } catch (error: any) {
    yield put(fail(error));
  }
}

export function* watchFolderSaga() {
  yield takeEvery(DELETE_PRODUCTS, deleteProductSaga);
  yield takeEvery(CHANGE_FOLDER, changeProductSaga);
  yield takeEvery(DELETE_FOLDER, deleteFolderSaga);
  yield takeEvery(ADD_FOLDER, addFolderSaga);
}
