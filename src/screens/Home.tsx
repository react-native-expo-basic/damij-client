import { useState, useEffect, useMemo } from "react";
import Main from "../components/home/Main/Index";
import { useSelector } from "react-redux";
import { View, Text, useWindowDimensions } from "react-native";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { LikesProductType } from "../types/types";
import BestItems from "../components/home/BestItems";
import NewItems from "../components/home/NewItems";
import SaleItems from "../components/home/SaleItems";
import styled from "styled-components/native";
import { fetchProductData } from "../utils/productUtils";
import { ProductType } from "../types/types";

interface TabTextProps {
  focused: boolean;
}

interface LikeState {
  likes: LikesProductType;
}

export default function Home() {
  const layout = useWindowDimensions(); //TabView 컴포넌트에서 초기 레이아웃 설정을 위해서
  const [index, setIndex] = useState(0);
  const [productInfo, setProductInfo] = useState<ProductType[]>([]);
  const likes = useSelector((state: LikeState) => state.likes);
  const [routes] = useState([
    { key: "home", title: "홈" },
    { key: "best", title: "BEST" },
    { key: "new", title: "NEW" },
    { key: "sale", title: "SALE" },
  ]);

  const HomeCategory = useMemo(
    () => <Main productInfo={productInfo} />,
    [productInfo]
  );
  const BestItemsCategory = useMemo(
    () => <BestItems productInfo={productInfo} />,
    [productInfo]
  );
  const NewItemsCategory = useMemo(
    () => <NewItems productInfo={productInfo} />,
    [productInfo]
  );
  const SalesCategory = useMemo(
    () => <SaleItems productInfo={productInfo} />,
    [productInfo]
  );

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "home":
        return HomeCategory;
      case "best":
        return BestItemsCategory;
      case "new":
        return NewItemsCategory;
      case "sale":
        return SalesCategory;
      default:
        return null;
    }
  };

  const fetchDataFromServer = async () => {
    try {
      const response = await fetchProductData();
      setProductInfo(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  useEffect(() => {
    setProductInfo((prevProductInfo) => {
      return prevProductInfo.map((product) => {
        if (product.id === likes.productId) {
          return {
            ...product,
            isLiked: !likes.isLiked,
          };
        }
        return product;
      });
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TabView
        renderTabBar={(props) => (
          <Bar
            {...props}
            style={{
              backgroundColor: "unset",
            }}
            labelStyle={{ color: "black" }}
            pressColor="transparent"
            indicatorStyle={{ backgroundColor: "black" }}
            renderLabel={({ route, focused }) => (
              <TabText focused={focused}>{route.title}</TabText>
            )}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
}
const TabText = styled.Text<TabTextProps>`
  color: ${(props) => (props.focused ? "black" : "grey")};
  text-align: center;
  font-weight: ${(props) => (props.focused ? "600" : "500")};
  font-size: 16px;
`;
const Bar = styled(TabBar)`
  margin: 0 15px;
`;
