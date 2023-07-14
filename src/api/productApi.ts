import axios from "axios";
import { LikesProductType } from "../types/types";
import { authInstance } from "./api";
import TokenService from "../services/TokenSerivce";

export async function fetchProductData(category: string) {
  try {
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

//좋아요 버튼 클릭
export async function updateProductLikedStatus({
  productId,
  isLiked,
}: LikesProductType) {
  try {
    const response = await authInstance.post(`api/my/pickproduct`, {
      productId,
    });

    return response.data;
  } catch (error) {
    console.error(
      "상품의 좋아요 상태를 업데이트하는 도중 오류가 발생했습니다.",
      error
    );
  }
}

// 찜 카테고리에 저장된 폴더 데이터 가져오는 Api
export async function fetchLikeFolderData() {
  try {
    const response = await authInstance.get(`/api/my/readFolder`);
    return response.data;
  } catch (error) {
    console.error("좋아요 폴더를 가져오는 도중 오류가 발생했습니다.");
  }
}

export async function fetchLikeProductData(folderName: string) {
  try {
    const response = await authInstance.get(`/api/my/folderInfo/${folderName}`);
    return response.data;
  } catch (error) {
    console.error("좋아요 폴더의 상품을 가져오는 도중 오류가 발생했습니다.");
  }
}
