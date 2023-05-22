import * as React from "react";
import { useState } from "react";
import Main from "../components/home/Main";
import { View, Text, useWindowDimensions } from "react-native";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { TabBarProps } from "react-native-tab-view";
import BestItems from "../components/home/BestItems";
import NewItems from "../components/home/NewItems";
import SaleItems from "../components/home/SaleItems";
import styled from "styled-components/native";

const HomeCategory = () => <Main />;
const BestItemsCategory = () => <BestItems />;
const NewItemsCategory = () => <NewItems />;
const SalesCategory = () => <SaleItems />;

const renderScene = SceneMap({
  home: HomeCategory,
  best: BestItemsCategory,
  new: NewItemsCategory,
  sale: SalesCategory,
});
interface TabTextProps {
  focused: boolean;
}
export default function Home() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "홈" },
    { key: "best", title: "BEST" },
    { key: "new", title: "NEW" },
    { key: "sale", title: "SALE" },
  ]);

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
