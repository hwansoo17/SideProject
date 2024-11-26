import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, textStyles } from '../../../styles/styles';
import useMakeCardStore, { useConfigTabStore } from '../../../store/useMakeCareStepStore';
import { useLinkBottomSheetStore } from '../../../store/useBottomSheetStore';
import AddLinkModal from '../../MakeCard/AddLinkModal';

const RegisterCorp = () => {
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
          <Text style={[textStyles.M4, styles.label]}>회사명 *</Text>
          <TextInput
            style={styles.input}
            placeholder="회사명을 입력해주세요"
            placeholderTextColor={colors.G04}
            value={formData.corporation}
            onChangeText={value => updateFormData('corporation', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>직책</Text>
          <TextInput
            style={styles.input}
            placeholder="직책을 입력해주세요"
            placeholderTextColor={colors.G04}
            value={formData.title}
            onChangeText={value => updateFormData('title', value)}
          />
        </View>
        <View style={{height: 100}} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flex: 1,
    backgroundColor: '#0d0d0d',
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

export default RegisterCorp;
