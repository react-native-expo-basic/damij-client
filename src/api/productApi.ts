import instance from "./api";
import axios from "axios";

export async function fetchProductData(category: string) {
  try {
    const response = await axios.get(
      `http://13.124.181.25/api/product/listnouser?keyword=${category}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
