import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { colors } from '../../styles/styles';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateCardAPI, GetCardTempAPI } from '../../api/card';
import { CreateMyCardAPI } from '../../api/myCard';
import useMakeCardStore, { useConfigTabStore, useLogoSearchStore } from '../../store/useMakeCareStepStore';
import RegisterCustomCardImage from '../../components/RegisterCard/RegisterCustomCardImage';
import RegisterCustomCardInfo from '../../components/RegisterCard/RegisterCustomCardInfo';
import { TextInput } from 'react-native-gesture-handler';
import { SearchLogoAPI } from '../../api/logo';

interface INav extends NavigationProp<any> {
  popToTop: () => void;
}

const SearchIcon = require('../../assets/icons/search.svg').default;
const BackIcon = require('../../assets/icons/BackIcon.svg').default;
const CloseIcon = require('../../assets/icons/close_icon.svg').default;

const exampleLogoList = ['삼성', '현대', '신세계', 'SK', '네이버', '카카오', '아모레퍼시픽', 'CJ', '포스코', '셀트리온'];

const Search: React.FC = () => {
  const navigation = useNavigation<INav>();
  const {search, setSearch} = useLogoSearchStore();
  const {updateFormData} = useMakeCardStore();
  const {data: logoList} = useQuery({
    queryKey: ['logoList', search],
    queryFn: () => SearchLogoAPI({query: search}),
  });
  
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectLogo = (logo: string) => {
    updateFormData('logoImg', logo);
    navigation.goBack();
  };

  const handleReset = () => {
    setSearch('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.leftIcon}>
          <BackIcon />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="회사명을 검색해주세요"
          placeholderTextColor={colors.G04}
          value={search}
          onChangeText={(value: string) => handleSearch(value)}
          // onBlur={handleBack} // 포커스가 풀릴 때 이벤트 추가
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleReset}>
            <CloseIcon width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBack}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {search !== '' ? logoList?.results.map((logo) => (
          <TouchableOpacity onPress={() => handleSelectLogo(logo.imageUrl)}>
            <View style={styles.logoItem} key={logo.id}>
              <Image source={{uri: logo.imageUrl}} style={[styles.logoImg]} />
              <Text style={{color: colors.White}}>{logo.name}</Text>
            </View>
          </TouchableOpacity>
        )) : (
          <View style={styles.exampleContainer}>
            <Text style={{color: colors.White}}>자주 검색된 회사</Text>
            <View style={styles.exampleLogoList}>
              {exampleLogoList.map((text) => 
                <TouchableOpacity onPress={() => handleSearch(text)}>
                  <View style={styles.exampleLogo}>
                    <Text style={{color: colors.White}}>{text}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
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
    flex: 0.13,
    justifyContent: 'center',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  input: {
    flex: 1,
    backgroundColor: colors.G01,
    borderRadius: 8,
    padding: 16,
    color: colors.White,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 8,
    right: 32,
    top: 20,
    alignItems: 'center',
  },
  logoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    height: 48,
  },
  logoImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    backgroundColor: colors.White,
    borderRadius: 32,
  },
  exampleContainer: {
    marginTop: 32,
  },
  exampleLogoList: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  exampleLogo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.G01,
    borderRadius: 16,
  },
});

export default Search;
