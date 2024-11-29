import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, textStyles } from '../../../styles/styles';
import useMakeCardStore, { useConfigTabStore, useLogoSearchStore } from '../../../store/useMakeCareStepStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const SearchIcon = require('../../../assets/icons/search.svg').default;
const PlusIcon = require('../../../assets/icons/small_plus.svg').default;

interface INav extends NavigationProp<any> {}

const RegisterLogo = () => {
  const navigation = useNavigation<INav>();
  const {search, logoImg, setLogoImg} = useLogoSearchStore();
  const {formData, updateFormData} = useMakeCardStore();
  
  const {setStep} = useConfigTabStore();

  const handleAddLogo = () => {
    Alert.alert('추가 완료', '로고가 추가되었습니다.');
  }

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
              onPress={() => navigation.navigate('Search')}
            />
            <View style={styles.searchIcon}>
              <SearchIcon />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.text, styles.center]}>로고를 찾지 못하셨나요? 직접 첨부하기</Text>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={handleAddLogo} style={styles.addLogoIcon}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setStep('INFO')}
            style={styles.backButton}
          >
            <Text style={styles.text}>뒤로</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.nextButton}>
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
  logoContainer: {
    marginTop: 24,
    backgroundColor: colors.G01,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    textAlign: 'center',
  },
  addLogoIcon: {
    flex: 1,
  }
});

export default RegisterLogo;