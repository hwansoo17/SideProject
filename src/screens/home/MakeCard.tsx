import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TakePhoto from '../../components/MakeCard/TakePhoto';
import RegisterCardItem from '../../components/MakeCard/RegisterCardItem';
import useMakeCardStore from '../../store/useMakeCareStepStore';
import RegisterComplete from '../../components/MakeCard/RegisterComplete';
import { useLinkBottomSheetStore } from '../../store/useBottomSheetStore';
import useTabBarVisibilityStore from '../../store/useTabBarVisibilityStore';

interface IMakeCardProps {
  isMyCard: boolean;
}

const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const MakeCard: React.FC<IMakeCardProps> = ({isMyCard = true}) => {
  const { hideTabBar, showTabBar } = useTabBarVisibilityStore();
  const {step, resetStep, setIsMyCard} = useMakeCardStore();
  const {resetLinks} = useLinkBottomSheetStore();
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      resetStep();
      resetLinks();
    };
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        hideTabBar();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        hideTabBar(); // 키보드가 사라져도 탭바는 계속 숨김 상태 유지
      }
    );

    // 컴포넌트 마운트 시 탭바 숨기기
    hideTabBar();

    // 클린업 함수
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    setIsMyCard(isMyCard);
  }, [isMyCard]);

  const handleBack = () => {
    resetStep();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.leftIcon}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      {step === 1 ? <RegisterCardItem /> : <RegisterComplete />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    flex: 0.1,
    textAlign: 'center',
    // backgroundColor: '#0d0d0d',
    justifyContent: 'space-between',
  },
  leftIcon: {
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'center',
    color: '#fff',
  },
});

export default MakeCard;
