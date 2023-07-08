import axios from "axios";
import { LikesProductType } from "../types/types";
import { authInstance, instance } from "./api";
import TokenService from "../services/TokenSerivce";
export async function fetchProductData(category: string) {
  try {
    const isToken = TokenService.get();
    console.log(isToken);
    if (isToken == null) {
      const response = await instance.get(
        `api/product/list?keyword=${category}`
      );
      return response.data;
    }
    const response = await authInstance.get(
      `api/product/list?keyword=${category}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function filtetedProductData(category: string) {
  try {
    const response = await authInstance.get(
      `api/product/list?category=${category}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductLikedStatus({
  productId,
  isLiked,
}: LikesProductType) {
  try {
    const response = await authInstance.post(`api/my/pickproduct`, {
      productId,
    });
    console.log("좋아요 리스폰스", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "상품의 좋아요 상태를 업데이트하는 도중 오류가 발생했습니다.",
      error
    );
  }
}
