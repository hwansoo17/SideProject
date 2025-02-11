import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useConfigTabStore } from '../../../store/useUpdateCardStore';
import { colors } from '../../../styles/styles';


const ConfigTab = () => {
  const { step, setStep } = useConfigTabStore();


  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={[styles.tabItem, step === 'BG' && styles.activeTabItem]} onPress={() => setStep('BG')}>
        <Text style={styles.tabItemText}>배경</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tabItem, step === 'INFO' && styles.activeTabItem]} onPress={() => setStep('INFO')}>
        <Text style={styles.tabItemText}>정보</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tabItem, step === 'CORP' && styles.activeTabItem]} onPress={() => setStep('CORP')}>
        <Text style={styles.tabItemText}>회사</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tabItem, step === 'LOGO' && styles.activeTabItem]} onPress={() => setStep('LOGO')}>
        <Text style={styles.tabItemText}>로고</Text>
      </TouchableOpacity>
    </View>
  );
}; 

const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabItem: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.G03,
  },
  activeTabItem: {
    backgroundColor: colors.Primary,
    borderColor: colors.Primary,
  },
  tabItemText: {
    color: colors.White,
  },
}); 

export default ConfigTab;