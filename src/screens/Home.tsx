import { useState, useEffect, useMemo } from "react";
import Main from "../components/home/main/Index";
import { useSelector } from "react-redux";
import { View, Text, useWindowDimensions } from "react-native";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";

import BestItems from "../components/home/best/Index";
import NewItems from "../components/home/new/Index";
import SaleItems from "../components/home/sale/Index";
import styled from "styled-components/native";
import { fetchProductData } from "../utils/productUtils";
import { ProductType } from "../types/types";
import { viewDisableColor } from "../style";

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

  const HomeCategory = <Main />;
  const BestItemsCategory = <BestItems />;
  const NewItemsCategory = <NewItems productInfo={productInfo} />;
  const SalesCategory = <SaleItems />;

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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TabView
        renderTabBar={(props) => (
          <View style={{ borderBottomWidth: 1, borderColor: viewDisableColor }}>
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
          </View>
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
  elevation: 0;
  margin: 0 20px;
`;
