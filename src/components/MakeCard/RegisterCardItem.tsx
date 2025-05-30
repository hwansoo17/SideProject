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
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import useMakeCardStore from '../../store/useMakeCareStepStore';
import {useNavigation} from '@react-navigation/native';
import {colors, textStyles} from '../../styles/styles';
import AddLinkModal from './AddLinkModal';
import {
  useCardSubmitBottomSheetStore,
  useLinkBottomSheetStore,
} from '../../store/useBottomSheetStore';
import {useMutation, useQuery} from '@tanstack/react-query';
import {CreateMyCardAPI, fetchMyCardList} from '../../api/myCard';
import {CreateCardAPI, CreateCardTempAPI} from '../../api/card';
import {getRandomColor} from '../../utils/common';

const XIcon = require('../../assets/icons/links/x_icon.svg').default;
const KakaoIcon = require('../../assets/icons/links/kakao_icon.svg').default;
const FacebookIcon = require('../../assets/icons/links/facebook_icon.svg').default;
const InstagramIcon = require('../../assets/icons/links/instagram_icon.svg').default;
const LinkIcon = require('../../assets/icons/links/default_link_icon.svg').default;
const AddIcon = require('../../assets/icons/links/+_icon.svg').default;

const RegisterCardItem = () => {
  const {formData, updateFormData, resetFormData, step, setStep, isMyCard} = useMakeCardStore();
  
  const {openBottomSheet, links, setLinks, setSelectedUrl} = useLinkBottomSheetStore();
  const {
    openBottomSheet: openCardSubmitBottomSheet,
    setOnSubmit,
    setOnCreateMobileCard,
  } = useCardSubmitBottomSheetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {refetch} = useQuery({queryKey:['myCards'], queryFn: fetchMyCardList});
  const {mutate: createMyCard} = useMutation({
    mutationFn: CreateMyCardAPI,
  });
  const {mutate: createCard} = useMutation({
    mutationFn: CreateCardAPI,
  });
  const {mutate: createCardTemp} = useMutation({
    mutationFn: CreateCardTempAPI,
  });
  const navigation = useNavigation();

  useEffect(() => {
    setOnSubmit(handleSubmit);
    setOnCreateMobileCard(handleCreateMobileCard);
  }, [formData]);

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

  const OpenCardSubmitSheet = () => {
    if (
      !formData.name ||
      !formData.corporation ||
      !formData.tel ||
      !formData.email
    ) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }
    const phoneNumber = formData.tel.replace(/[^0-9]/g, ''); // 숫자만 남기기
    if (phoneNumber.length < 9 || phoneNumber.length > 11) {
      Alert.alert('입력 오류', '유효한 연락처를 입력해주세요.');
      return;
    }
    const randomColor = getRandomColor();
    updateFormData('brColor', randomColor);
    updateFormData('background', 'COLOR');
    console.log({isMyCard});
    if (isMyCard) {
      openCardSubmitBottomSheet();
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Create Card
    if (isMyCard) {
      createMyCard(
        {...formData, isFinalInput: false},
        {
          onSuccess: () => {
            refetch();
            setStep(step + 1);
          },
          onError: () => {
            Alert.alert('오류', '카드 생성에 실패했습니다.');
          },
        },
      ); // formData를 사용하여 카드 생성 요청
    } else {
      createCard(
        {...formData, isFinalInput: false},
        {
          onSuccess: () => {
            setStep(step + 1);
          },
          onError: () => {
            Alert.alert('오류', '카드 생성에 실패했습니다.');
          },
        },
      );
    }
  };

  const handleCreateMobileCard = () => {
    // Create Mobile Temp
    console.log('Create Mobile Temp', formData);
    createCardTemp(formData, {
      onSuccess: () => {
        navigation.navigate('RegisterCard', {isMyCard});
      },
      onError: () => {
        Alert.alert('오류', '카드 생성에 실패했습니다.');
      },
    }); // formData를 사용하여 카드 생성 요청
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={{uri: formData.realCardImg}}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <View style={styles.inputContainer}>
          <Text style={[textStyles.M6, styles.label]}>이름 *</Text>
          <TextInput
            style={[styles.input, textStyles.M3]}
            placeholder="홍길동"
            placeholderTextColor={colors.G08}
            value={formData.name}
            onChangeText={value => updateFormData('name', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M6, styles.label]}>회사명 *</Text>
          <TextInput
            style={[styles.input, textStyles.M3]}
            placeholder="회사명을 입력해주세요"
            placeholderTextColor={colors.G08}
            value={formData.corporation}
            onChangeText={value => updateFormData('corporation', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M6, styles.label]}>직책</Text>
          <TextInput
            style={[styles.input, textStyles.M3]}
            placeholder="직책을 입력해주세요"
            placeholderTextColor={colors.G08}
            value={formData.title}
            onChangeText={value => updateFormData('title', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M6, styles.label]}>주소</Text>
          <TextInput
            style={[styles.input, textStyles.M3]}
            placeholder="주소를 입력해주세요"
            placeholderTextColor={colors.G08}
            value={formData.address}
            onChangeText={value => updateFormData('address', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M6, styles.label]}>연락처 *</Text>
          <TextInput
            style={[styles.input, textStyles.M3]}
            placeholder="ex) 010-1234-5678"
            placeholderTextColor={colors.G08}
            value={formData.tel}
            onChangeText={value => updateFormData('tel', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M6, styles.label]}>이메일 *</Text>
          <TextInput
            style={[styles.input, textStyles.M3]}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor={colors.G08}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={value => updateFormData('email', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[textStyles.M6, styles.label]}>링크 추가</Text>
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
            <TouchableOpacity onPress={AddLink}>
              <AddIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}>
              <Text style={[textStyles.M3, {color: colors.White}]}>재촬영</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={OpenCardSubmitSheet}>
              <Text style={[textStyles.M3, {color: colors.White}]}>다음</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <AddLinkModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(url: string) => {
          setLinks(url);
        }}
      />
    </KeyboardAvoidingView>
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
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#bebebe',
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 12,
    width: '100%',
  },
  label: {
    color: colors.G09,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(53, 53, 53, 0.4)',
    borderRadius: 4,
    padding: 16,
    height: 52,
    color: colors.White
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
    // justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 4,
    gap: 5,
  },
  cancelButton: {
    backgroundColor: '#252525',
    height: 42,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: colors.Primary,
    height: 42,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
