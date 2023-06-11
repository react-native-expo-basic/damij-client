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
  image: string;
  product_name: string;
  product_price: number;
  product_color?: Array<string>;
  discount_rate: number;
  isOnSale: boolean;
  salesCount: number;
  isNew: boolean;
  isLiked: boolean;
  review_count: number;
}

export interface LikesProductType {
  productId: number | null;
  isLiked: boolean;
}
export interface MainProps {
  productInfo: ProductType[];
}

export interface ButtonType<T = any> {
  texts: string;
  event: (text: T) => void;
}
