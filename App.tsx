import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootNavigator from "./src/Nav/RootNavigator";
import { Linking } from "react-native";
const queryClient = new QueryClient();
import { Camera } from "react-native-vision-camera";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { getKeyHashAndroid } from "@react-native-kakao/core";
const App = () => {
  initializeKakaoSDK("a0299bf3860ff2ca992a3e4846093601");

  getKeyHashAndroid().then(console.log);
  // 앱 시작시 권한요청
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${cameraPermission}`);
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
};

export default App;
