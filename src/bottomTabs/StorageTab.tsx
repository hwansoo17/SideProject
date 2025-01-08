// src/navigation/StorageTab.tsx

import React, { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StorageMain from '../screens/storage/StorageMain';
import StorageDetail from '../screens/storage/StorageDetail';
import AddCard from '../screens/storage/AddCard';
import SaveCard from '../screens/storage/SaveCard';
import useTabBarVisibilityStore from '../store/useTabBarVisibilityStore'; // Import the zustand store
import { NavigationProp } from '@react-navigation/native';

const Stack = createStackNavigator();

const StorageTab: React.FC<{ route: any }> = ({ route }) => {
  // Access the zustand store
  const { showTabBar, hideTabBar } = useTabBarVisibilityStore();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'StorageMain' || routeName === undefined) {
      showTabBar();
    } else {
      hideTabBar();
    }
  }, [route, showTabBar, hideTabBar]);

  return (
    <Stack.Navigator initialRouteName="StorageMain">
      <Stack.Screen name="StorageMain" component={StorageMain} options={{ headerShown: false }}/>
      <Stack.Screen name="StorageDetail" component={StorageDetail} options={{ headerShown: false }}/>
      <Stack.Screen name="AddCard" component={AddCard} options={{ headerShown: false }}/>
      <Stack.Screen name="SaveCard" component={SaveCard} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default StorageTab;
