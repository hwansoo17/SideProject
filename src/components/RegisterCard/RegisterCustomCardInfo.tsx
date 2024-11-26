import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/styles';
import ConfigTab from './Tabs/ConfigTab';
import { useConfigTabStore } from '../../store/useMakeCareStepStore';
import RegisterBG from './Tabs/RegisterBG';
import RegisterInfo from './Tabs/RegisterInfo';
import RegisterCorp from './Tabs/RegisterCorp';
import RegisterLogo from './Tabs/RegisterLogo';


const RegisterCustomCardInfo = () => {
  const {step} = useConfigTabStore();

  return (
    <View style={styles.container}>
      <ConfigTab />
      {
        step === 'BG' ? <RegisterBG /> :
        step === 'INFO' ? <RegisterInfo /> :
        step === 'CORP' ? <RegisterCorp /> :
        <RegisterLogo />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
  },
});

export default RegisterCustomCardInfo;