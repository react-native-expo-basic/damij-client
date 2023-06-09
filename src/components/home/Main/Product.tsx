import React, { useCallback, useState, useEffect } from "react";
import { ProductType } from "../../../types/types";
import styled from "styled-components/native";
import { Octicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { LikesProductType } from "../../../types/types";
import { toggleLike } from "../../../redux/modules/likes";
import useModal from "../../../hooks/useModal";

interface ProductProps {
  products?: ProductType[];
}

interface LikesBtnProps {
  isLiked: boolean;
}

interface ProductColorType {
  color: string;
}

export default function Product({ products }: ProductProps) {
  const [productsData, setProductsData] = useState(products);
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const toggleProductLikedStatus = ({
    productId,
    isLiked,
  }: LikesProductType) => {
    dispatch(toggleLike({ productId, isLiked }));
    openModal("alarm", { isLiked, productId });
    setProductsData((prevProducts) => {
      return prevProducts?.map((product) => {
        if (product.id === productId) {
          const isLiked = !product.isLiked;
          return {
            ...product,
            isLiked: isLiked,
          };
        }
        return product;
      });
    });
  };
  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <Wrapper>
      {productsData?.map((product) => {
        return (
          <ProductCard key={product.product_name}>
            <ImageContainer>
              <Img source={{ uri: product.image }} />
              <LikesBtn
                name={product.isLiked ? "heart-fill" : "heart"}
                isLiked={product.isLiked}
                size={24}
                onPress={() =>
                  toggleProductLikedStatus({
                    productId: product.id,
                    isLiked: product.isLiked,
                  })
                }
              />
            </ImageContainer>
            <ProductContainer>
              <FlexContainer>
                {product.product_color?.map((color) => {
                  return <ProductColor key={color} color={color} />;
                })}
              </FlexContainer>

              <ProductName numberOfLines={1} ellipsizeMode="tail">
                {product.product_name}
              </ProductName>
              <ProductPrice>
                {product.product_price.toLocaleString()}
              </ProductPrice>
            </ProductContainer>
          </ProductCard>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductColor = styled.View<ProductColorType>`
  background: ${(props) => props.color};
  border-width: ${(props) => (props.color === "#fff" ? "1px" : 0)};
  border-color: #eaeaea;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 3px;
  margin-bottom: 3px;
`;

const ImageContainer = styled.View`
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;

const LikesBtn = styled(Octicons)<LikesBtnProps>`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 18px;
  color: ${(props) => (props.isLiked ? "#ff5a5a" : "white")};
`;
const Img = styled.Image`
  aspect-ratio: 1/1.3;
  border-radius: 40px;
`;

const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: -5px;
`;

const ProductCard = styled.View`
  width: 48%;

  margin: 8px 0;
`;
const ProductContainer = styled.View`
  margin: 30px 0 15px;
  height: 30px;
  display: flex;
  justify-content: center;
`;
const ProductName = styled.Text`
  font-size: 12px;
  font-family: "Noto-Sans-Regular";
`;
const ProductPrice = styled.Text`
  font-size: 16px;
  font-family: "Montserrat-SemiBold";

  margin-bottom: 2px;
`;
