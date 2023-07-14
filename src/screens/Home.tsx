import { useState, useEffect } from "react";
import Main from "../components/home/main/Index";
import TokenService from "../services/TokenSerivce";
import { View, useWindowDimensions } from "react-native";
import { fetchGuestToken } from "../api/userApi";
import { TabBar, TabView } from "react-native-tab-view";
import BestItems from "../components/home/best/Index";
import NewItems from "../components/home/new/Index";
import SaleItems from "../components/home/sale/Index";
import styled from "styled-components/native";
import { ProductType } from "../types/types";
import { viewDisableColor } from "../style";

interface TabTextProps {
  focused: boolean;
}

export default function Home() {
  const layout = useWindowDimensions(); //TabView 컴포넌트에서 초기 레이아웃 설정을 위해서
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const initializeApp = async () => {
      // 비회원 토큰이 이미 저장되어 있는지 확인
      const token = await TokenService.get();
      if (!token) {
        // 비회원 토큰이 저장되어 있지 않으면 발급받고 AsyncStorage에 저장
        const guestToken = await fetchGuestToken();
        if (guestToken) {
          await TokenService.set(guestToken);
        }
      }
    };

    initializeApp();
  }, []);
  const [routes] = useState([
    { key: "home", title: "홈" },
    { key: "best", title: "BEST" },
    { key: "new", title: "NEW" },
    { key: "sale", title: "SALE" },
  ]);

  const HomeCategory = <Main />;
  const BestItemsCategory = <BestItems />;
  const NewItemsCategory = <NewItems />;
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
