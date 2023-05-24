import * as React from "react";
import { useState, useEffect } from "react";
import Main from "../components/home/Main";
import { View, Text, useWindowDimensions } from "react-native";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import BestItems from "../components/home/BestItems";
import NewItems from "../components/home/NewItems";
import SaleItems from "../components/home/SaleItems";
import styled from "styled-components/native";
import { fetchProductData } from "../utils/fetchProductData";
import { ProductType } from "../types/types";

interface TabTextProps {
  focused: boolean;
}

export default function Home() {
  const layout = useWindowDimensions(); //TabView 컴포넌트에서 초기 레이아웃 설정을 위해서
  const [index, setIndex] = useState(0);
  const [productInfo, setProductInfo] = useState<ProductType[]>([]);
  const [routes] = useState([
    { key: "home", title: "홈" },
    { key: "best", title: "BEST" },
    { key: "new", title: "NEW" },
    { key: "sale", title: "SALE" },
  ]);

  const HomeCategory = () => <Main productInfo={productInfo} />;
  const BestItemsCategory = () => <BestItems productInfo={productInfo} />;
  const NewItemsCategory = () => <NewItems productInfo={productInfo} />;
  const SalesCategory = () => <SaleItems productInfo={productInfo} />;

  const renderScene = SceneMap({
    home: HomeCategory,
    best: BestItemsCategory,
    new: NewItemsCategory,
    sale: SalesCategory,
  });

  const fetchDataFromServer = async () => {
    try {
      const response = await fetchProductData();
      /* const isNewItems = filterdIsNew(response);
      const isBestItems = filterdIsBest(response); */
      setProductInfo(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "unset" }}
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
  margin: 8px;
  font-weight: ${(props) => (props.focused ? "600" : "500")};
  font-size: 16px;
`;
