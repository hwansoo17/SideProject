import React, { FC, useEffect } from "react";
import { Button, Keyboard, Linking, Pressable, Text, TouchableOpacity, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { colors, textStyles } from "../../styles/styles";
import useTabBarVisibilityStore from "../../store/useTabBarVisibilityStore";
import { Image } from "react-native-svg";
import useCardList from "../../hooks/queries/useCardList";
import CustomChip from "../../components/CustomChip";
import CardListItem from "../../components/CardListItem";
import CardGridItem from "../../components/CardGridItem";
import useDeleteCard from "../../hooks/mutations/useDeleteCard";
import koFilter from "../../utils/koFilter";

const EditIcon = require('../../assets/buttonIcon/EditIcon.svg').default;
const SettingIcon = require('../../assets/buttonIcon/SettingIcon.svg').default;
const PhoneIcon = require('../../assets/buttonIcon/PhoneIcon.svg').default;
const MailIcon = require('../../assets/buttonIcon/MailIcon.svg').default;
const GridIcon = require('../../assets/buttonIcon/GridIcon.svg').default;
const ListIcon = require('../../assets/buttonIcon/ListIcon.svg').default;
const LogoIcon = require('../../assets/icons/LogoIcon.svg').default;
const TotalSelectIcon = require('../../assets/buttonIcon/TotalSelectIcon.svg').default;
const TrashCanIcon = require('../../assets/buttonIcon/TrashCanIcon.svg').default;
interface Props {
  navigation: NavigationProp<any>;
}

const StorageMain: React.FC<Props> = ({navigation}) => {
  // const {isLoading, isError, data: data, error} = useQuery({queryKey:['cards'], queryFn: fetchCardList});
  const {showTabBar, hideTabBar, isTabBarVisible} = useTabBarVisibilityStore();
  const [settingVisible, setSettingVisible] = React.useState(false);
  const [isName, setIsName] = React.useState(false);
  const [isGrid, setIsGrid] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<(number | string)[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  // useEffect(() => {
  //   console.log(selectedIds);
  //   console.log(searchText);
  // }
  // , [selectedIds, searchText]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      hideTabBar(); // 키보드가 나타나면 탭바 숨기기
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      showTabBar(); // 키보드가 사라지면 탭바 다시 나타내기
    });

    return () => {
      keyboardDidShowListener.remove(); // 이벤트 리스너 정리
      keyboardDidHideListener.remove();
    };
  }, []);

  const {isLoading, isError, data: data = [], error} = useCardList(isName);

  const deleteCardMutation  = useDeleteCard();

  const queryClient = useQueryClient();

  const deleteSelectedCards = async () => {
    if (selectedIds.length > 0) {
      try {
        // 모든 삭제 요청을 병렬로 실행
        await Promise.all(
          selectedIds.filter((id): id is number => typeof id === 'number').map((id) =>
            deleteCardMutation.mutateAsync(id) // `mutateAsync` 사용
          )
        );
  
        console.log('All selected cards deleted successfully.');
        setSelectedIds([]); // 선택 초기화
        queryClient.invalidateQueries({ queryKey: ['cardList'] }); // 한 번만 호출
        pressSetting();
      } catch (error) {
        console.error('Error deleting selected cards:', error);
      }
    }
  };

  const pressSetting = () => {
    if (isTabBarVisible) {
      hideTabBar();
      setSettingVisible(true);
    } else {
      showTabBar();
      setSettingVisible(false);
    }
  }

  const handleSearch = (e: string) => {
    setSearchText(e);
    setFilteredData(koFilter(data, e));
  };
  const renderList = () => (
    <FlatList
      key={isGrid ? 'grid' : 'list'}
      data={filteredData.length == 0 && searchText.length == 0 ? data : filteredData}
      ListHeaderComponent={<View style={{height:12}}/>}
      ListFooterComponent={<View style={{height:10}}/>}
      renderItem={({item}) => (
        <CardListItem
          item={item}
          settingVisible={settingVisible}
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
        />
      )}
      
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );

  const renderGrid = () => {
    const adjustedData = data.length % 2 !== 0 ? [...data, { id: 'placeholder', brColor: '', corporation: '', name: '', tel: '' }] : data; // 홀수일 때 빈 아이템 추가
    const filteredAdjustedData = filteredData.length % 2 !== 0 ? [...filteredData, { id: 'placeholder', brColor: '', corporation: '', name: '', tel: '' }] : filteredData; // 홀수일 때 빈 아이템 추가
    return (
      <FlatList
        key={isGrid ? 'grid' : 'list'}
        data={filteredAdjustedData.length == 0 && searchText.length == 0 ? adjustedData : filteredAdjustedData}
        numColumns={2} // 그리드 형태
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        ListHeaderComponent={<View style={{height:12}}/>}
        ListFooterComponent={<View/>}
        columnWrapperStyle={{ justifyContent: 'space-between', gap:10 }} // 가로 간격 설정
        renderItem={({ item }) => (
          <CardGridItem 
            item={item}
            settingVisible={settingVisible}
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}  
          />
        )}
        
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }

  return (
    <View 
    style={{flex:1, backgroundColor:'#0D0D0D'}}
    >
    <View style={{flex:1}}>
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:24, paddingVertical:16}}>
        <Text style={{fontFamily:'Pretendard-SemiBold', fontSize:28, color:'#fff'}}>보관함</Text>
        <View style={{flex:1}}/>
        <TouchableOpacity onPress={() => {navigation.navigate("AddCard")}}>
          <EditIcon/>
        </TouchableOpacity>
        <View style={{width:16}}/>
        <TouchableOpacity onPress={() => {pressSetting()}}>
          <SettingIcon/>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20, gap:16}}>
        <View>
          <View style={{height:41, backgroundColor:'rgba(255, 255, 255, 0.05)', borderRadius:4}}>
            <TextInput
              style={{flex:1, padding:12, color:colors.White}}
              placeholder="검색어를 입력해주세요"
              placeholderTextColor={colors.G08}
              value={searchText}
              onChangeText={(e) => handleSearch(e)}
            />
          </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <CustomChip text="이름" isSelected={isName} onPress={() => setIsName(true)}/>
          <View style={{width:8}}/>
          <CustomChip text="회사명" isSelected={!isName} onPress={() => setIsName(false)}/>
          <View style={{flex:1}}/>
          <TouchableOpacity 
            style={{padding:5}}
            onPress={() => setIsGrid(!isGrid)}
          >
            {isGrid ? <ListIcon/> : <GridIcon/>}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontFamily:'Pretendard-Light', fontSize:12, color: colors.G10}}>{`보관된 명함 ${data.length}/100`}</Text>
        </View>
      </View>
      {isGrid ? renderGrid() : renderList()}
    </View>
    {settingVisible &&
    <View style={{
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      backgroundColor: 'rgba(44,44,44,0.8)',
      height: 73,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5}}
    >
      <TouchableOpacity 
        style={{padding:20}}
        onPress={() => {
          if (selectedIds.length === data.length) {
            // 이미 모두 선택된 경우 선택 해제
            setSelectedIds([]);
          } else {
            // 모든 아이템 선택
            setSelectedIds(data.map((item) => item.id));
          }
        }}
      >
        <TotalSelectIcon/>
      </TouchableOpacity>
      <View style={{flex:1}}>
        <Text style={[textStyles.R1, {color:colors.White, textAlign:'center'}]}>
          {selectedIds.length}개 항목 선택됨
        </Text>
      </View>
      <TouchableOpacity style={{padding:20}} onPress={deleteSelectedCards}>
        <TrashCanIcon/>
      </TouchableOpacity>
      
    </View>
    }
    </View>
  );
}

export default StorageMain;