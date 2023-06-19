import axios from "axios";

export async function searchCategory(menuTitle: string) {
  try {
    const response = await axios.get(
      `http://192.168.35.187:3000/category?categoryName=${menuTitle}`
    );
    return response;
  } catch (e) {}
}
