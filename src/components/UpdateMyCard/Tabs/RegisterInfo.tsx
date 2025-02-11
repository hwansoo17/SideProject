import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, textStyles } from '../../../styles/styles';
import useUpdateCardStore, { useConfigTabStore } from '../../../store/useUpdateCardStore';
import { useLinkBottomSheetStore } from '../../../store/useBottomSheetStore';
import AddLinkModal from '../../MakeCard/AddLinkModal';

const XIcon = require('../../../assets/icons/links/x_icon.svg').default;
const KakaoIcon = require('../../../assets/icons/links/kakao_icon.svg').default;
const FacebookIcon = require('../../../assets/icons/links/facebook_icon.svg').default;
const InstagramIcon = require('../../../assets/icons/links/instagram_icon.svg').default;
const LinkIcon = require('../../../assets/icons/links/default_link_icon.svg').default;
const AddIcon = require('../../../assets/icons/links/+_icon.svg').default;

const RegisterInfo = () => {
  const {formData, updateFormData} = useUpdateCardStore();
  const {setStep} = useConfigTabStore();
  const {openBottomSheet, links, setLinks, setSelectedUrl} = useLinkBottomSheetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const AddLink = () => {
    if (links.length >= 5) {
      Alert.alert('오류', '링크는 최대 5개까지 추가할 수 있습니다.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleNextStep = () => {
    if (!formData.name || !formData.tel || !formData.email) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }
    const phoneNumber = formData.tel.replace(/[^0-9]/g, ''); // 숫자만 남기기
    if (phoneNumber.length < 9 || phoneNumber.length > 11) {
      Alert.alert('입력 오류', '유효한 연락처를 입력해주세요.');
      return;
    }
    setStep('CORP');
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   keyboardVerticalOffset={50}
    //   style={styles.container}>
    <View style={styles.container}>
      <View style={styles.container}>
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
            // keyboardType="phone-pad"
            value={formData.tel}
            onChangeText={value => updateFormData('tel', value)}
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
            {links.map((link: {url: string; type: string}) =>
              link.type === 'x' ? (
                <TouchableOpacity onPress={() => OpenLinkSheet(link)}>
                  <XIcon />
                </TouchableOpacity>
              ) : link.type === 'kakao' ? (
                <TouchableOpacity onPress={() => OpenLinkSheet(link)}>
                  <KakaoIcon />
                </TouchableOpacity>
              ) : link.type === 'facebook' ? (
                <TouchableOpacity onPress={() => OpenLinkSheet(link)}>
                  <FacebookIcon />
                </TouchableOpacity>
              ) : link.type === 'instagram' ? (
                <TouchableOpacity onPress={() => OpenLinkSheet(link)}>
                  <InstagramIcon />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => OpenLinkSheet(link)}>
                  <LinkIcon />
                </TouchableOpacity>
              ),
            )}
            <TouchableOpacity onPress={AddLink}>
              <AddIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setStep('BG')}
            style={styles.backButton}
          >
            <Text style={styles.text}>뒤로</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextStep} style={styles.nextButton}>
            <Text style={styles.text}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddLinkModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(url: string) => {
          setLinks(url);
        }}
      />
    </View>
    // </KeyboardAvoidingView>
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

export default RegisterInfo;
