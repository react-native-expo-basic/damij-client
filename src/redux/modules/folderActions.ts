import { LikesFolderType } from "../../screens/Likes";
import { ProductItem } from "../../components/modal/LikeProductListModal";
import { ChangeFoldersType } from "./folderTypes";

const prefix = "http://192.168.35.71:3000";

// 액션 타입 정의
export const FOLDER = `${prefix}/FOLDER`;
export const ADD_PRODUCT_LIST = `${prefix}/ADD_PRODUCT_LIST`;
export const DELETE_FOLDER = `${prefix}/DELETE_FOLDER`;
export const DELETE_PRODUCTS = `${prefix}/DELETE_PRODUCTS`;
export const CHANGE_FOLDER = `${prefix}/CHANGE_FOLDER`;
export const PENDING = `${prefix}/PENDING`;
export const SUCCESS_ADD = `${prefix}/SUCCESS_ADD`;
export const LIKES_PRODUCT_LIST = `${prefix}/LIKES_PROUCT_LIST`;
export const SUCCESS_DELETE_FOLDER = `${prefix}/SUCCESS_DELETE_FOLDER`;
export const SUCCESS_DELETE_PRODUCTS = `${prefix}/SUCCESS_DELETE_PRODUCTS`;
export const FAIL = `${prefix}/FAIL`;
export const ADD_FOLDER = `${prefix}/ADD_FOLDER`;
export const ADD_FOLDER_LIST = `${prefix}/ADD_FOLDER_LIST`;

// 상태를 업데이트 할 액션 생성자 함수

export const addFolder = (inputValue: string) => ({
  type: ADD_FOLDER,
  payload: { inputValue },
});

export const addFolderList = (productList: LikesFolderType[]) => ({
  type: ADD_FOLDER_LIST,
  payload: productList,
});
export const deleteFolder = (inputValue: string) => ({
  type: DELETE_FOLDER,
  payload: { inputValue },
});
export const deleteProductList = (
  choiceName: string,
  productIdList: number[]
) => ({
  type: DELETE_PRODUCTS,
  payload: { choiceName, productIdList },
});
export const openFolder = (products: ProductItem[]) => ({
  type: ADD_PRODUCT_LIST,
  payload: { products },
});
export const changeFolder = (info: ChangeFoldersType) => ({
  type: CHANGE_FOLDER,
  payload: info,
});

// 업데이트 한 상태를 활용할 액션 생성자 함수
export const pending = () => ({ type: PENDING });
export const filterdLikes = (likesList: number[]) => ({
  type: LIKES_PRODUCT_LIST,
  payload: likesList,
});
export const success_deleteProducts = (productsId: number[]) => ({
  type: SUCCESS_DELETE_PRODUCTS,
  payload: productsId,
});
export const success_addFolder = (inputValue: string) => ({
  type: SUCCESS_ADD,
  payload: inputValue,
});

export const success_deleteFolder = (inputValue: string) => ({
  type: SUCCESS_DELETE_FOLDER,
  payload: inputValue,
});
export const fail = (error: Error | null) => ({ type: FAIL, payload: error });
