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

const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const MakeCard: React.FC = () => {
  const {step, resetStep} = useMakeCardStore();
  const navigation = useNavigation();

  useEffect(() => {
    return () => resetStep();
  }, []);

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
      {step == 1 ? <TakePhoto /> : <RegisterCardItem />}
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
