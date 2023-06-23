import axios from "axios";
import { ProductType } from "../types/types";
import { LikesProductType } from "../types/types";

// 찜 카테고리 폴더에 저장된 상품 데이터 가져오는 Api
export async function fetchLikeProductData(folderName: string) {
  try {
    const response = await axios.get("http://192.168.35.55:3000/likes");
    return response.data;
  } catch (error) {
    console.error(
      "상품 폴더의 데이터를 서버에서 받아오는 도중에 오류가 발생했습니다."
    );
  }
}

// 찜 카테고리에 저장된 폴더 데이터 가져오는 Api
export async function fetchLikeFolderData() {
  try {
    const response = await axios.get(`http://192.168.35.55:3000/folder`);

    return response.data;
  } catch (error) {
    console.error("좋아요 폴더의 상품을 가져오는 도중 오류가 발생했습니다.");
  }
}

// 상품 좋아요 찜 카테고리에 업로드하는 Api
export async function uploadProductLikeData(
  productInfo: ProductType,
  isLiked: boolean,
  folderName: string
) {
  try {
    if (isLiked) {
      const response = await axios.post(
        `http://192.168.35.55:3000/likes?category/:${folderName}`,
        {
          folderName,
          productInfo,
        }
      );

      return response.data;
    } else {
      const likesResponse = await axios.get(`http://192.168.35.55:3000/likes`);
      const likes = likesResponse.data;

      const productId = productInfo.id;

      const productToDelete = likes.find(
        (like: any) => like.productInfo.id === productId
      );

      if (productToDelete) {
        const deleteResponse = await axios.delete(
          `http://192.168.35.55:3000/likes/${productToDelete.id}`
        );
      } else {
        console.log(`상품을 찾을 수 없습니다: ${productId}`);
      }
    }
  } catch (error) {
    console.error(
      "좋아요 상태의 상품을 업로드하는 도중 오류가 발생했습니다.",
      error
    );
  }
}

export async function updateProductLikedStatus({
  productId,
  isLiked,
}: LikesProductType) {
  try {
    const url = `http://192.168.35.55:3000/cloth/${productId}`;
    const data = { isLiked };

    const response = await axios.patch(url, data);

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
    const response = await axios.get("http://192.168.35.55:3000/cloth");

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
