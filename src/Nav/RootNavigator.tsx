import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import useAuthStore from '../store/useAuthStore';
import {StatusBar} from 'react-native';
import CreateCardBottomSheet from '../components/CreateCardBottomSheet';
import LinkBottomSheet from '../components/MakeCard/LinkBottomSheet';
import CardSubmitBottomSheet from '../components/MakeCard/CardSubmitBottomSheet';

const RootNavigator = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      <CreateCardBottomSheet />
      <LinkBottomSheet />
      <CardSubmitBottomSheet />
    </NavigationContainer>
  );
};

export default RootNavigator;
