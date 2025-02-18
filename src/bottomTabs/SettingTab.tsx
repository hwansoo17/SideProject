// src/navigation/StorageTab.tsx

import React, { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingMain from '../screens/setting/SettingMain';
import MyCardDetail from '../screens/myCard/MyCardDetail';
import EditProfile from '../screens/setting/EditProfile';
import useTabBarVisibilityStore from '../store/useTabBarVisibilityStore'; // Import the zustand store
import { NavigationProp } from '@react-navigation/native';
import AccountManage from '../screens/setting/AccountManage';
import PasswordChange from '../screens/setting/PasswordChange';

const Stack = createStackNavigator();

const SettingTab: React.FC<{ route: any }> = ({ route }) => {
  // Access the zustand store
  const { showTabBar, hideTabBar } = useTabBarVisibilityStore();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'SettingMain' || routeName === undefined) {
      showTabBar();
    } else {
      hideTabBar();
    }
  }, [route, showTabBar, hideTabBar]);

  return (
    <Stack.Navigator initialRouteName="storageMain">
      <Stack.Screen name="SettingMain" component={SettingMain} options={{ headerShown: false }}/>
      <Stack.Screen name="CardDetail" component={MyCardDetail} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
      <Stack.Screen name="AccountManage" component={AccountManage} options={{ headerShown: false }}/>
      <Stack.Screen name="PasswordChange" component={PasswordChange} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default SettingTab;
