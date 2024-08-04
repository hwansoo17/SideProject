import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import useAuthStore from '../store/useAuthStore';

const RootNavigator = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
      <NavigationContainer>
        {isLoggedIn ?  <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
  );
};

export default RootNavigator;