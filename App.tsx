import { ThemeProvider } from "react-native-rapi-ui";
import AppNavigator from "./src/navigation/AppNavigator";
import React, { useEffect } from "react";
import * as Font from "expo-font";

export default function App() {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Noto-Sans-Regular": require("./assets/fonts/NotoSansKR-Regular.otf"),
        "Noto-Sans-Medium": require("./assets/fonts/NotoSansKR-Medium.otf"),
        "Noto-Sans-Bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
      });
    };

    loadFonts();
  }, []);

  return (
    <ThemeProvider>
      <AppNavigator></AppNavigator>
    </ThemeProvider>
  );
}
