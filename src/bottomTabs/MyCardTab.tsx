// src/navigation/StorageTab.tsx

import React, { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyCardMain from '../screens/myCard/MyCardMain';
import MyCardDetail from '../screens/myCard/MyCardDetail';
import useTabBarVisibilityStore from '../store/useTabBarVisibilityStore'; // Import the zustand store

const Stack = createStackNavigator();

const MyCardTab: React.FC<{ route: any }> = ({ route }) => {
  // Access the zustand store
  const { showTabBar, hideTabBar } = useTabBarVisibilityStore();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MyCardMain' || routeName === undefined) {
      showTabBar();
    } else {
      hideTabBar();
    }
  }, [route, showTabBar, hideTabBar]);

  return (
    <Stack.Navigator initialRouteName="MyCardMain">
      <Stack.Screen name="MyCardMain" component={MyCardMain} options={{ headerShown: false }}/>
      <Stack.Screen name="CardDetail" component={MyCardDetail} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default MyCardTab;
