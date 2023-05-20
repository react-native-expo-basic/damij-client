import { ThemeProvider } from "react-native-rapi-ui";
import AppNavigator from "./src/navigation/AppNavigator";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import Header from "./src/components/Header";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Noto-Sans-Regular": require("./assets/fonts/NotoSansKR-Regular.otf"),
        "Noto-Sans-Medium": require("./assets/fonts/NotoSansKR-Medium.otf"),
        "Noto-Sans-Bold": require("./assets/fonts/NotoSansKR-Bold.otf"),
      });
    };

    loadFonts();
    setFontsLoaded(true);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Header />
      <AppNavigator></AppNavigator>
    </ThemeProvider>
  );
}
