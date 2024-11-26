import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, textStyles } from '../../../styles/styles';
import useMakeCardStore, { useConfigTabStore, useLogoSearchStore } from '../../../store/useMakeCareStepStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const SearchIcon = require('../../../assets/icons/search.svg').default;

interface INav extends NavigationProp<any> {}

const RegisterLogo = () => {
  const navigation = useNavigation<INav>();
  const {search, logoImg, setLogoImg} = useLogoSearchStore();
  const {formData, updateFormData} = useMakeCardStore();
  
  const {setStep} = useConfigTabStore();

  const handleNextStep = () => {
    if (!formData.corporation) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }
    setStep('LOGO');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>로고</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <TextInput
              style={styles.input}
              placeholder="회사명을 검색해주세요"
              placeholderTextColor={colors.G04}
              value={search}
              readOnly
            />
            <View style={styles.searchIcon}>
              <SearchIcon />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>로고를 찾지 못하셨나요? 직접 첨부하기</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setStep('INFO')}
            style={styles.backButton}
          >
            <Text style={styles.text}>뒤로</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextStep} style={styles.nextButton}>
            <Text style={styles.text}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchResultContainer}>
        <Text>검색 결과</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
  inputContainer: {
    marginBottom: 24,
    width: '100%',
  },
  label: {
    color: colors.White,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.G01,
    borderRadius: 8,
    padding: 16,
    color: colors.White,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkIcon: {
    width: 20,
    height: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginTop: 32,
    marginBottom: 60,
  },
  backButton: {
    width: 180,
    backgroundColor: colors.G03,
    height: 48,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    width: 180,
    backgroundColor: colors.Primary,
    height: 48,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.White,
  },
});

export default RegisterLogo;
