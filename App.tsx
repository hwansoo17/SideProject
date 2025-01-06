import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/Nav/RootNavigator';
import { Linking } from 'react-native';
const queryClient = new QueryClient();
import {Camera} from 'react-native-vision-camera';

const App = () => {
  // 앱 시작시 권한요청
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${cameraPermission}`);
    })();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator/>
    </QueryClientProvider>
  );
};

export default App;