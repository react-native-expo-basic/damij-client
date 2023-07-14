import { ProductItem } from "components/modal/LikeProductListModal";
import { LikesFolderType } from "../../screens/Likes";

export interface ChangeFoldersType {
  productIdList: number[];
  changeName: string;
  originName: string;
}
export interface DeleteProductType {
  choiceName: string;
  productIdList: number[];
}
export interface DeleteFolderSaga {
  type: string;
  payload: DeleteProductType;
}
export interface FolderSagaAction {
  type: string;
  payload: ChangeFoldersType;
}
export interface ChangeFoldersSaga {
  type: string;
  payload: ChangeFoldersType;
}
export interface ModalStateType extends ChangeFoldersType {
  originFolder: string;
  products: ProductItem[];
  productList: LikesFolderType[];
  filteredFolders: LikesFolderType[];
  inputValue: string;
}

export interface FolderType {
  type: string;
  payload: { inputValue: string };
}
