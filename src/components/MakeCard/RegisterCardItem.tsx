import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  View,
  Text,
  Dimensions,
  Alert,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import useMakeCardStepStore from '../../store/useMakeCareStepStore';
import {useNavigation} from '@react-navigation/native';
import {colors, textStyles} from '../../styles/styles';
import AddLinkModal from './AddLinkModal';
import {useCardSubmitBottomSheetStore, useLinkBottomSheetStore} from '../../store/useBottomSheetStore';

const XIcon = require('../../assets/icons/links/x_icon.svg').default;
const KakaoIcon = require('../../assets/icons/links/kakao_icon.svg').default;
const FacebookIcon = require('../../assets/icons/links/facebook_icon.svg').default;
const InstagramIcon = require('../../assets/icons/links/instagram_icon.svg').default;
const LinkIcon = require('../../assets/icons/links/default_link_icon.svg').default;
const AddIcon = require('../../assets/icons/links/+_icon.svg').default;

const RegisterCardItem: React.FC = () => {
  const {formData, updateFormData, resetFormData, step, setStep} =
    useMakeCardStepStore();
  const {openBottomSheet, links, setLinks, setSelectedUrl} = useLinkBottomSheetStore();
  const {
    openBottomSheet: openCardSubmitBottomSheet,
    setOnSubmit,
    setOnCreateMobileCard,
  } = useCardSubmitBottomSheetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setOnSubmit(handleSubmit);
    setOnCreateMobileCard(handleCreateMobileCard);
  }, []);

  useEffect(() => {
    if (links.length > 0) {
      updateFormData(
        'links',
        links.map(l => l.url),
      );
    }
  }, [links]);

  const OpenLinkSheet = (link: {url: string; type: string}) => {
    setSelectedUrl(link.url);
    openBottomSheet();
  };

  const OpenCardSubmitSheet = () => {
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
    openCardSubmitBottomSheet();
  };

  const handleSubmit = () => {
    // Create Card
    console.log('Create Card');
    // navigation.navigate('CompleteCard');
  };
  const handleCreateMobileCard = () => {
    // Create Mobile Temp
    console.log('Create Mobile Temp');
    // navigation.navigate('RegisterCard');
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
        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>링크 추가</Text>
          <View style={styles.linkContainer}>
            {links.map((link: {url: string; type: string}, index: number) =>
              link.type === 'x' ? (
                <TouchableOpacity key={index} onPress={() => OpenLinkSheet(link)}>
                  <XIcon />
                </TouchableOpacity>
              ) : link.type === 'kakao' ? (
                <TouchableOpacity key={index} onPress={() => OpenLinkSheet(link)}>
                  <KakaoIcon />
                </TouchableOpacity>
              ) : link.type === 'facebook' ? (
                <TouchableOpacity key={index} onPress={() => OpenLinkSheet(link)}>
                  <FacebookIcon />
                </TouchableOpacity>
              ) : link.type === 'instagram' ? (
                <TouchableOpacity key={index} onPress={() => OpenLinkSheet(link)}>
                  <InstagramIcon />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity key={index} onPress={() => OpenLinkSheet(link)}>
                  <LinkIcon />
                </TouchableOpacity>
              ),
            )}
            <TouchableOpacity onPress={() => setIsModalOpen(true)}>
              <AddIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setStep(step - 1)}>
            <Text>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={OpenCardSubmitSheet}>
            <Text>다음</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AddLinkModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(url: string) => {
          setLinks(url);
        }}
      />
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
    width: '100%',
    height: Dimensions.get('window').width * (184 / 343),
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
    backgroundColor: colors.G02,
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: colors.Primary,
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
