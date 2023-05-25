import React, { useState, useCallback } from "react";
import { ProductType } from "../types/types";

import axios from "axios";

export async function fetchProductData() {
  try {
    const response = await axios.get("http://192.168.35.100:3000/cloth");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function filterdIsNew(productInfo: ProductType[]): ProductType[] {
  const filteredItems =
    productInfo.length > 0
      ? productInfo.filter((item) => item.isNew === true)
      : [];

  return filteredItems;
}

export function filterdIsBest(productInfo: ProductType[]): ProductType[] {
  const sortItems = productInfo.sort((a, b) => b.salesCount - a.salesCount);
  const filteredItems = sortItems.slice(0, 10);

  return filteredItems;
}

export function filteredIsSale(productInfo: ProductType[]): ProductType[] {
  const filteredItems =
    productInfo.length > 0
      ? productInfo.filter((item) => item.isOnSale === true)
      : [];
  return filteredItems;
}
