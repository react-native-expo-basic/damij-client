import axios from "axios";
import { authInstance } from "./api";
import useModal from "../hooks/useModal";
import {
  ChangeFoldersType,
  DeleteProductType,
} from "../redux/modules/folderTypes";

export async function AddFolder(inputValue: string) {
  try {
    const response = await authInstance.post(
      `/api/my/createfolder/${inputValue}`,
      {
        name: inputValue,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const handleDeleteFolder = async (folderName: string) => {
  try {
    const response = await authInstance.delete(
      `/api/my/deletefolder/${folderName}`
    );
  } catch (error) {
    console.log("폴더를 삭제하는 도중 오류가 발생했습니다.", error);
  }
};

export const handleDeleteProducts = async ({
  choiceName,
  productIdList,
}: DeleteProductType) => {
  try {
    await authInstance.post(`/api/my/deletepick`, {
      choiceName,
      productIdList,
    });
  } catch (error) {
    console.log("폴더 상품들을 삭제하는 도중 오류가 발생했습니다.", error);
  }
};

export const handleChangeProducts = async ({
  originName,
  changeName,
  productIdList,
}: ChangeFoldersType) => {
  try {
    const response = await authInstance.post("/api/my/editpick", {
      originName,
      changeName,
      productIdList,
    });
  } catch (error) {
    console.log("폴더 상품을 이동하는 도중 오류가 발생했습니다.", error);
  }
};
