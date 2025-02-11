import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, textStyles} from '../../../styles/styles';
import useMakeCardStore, {
  useConfigTabStore,
  useLogoSearchStore,
} from '../../../store/useUpdateCardStore';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RegisterLogoModal from '../RegisterLogoModal';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  // CreateMyCardAPI, 
  fetchMyCardList
} from '../../../api/myCard';
import useUpdateCard from '../../../hooks/mutations/useUpdateCard';
// import {CreateCardAPI} from '../../../api/card';

const SearchIcon = require('../../../assets/icons/search.svg').default;
const PlusIcon = require('../../../assets/icons/small_plus.svg').default;
const DelIcon = require('../../../assets/icons/close_icon.svg').default;

interface INav extends StackNavigationProp<any> {}

const RegisterLogo = () => {
  const navigation = useNavigation<INav>();
  const [openModal, setOpenModal] = useState(false);
  const {search} = useLogoSearchStore();
  const {formData, resetFormData, updateFormData} = useMakeCardStore();
  const {refetch} = useQuery({queryKey:['myCards'], queryFn: fetchMyCardList});
  const mutateUpdateCard = useUpdateCard();

  // const {mutate: createCard} = useMutation({
  //   mutationFn: CreateCardAPI,
  // });
  // const {mutate: createMyCard} = useMutation({
  //   mutationFn: CreateMyCardAPI,
  // });
  
  const {setStep} = useConfigTabStore();

  const handleAddLogo = () => {
    setOpenModal(true);
  }

  const handleDelete = () => {
    updateFormData('bgImg', '');
    updateFormData('background', 'COLOR');
  };

  const checkFormData = () => {
    if (
      !formData.name ||
      !formData.corporation ||
      !formData.tel ||
      !formData.email
    ) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return false;
    }
    const phoneNumber = formData.tel.replace(/[^0-9]/g, ''); // 숫자만 남기기
    if (phoneNumber.length < 9 || phoneNumber.length > 11) {
      Alert.alert('입력 오류', '유효한 연락처를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!checkFormData()) return;
    const cardId = formData.id as number;
    const { id, ...cardData } = formData; 
    console.log({cardId, cardData});
    mutateUpdateCard.mutate(
      { 
        id: cardId, 
        data: cardData 
      }, 
      {
        onSuccess: () => { 
          Alert.alert('수정되었습니다');
          refetch();
          navigation.replace('CardDetail', { item: formData });
        }
      }
    );
    // console.log({isMyCard});
    // if (isMyCard) {
    //   createMyCard(
    //     {...formData, isFinalInput: true},
    //     {
    //       onSuccess: () => {
    //         Alert.alert('생성완료', '카드 생성이 완료되었습니다.');
    //         resetFormData();
    //         refetch();
    //         navigation.navigate('HomeMain');
    //       },
    //       onError: () => {
    //         Alert.alert('오류', '카드 생성에 실패했습니다.');
    //       },
    //     },
    //   );
    // } else {
    //   createCard(
    //     {...formData, isFinalInput: true},
    //     {
    //       onSuccess: () => {
    //         Alert.alert('생성완료', '카드 생성이 완료되었습니다.');
    //         resetFormData();
    //         refetch();
    //         navigation.navigate('HomeMain');
    //       },
    //       onError: (e) => {
    //         console.log(e);
    //         Alert.alert('오류', '카드 생성에 실패했습니다.');
    //       },
    //     },
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.label]}>로고</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchForUpdate')}>
            <TextInput
              style={styles.input}
              placeholder="회사명을 검색해주세요"
              placeholderTextColor={colors.G04}
              value={search}
              readOnly
              onPress={() => navigation.navigate('SearchForUpdate')}
            />
            <View style={styles.searchIcon}>
              <SearchIcon />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[textStyles.M4, styles.text, styles.center]}>로고를 찾지 못하셨나요? 직접 첨부하기</Text>
          
            {
              formData.logoImg ? 
              (<View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: formData.logoImg}} style={styles.image} />
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <DelIcon width={20} height={20} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.changeButton} onPress={handleAddLogo}>
                    <Text style={{color: colors.White}}>변경하기</Text>
                  </TouchableOpacity>
                </View>
              </View>) : (
                <View style={styles.logoContainer}>
                  <TouchableOpacity onPress={handleAddLogo} style={styles.addLogoIcon}>
                    <PlusIcon />
                  </TouchableOpacity>
              </View>
            )
          }
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setStep('CORP')}
            style={styles.backButton}
          >
            <Text style={styles.text}>뒤로</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.nextButton}>
            <Text style={styles.text}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchResultContainer}>
        <Text>검색 결과</Text>
      </View>
      <RegisterLogoModal 
        visible={openModal} 
        onClose={() => setOpenModal(false)} 
      />
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
  contentContainer: {
    marginTop: 24,
    backgroundColor: colors.G01,
    borderRadius: 8,
    padding: 16,
  },
  center: {
    flex: 1,
    textAlign: 'center',
  },
  addLogoIcon: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  changeButton: {
    position: 'absolute',
    bottom: 42,
    left: 15,
    width: 80,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Primary,
    zIndex: 1,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 80,
    left: 80,
    width: 20,
    height: 20,
    zIndex: 1,
  },
});

export default RegisterLogo;
