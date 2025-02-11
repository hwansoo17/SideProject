import React from 'react';
import { StyleSheet, View } from 'react-native';

import ConfigTab from './Tabs/ConfigTab';
import { useConfigTabStore } from '../../store/useUpdateCardStore';
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