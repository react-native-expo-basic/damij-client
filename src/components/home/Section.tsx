import React from "react";
import { View, ScrollView } from "react-native";

interface MainSectionProps {
  children: React.ReactNode;
}

const Section: React.FC<MainSectionProps> = ({ children, ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default Section;
