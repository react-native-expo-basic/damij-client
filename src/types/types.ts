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

//product type
export interface ProductType {
  image: string;
  product_name: string;
  product_price: string;
  product_color?: string;
  discount_rate: number;
  isOnSale: boolean;
  salesCount: number;
  isNew: boolean;
  review_count: number;
}

export interface MainProps {
  productInfo: ProductType[];
}
