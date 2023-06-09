import React from "react";
import SwiperComponent from "./SwiperComponent";
import ProductList from "./ProductList";
import { MainProps } from "../../../types/types";
import Section from "../Section";

export default function Index({ productInfo }: MainProps) {
  return (
    <Section>
      <SwiperComponent />
      <ProductList productInfo={productInfo} />
    </Section>
  );
}
