import { ViewStyle } from "react-native";

export type SignupReqType = {
  email: string;
  password: string;
  /*   name: string; */
  /*   address: string;
  phoneNumb: number; */
};

export type LoginReqType = {
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
  salesCount: number;
  newProduct: boolean;
  picked: boolean;
  review_count: string;
  discountDateStart: string;
  discountDateEnd: string;
  registrationDate: string;
  type: string;
}

export interface LikesProductType {
  productId: number | null;
  isLiked: boolean;
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
