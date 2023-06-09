import React from "react";
import Category from "./Category";
import { MainProps } from "types/types";
import Product from "../main/Product";
import { filteredIsBest } from "../../../utils/productUtils";
import Section from "../Section";
import styled from "styled-components/native";

export default function Index({ productInfo }: MainProps) {
  const popularProducts = filteredIsBest(productInfo);
  return (
    <Section>
      <PaddingView>
        <Category />
        <Product products={popularProducts} />
      </PaddingView>
    </Section>
  );
}
const PaddingView = styled.View`
  flex: 1;
  padding: 6px 15px;
  box-sizing: border-box;
`;
