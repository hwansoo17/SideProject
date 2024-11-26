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
} from 'react-native';
import { colors } from '../../styles/styles';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateCardAPI, GetCardTempAPI } from '../../api/card';
import { CreateMyCardAPI } from '../../api/myCard';
import useMakeCardStore, { useConfigTabStore, useLogoSearchStore } from '../../store/useMakeCareStepStore';
import RegisterCustomCardImage from '../../components/RegisterCard/RegisterCustomCardImage';
import RegisterCustomCardInfo from '../../components/RegisterCard/RegisterCustomCardInfo';
import { TextInput } from 'react-native-gesture-handler';

interface INav extends NavigationProp<any> {
  popToTop: () => void;
}

const SearchIcon = require('../../assets/icons/search.svg').default;
const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const Search: React.FC = () => {
  const navigation = useNavigation<INav>();
  const {search, setSearch} = useLogoSearchStore();
  
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleBack = () => {
    navigation.goBack();
  };

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
          onBlur={handleBack} // 포커스가 풀릴 때 이벤트 추가
        />
        <View style={styles.searchIcon}>
          <TouchableOpacity onPress={handleBack}>
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        
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
  searchIcon: {
    position: 'absolute',
    right: 32,
    top: 20,
  },
});

export default Search;
