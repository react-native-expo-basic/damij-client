import { ThemeProvider } from "react-native-rapi-ui";
import AppNavigator from "./src/navigation/AppNavigator";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import Header from "./src/components/Header";
import create from "./src/redux/modules/create";
import { Provider } from "react-redux";
import GlobalModal from "./src/components/modal/GlobalModal";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const store = create();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Noto-Sans-Regular": require("./assets/fonts/NotoSansKR-Regular.otf"),
        "Noto-Sans-Medium": require("./assets/fonts/NotoSansKR-Medium.otf"),
        "Noto-Sans-Bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
        "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
      });
    };

    loadFonts();
    setFontsLoaded(true);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <AppNavigator />
        <GlobalModal />
      </ThemeProvider>
    </Provider>
  );
}
