import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../styles/styles';
import useMakeCardStore, { useConfigTabStore } from '../../../store/useMakeCareStepStore';
import { useNavigation } from '@react-navigation/native';
import Colors from './Background/Colors';
import Gradients from './Background/Gradients';

const ChevronUp = require('../../../assets/icons/chevron-up.svg').default;
const ChevronDown = require('../../../assets/icons/chevron-down.svg').default;

const RegisterBG = () => {
  const navigation = useNavigation();
  const {formData, updateFormData} = useMakeCardStore();
  const {setStep} = useConfigTabStore();
  const [selectedList, setSelectedList] = useState<[boolean, boolean, boolean]>([false, false, false]);
  
  const toggleContainer = (index: number) => {
    setSelectedList(prev => prev.map((v, i) => i === index ? !v : v));
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.contentContainer,
          formData.background === 'IMAGE' && styles.selectedContentContainer,
        ]}
      >
        <View style={styles.headLiner}>
          <Text style={styles.text}>사진</Text>
          <TouchableOpacity
            onPress={() => toggleContainer(0)}
            style={[
              styles.openButton,
              formData.background === 'IMAGE' && styles.selectedButton,
            ]}
          >
            <Text style={styles.text}>
              {formData.background === 'IMAGE' ? '적용' : '선택'}
            </Text>
            {selectedList[0] ? <ChevronUp /> : <ChevronDown />}
          </TouchableOpacity>
        </View>
        {selectedList[0] && (
          <View style={styles.content}>
            <Text>여기에 내용이 들어갑니다.</Text>
          </View>
        )}
      </View>
      <View
        style={[
          styles.contentContainer,
          formData.background === 'COLOR' && styles.selectedContentContainer,
        ]}
      >
        <View style={styles.headLiner}>
          <Text style={styles.text}>컬러</Text>
          <TouchableOpacity
            onPress={() => toggleContainer(1)}
            style={[
              styles.openButton,
              formData.background === 'COLOR' && styles.selectedButton,
            ]}
          >
            <Text style={styles.text}>
              {formData.background === 'COLOR' ? '적용' : '선택'}
            </Text>
            {selectedList[1] ? <ChevronUp /> : <ChevronDown />}
          </TouchableOpacity>
        </View>
        {selectedList[1] && <Colors />}
      </View>
      <View
        style={[
          styles.contentContainer,
          formData.background === 'GRADIENT' && styles.selectedContentContainer,
        ]}
      >
        <View style={styles.headLiner}>
          <Text style={styles.text}>그라데이션</Text>
          <TouchableOpacity
            onPress={() => toggleContainer(2)}
            style={[
              styles.openButton,
              formData.background === 'GRADIENT' && styles.selectedButton,
            ]}
          >
            <Text style={styles.text}>
              {formData.background === 'GRADIENT' ? '적용' : '선택'}
            </Text>
            {selectedList[2] ? <ChevronUp /> : <ChevronDown />}
          </TouchableOpacity>
        </View>
        {selectedList[2] && <Gradients />}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.text}>뒤로</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStep('INFO')}
          style={styles.nextButton}
        >
          <Text style={styles.text}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.G01,
    borderRadius: 8,
  },
  selectedContentContainer: {
    borderWidth: 1,
    borderColor: colors.Primary,
  },
  headLiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.G03,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  selectedButton: {
    backgroundColor: colors.Primary,
  },
  text: {
    color: 'white',
  },
  content: {
    backgroundColor: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginVertical: 32,
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
});

export default RegisterBG;
