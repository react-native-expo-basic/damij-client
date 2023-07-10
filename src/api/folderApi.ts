import axios from "axios";
import { authInstance } from "./api";

export async function AddFolder(inputValue: string) {
  try {
    console.log(inputValue, "텍스트");
    const response = await authInstance.post(
      `/api/my/createfolder/${inputValue}`,
      {
        name: inputValue,
      }
    );
    console.log(response.data, "api 결과");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
