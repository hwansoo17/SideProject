import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Text, Image, Alert, TextInput, ScrollView} from 'react-native';
import useMakeCardStepStore from '../store/useMakeCareStepStore';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors, textStyles} from '../styles/styles';

const RegisterCardItem: React.FC = () => {
  const navigation = useNavigation();
  const {formData, updateFormData, resetFormData, step, setStep} =
    useMakeCardStepStore();

  const handleSubmit = () => {
    // 필수 입력값 검증
    if (
      !formData.name ||
      !formData.company ||
      !formData.phone ||
      !formData.email
    ) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }

    console.log('제출된 데이터:', formData);
    // API 호출 로직 추가
    navigation.navigate('RegisterCard');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardImage} />
        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>이름 *</Text>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요"
            placeholderTextColor={colors.G04}
            value={formData.name}
            onChangeText={value => updateFormData('name', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>회사명 *</Text>
          <TextInput
            style={styles.input}
            placeholder="회사명을 입력해주세요"
            placeholderTextColor={colors.G04}
            value={formData.company}
            onChangeText={value => updateFormData('company', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>직책</Text>
          <TextInput
            style={styles.input}
            placeholder="직책을 입력해주세요"
            placeholderTextColor={colors.G04}
            value={formData.position}
            onChangeText={value => updateFormData('position', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>주소</Text>
          <TextInput
            style={styles.input}
            placeholder="주소를 입력해주세요"
            placeholderTextColor={colors.G04}
            value={formData.address}
            onChangeText={value => updateFormData('address', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>연락처 *</Text>
          <TextInput
            style={styles.input}
            placeholder="연락처를 입력해주세요"
            placeholderTextColor={colors.G04}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={value => updateFormData('phone', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>이메일 *</Text>
          <TextInput
            style={styles.input}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor={colors.G04}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={value => updateFormData('email', value)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setStep(step - 1)}>
          <Text>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => setStep(step + 1)}>
          <Text>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterCardItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cardImage: {
    width: 343,
    height: 184,
    marginVertical: 20,
    backgroundColor: '#bebebe',
    borderRadius: 10,
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
  submitButton: {
    backgroundColor: colors.Primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
  },
  submitButtonText: {
    color: colors.White,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
  },
  cancelButton: {
    backgroundColor: '#fff',
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#fff',
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
