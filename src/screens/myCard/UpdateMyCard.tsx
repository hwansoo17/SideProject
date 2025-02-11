import {NavigationProp, useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {colors} from '../../styles/styles';
import {useMutation, useQuery} from '@tanstack/react-query';

import {fetchMyCardList} from '../../api/myCard';
import {updateCard} from '../../api/card';
import useUpdateCardStore from '../../store/useUpdateCardStore';
import RegisterCustomCardImage from '../../components/UpdateMyCard/RegisterCustomCardImage';
import RegisterCustomCardInfo from '../../components/UpdateMyCard/RegisterCustomCardInfo';
import useUpdateCard from '../../hooks/mutations/useUpdateCard';

interface INav extends StackNavigationProp<any> {}

const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const UpdateMyCard = () => {
  const navigation = useNavigation<INav>();
  const {formData, setFormData, resetFormData} = useUpdateCardStore();
  
  const {refetch} = useQuery({queryKey:['myCards'], queryFn: fetchMyCardList});
  const mutateUpdateCard = useUpdateCard();
  // const {mutate: updateCardFn} = useMutation({
  //   mutationFn: updateCard,
  // });
  // const {mutate: createCard} = useMutation({
  //   mutationFn: CreateCardAPI,
  // });
  // const {mutate: createMyCard} = useMutation({
  //   mutationFn: CreateMyCardAPI,
  // });
  // const {data} = useQuery({
  //   queryKey: ['getTempCard'],
  //   queryFn: GetCardTempAPI,
  // });

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
          navigation.navigate('CardDetail', { item: formData });
        }
      }
    );
    // if (isMyCard) {
    //   createMyCard(
    //     {...formData, isFinalInput: true},
    //     {
    //       onSuccess: () => {
    //         Alert.alert('생성완료', '카드 생성이 완료되었습니다.');
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
    //         refetch();
    //         navigation.navigate('HomeMain');
    //       },
    //       onError: () => {
    //         Alert.alert('오류', '카드 생성에 실패했습니다.');
    //       },
    //     },
    //   );
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.leftIcon}>
          <BackIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        <RegisterCustomCardImage />
        <RegisterCustomCardInfo />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    // flex: 0.1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 62,
  },
  leftIcon: {
    flex: 1,
    justifyContent: 'center',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  saveButton: {
    backgroundColor: colors.Primary,
    width: 90,
    height: 40,
    borderRadius: 40,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
  },
});

export default UpdateMyCard;
