import React, { useState } from "react";
import { View, Text, Image, ScrollView, Modal } from "react-native";
import SwiperComponent from "./SwiperComponent";
import { useSelector } from "react-redux";
import { ProductType } from "../../../types/types";

import LikeNotification from "../../modal/LikeNotification";
import { AuthState } from "redux/modules/likes";
import ProductSection from "./ProductSection";

export interface MainProps {
  productInfo: ProductType[];
}

export default function Index({ productInfo }: MainProps) {
  const [likeModalVisible, setLikeModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <SwiperComponent />
        <ProductSection productInfo={productInfo} />

        <LikeNotification />
      </ScrollView>
    </View>
  );
}
