import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import useAuthStore from '../store/useAuthStore';
import BottomSheet from '../components/BottomSheet';
import {StatusBar} from 'react-native';
import { linking } from '../../deepLinkConfig';

const RootNavigator = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <NavigationContainer linking={linking}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      <BottomSheet />
    </NavigationContainer>
  );
};

export default RootNavigator;
