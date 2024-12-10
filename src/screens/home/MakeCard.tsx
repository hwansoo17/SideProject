import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TakePhoto from '../../components/MakeCard/TakePhoto';
import RegisterCardItem from '../../components/MakeCard/RegisterCardItem';
import useMakeCardStore from '../../store/useMakeCareStepStore';
import RegisterComplete from '../../components/MakeCard/RegisterComplete';
import { useLinkBottomSheetStore } from '../../store/useBottomSheetStore';

interface IMakeCardProps {
  isMyCard: boolean;
}

const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const MakeCard: React.FC<IMakeCardProps> = ({isMyCard = true}) => {
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
