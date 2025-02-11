import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import useAuthStore from '../store/useAuthStore';
import {StatusBar} from 'react-native';
import CreateCardBottomSheet from '../components/CreateCardBottomSheet';
import LinkBottomSheet from '../components/MakeCard/LinkBottomSheet';
import CardSubmitBottomSheet from '../components/MakeCard/CardSubmitBottomSheet';
import { linking } from '../../deepLinkConfig';
import BgImgBottomSheet from '../components/RegisterCard/Tabs/BgImgBottomSheet';
import useRefresh from '../hooks/mutations/useRefresh';
import BgImgBottomSheetForUpdate from '../components/UpdateMyCard/Tabs/BgImgBottomSheetForUpdate';

const RootNavigator = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const useMutateRefresh = useRefresh();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useMutateRefresh.mutate(undefined, {
      onSuccess: () => {
        setIsLoading(false); // 성공 시 로딩 상태 해제
      },
      onError: () => {
        setIsLoading(false); // 에러 발생 시에도 로딩 상태 해제
      },
    });
  }, []);

  if (isLoading || useMutateRefresh.isPending) {
    return null;
  }

  return (
    <NavigationContainer linking={linking}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
      <CreateCardBottomSheet />
      <LinkBottomSheet />
      <CardSubmitBottomSheet />
      <BgImgBottomSheet />
      <BgImgBottomSheetForUpdate />
    </NavigationContainer>
  );
};

export default RootNavigator;
