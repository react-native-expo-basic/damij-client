import axios from "axios";
import { ProductType } from "../types/types";
import { LikesProductType } from "../types/types";

export async function updateProductLikedStatus({
  productId,
  isLiked,
}: LikesProductType) {
  try {
    const url = `http://192.168.35.187:3000/cloth/${productId}`;
    const data = { isLiked };

    const response = await axios.patch(url, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(
      "상품의 좋아요 상태를 업데이트하는 도중 오류가 발생했습니다.",
      error
    );
    throw error;
  }
}

export async function fetchProductData() {
  try {
    const response = await axios.get("http://192.168.35.187:3000/cloth");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function filteredIsNew(productInfo: ProductType[]): ProductType[] {
  const filteredItems =
    productInfo && productInfo.length > 0
      ? productInfo.filter((item) => item.isNew === true)
      : [];

  return filteredItems;
}

export function filteredIsBest(productInfo: ProductType[]): ProductType[] {
  if (!productInfo) {
    return [];
  }
  const sortItems = productInfo.sort((a, b) => b.salesCount - a.salesCount);
  const filteredItems = sortItems.slice(0, 10);

  return filteredItems;
}

export function filteredIsSale(productInfo: ProductType[]): ProductType[] {
  const filteredItems =
    productInfo && productInfo.length > 0
      ? productInfo.filter((item) => item.isOnSale === true)
      : [];
  return filteredItems;
}
