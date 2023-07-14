import React, { useEffect, useState } from "react";
import { TouchableOpacity, Modal, FlatList, Dimensions } from "react-native";
import styled from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import LikeProduct from "../../components/LikeProduct";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import useModal from "../../hooks/useModal";
import { openFolder } from "../../redux/modules/folderActions";
import { fetchLikeProductData } from "../../api/productApi";
import { useSelector } from "react-redux";
import { deleteProductList } from "../../redux/modules/folderActions";
import {
  textEditFolderColor,
  textEditFolderFontSize,
  textHeaderTitleSize,
  textCountListColor,
  textProductColor,
  loadingSpinnerColor,
} from "../../style";
import LoadingSpinner from "../LoadingSpinner";
import { useDispatch } from "react-redux";
import { LikeModalProps } from "../../types/types";

export interface ProductItem {
  name: string;
  price: number;
  img: string;
  discountRate: number;
  id: number;
}

export interface ProductState {
  folder: {
    products: ProductItem[];
  };
}

export default function LikeProductListModal({ folderName }: LikeModalProps) {
  const products = useSelector((state: ProductState) => state.folder.products);
  const [isEditable, setIsEditable] = useState(false); // 편집 혹은 완료 버튼의 알림
  const [selectedItems, setSelectedItems] = useState<number[]>([]); // 클릭한 좋아요 상품 아이디를 저장
  const [productList, setProductList] = useState<ProductItem[]>([]); // 폴더 내에 있는 상품데이터들을 저장
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const isClickable = selectedItems.length > 0;

  // 폴더 내부에 있는 상품 데이터 가져오기
  const handlerFolderData = async () => {
    try {
      const response = await fetchLikeProductData(folderName);

      setIsLoading(false);
      setProductList(response);
    } catch (error) {
      console.log(
        "좋아요 상태의 상품을 가져오는 도중 오류가 발생했습니다.",
        error
      );
    }
  };

  // 상품이 클릭 되어있는 지 체크하기
  const handleCheckedItems = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 편집 혹은 완료 버튼을 누를 때
  const handleLikeProducts = () => {
    if (!isEditable) {
      setSelectedItems([]);
      dispatch(openFolder(productList));
      return setIsEditable(!isEditable);
    }

    setIsEditable(!isEditable);
  };

  //삭제 버튼을 클릭했을 때
  const handleDeleteButton = () => {
    openModal("confirm", {
      message: "선택하신 상품을 삭제하시겠습니까?",
      handler: async () => {
        try {
          dispatch(deleteProductList(folderName, selectedItems));
        } catch (error) {
          console.log("선택하신 상품을 삭제하는 과정에서 오류가 발생했습니다.");
        }
      },
    });
    setIsEditable(!isEditable);
  };
  //폴더 이동 버튼을 클릭했을 때
  const handleFolderButton = () => {
    openModal("handleFolder", {
      title: "폴더 선택",
      productsId: selectedItems,
      originFolder: folderName,
    });
  };
  useEffect(() => {
    handlerFolderData();
    setIsLoading(true);
  }, []);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const renderItem = ({ item }: { item: ProductItem }) => {
    return (
      <LikeProduct
        props={item}
        selectedItems={selectedItems}
        isEditable={isEditable}
        toggleChecked={handleCheckedItems}
      />
    );
  };
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => closeModal("likeDetail")}
      style={{ flex: 1 }}
    >
      <Header>
        <FlexContainer>
          <SimpleLineIcons
            name="arrow-left"
            size={19}
            color={textProductColor}
            onPress={() => closeModal("likeDetail")}
          />
          <Title>{folderName}</Title>
        </FlexContainer>
        {isLoading ? (
          <></>
        ) : (
          <TouchableOpacity onPress={handleLikeProducts}>
            <EditButtonText>{isEditable ? "완료" : "편집"}</EditButtonText>
          </TouchableOpacity>
        )}
      </Header>
      <ProductContainer>
        {isLoading ? (
          <LoadingSpinner color={loadingSpinnerColor} />
        ) : (
          <FlatList
            data={productList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={3}
            ListHeaderComponent={
              <LikeCountText>{`찜한 상품 ${productList.length}개`}</LikeCountText>
            }
          />
        )}
      </ProductContainer>
      {isEditable && (
        <EditTabBar>
          <EditButtonContainer
            onPress={handleFolderButton}
            disabled={!isClickable}
          >
            <MaterialCommunityIcons
              name="folder-move-outline"
              size={24}
              color={isClickable ? "black" : textCountListColor}
            />
            <EditSecionText isClickable={isClickable}>폴더이동</EditSecionText>
          </EditButtonContainer>
          <EditButtonContainer
            onPress={handleDeleteButton}
            disabled={!isClickable}
          >
            <AntDesign
              name="delete"
              size={22}
              color={isClickable ? "black" : textCountListColor}
            />
            <EditSecionText isClickable={isClickable}>삭제</EditSecionText>
          </EditButtonContainer>
        </EditTabBar>
      )}
    </Modal>
  );
}

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px 15px;
  height: 50px;
  align-items: center;
`;
const Title = styled.Text`
  font-size: ${textHeaderTitleSize};
  font-weight: 600;
  margin-left: 20px;
`;
const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const EditButtonText = styled.Text`
  font-size: ${textEditFolderFontSize};
  margin-right: 5px;
  color: ${textEditFolderColor};
`;

const EditSecionText = styled.Text<{ isClickable: boolean }>`
  color: ${(props) => (props.isClickable ? "black" : textCountListColor)};
`;
const LikeCountText = styled.Text`
  color: ${textCountListColor};
  letter-spacing: -0.3px;
  font-size: 15px;
  margin-bottom: 6px;
  font-weight: 500;
  margin-left: 8px;
`;
const ProductContainer = styled.View`
  flex: 1;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 20px;
`;
const EditTabBar = styled(FlexContainer)`
  border-top-width: 0.5px;
  border-color: #d5d5d5;

  padding: 10px 0 8px;
`;
const EditButtonContainer = styled.TouchableOpacity`
  width: 50%;

  display: flex;
  align-items: center;
`;
