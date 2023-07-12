import { ViewStyle } from "react-native";

export type SignupReqType = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type SigninReqType = {
  email: string;
  password: string;
};

export interface DataType {
  id: string;
}
//product type

export interface ProductType {
  id: number;
  img: string;
  name: string;
  price: number;
  colorList?: Array<string>;
  discountRate: number;
  saleCount: number;
  newProduct: boolean;
  picked: boolean;
  reviewCount: string;
  discountDateStart: string;
  discountDateEnd: string;
  registrationDate: string;
  type: string;
}

export interface LikesProductType {
  productId: number | null;
  isLiked?: boolean;
}
export interface MainProps {
  productInfo: ProductType[];
}

export interface ButtonType<T = any> {
  children: string;
  background?: string;
  color?: string;
  onPress: (text: T) => void;
}

//auth
export interface LikesState {
  likes: { likes: LikesProductType };
}

export interface LoginPayload {
  token: string;
  nickname: string;
  email: string;
}
export interface AuthStateType extends LoginPayload {
  isLogin: boolean;
}
export interface MainLikesState {
  likes: { likes: LikesProductType };
}
export interface MainAuthState {
  auth: { auth: AuthStateType };
}
export interface AddFolderState {
  folder: { originFolder: string };
}

//like
export interface LikeModalProps {
  folderName: string;
}
