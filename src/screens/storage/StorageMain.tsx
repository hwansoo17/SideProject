import React, { FC, useEffect } from "react";
import { Button, Linking, Pressable, Text, TouchableOpacity, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { colors, textStyles } from "../../styles/styles";
import useTabBarVisibilityStore from "../../store/useTabBarVisibilityStore";
import { Image } from "react-native-svg";
import useCardList from "../../hooks/queries/useCardList";
import CustomChip from "../../components/CustomChip";
import CardListItem from "../../components/CardListItem";
import CardGridItem from "../../components/CardGridItem";

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
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  
  useEffect(() => {
    console.log(selectedIds);
  }
  , [selectedIds]);

  // const {isLoading, isError, data: data = [], error} = useCardList(isName);
    
  const {isLoading, isError, data: data = [], error} = useQuery<any[]>({
    queryKey:['myCards'],
    select: (data) => {
      // 정렬 로직 적용
      return [...data].sort((a, b) =>
        isName
          ? a.name.localeCompare(b.name) // 이름 순 정렬
          : a.corporation.localeCompare(b.corporation) // 회사명 순 정렬
      );
    }
  });

  const pressSetting = () => {
    if (isTabBarVisible) {
      hideTabBar();
      setSettingVisible(true);
    } else {
      showTabBar();
      setSettingVisible(false);
    }
  }

  const renderList = () => (
    <FlatList
      key={isGrid ? 'grid' : 'list'}
      data={data}
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
    const adjustedData = data.length % 2 !== 0 ? [...data, { id: 'placeholder' }] : data; // 홀수일 때 빈 아이템 추가
    
    return (
      <FlatList
        key={isGrid ? 'grid' : 'list'}
        data={adjustedData}
        numColumns={2} // 그리드 형태
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        ListHeaderComponent={<View style={{height:12}}/>}
        ListFooterComponent={<View/>}
        columnWrapperStyle={{ justifyContent: 'space-between', gap:10 }} // 가로 간격 설정
        renderItem={({ item }) => (<CardGridItem item={item}/>)}
        
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }

  return (
    <LinearGradient 
    style={{flex:1}}
    colors={['#282828', '#070707']}
    start= {{x: 0, y: -0.1}}
    end={{x: 0, y:0.8}}
    >
    <View style={{flex:1}}>
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:24, paddingVertical:16}}>
        <Text style={{fontFamily:'Pretendard-SemiBold', fontSize:28, color:'#fff'}}>보관함</Text>
        <View style={{flex:1}}/>
        <Pressable onPress={() => {navigation.navigate("AddCard")}}>
          <EditIcon/>
        </Pressable>
        <View style={{width:16}}/>
        <Pressable onPress={() => {pressSetting()}}>
          <SettingIcon/>
        </Pressable>
      </View>
      <View style={{paddingHorizontal: 20, gap:16}}>
        <View>
          <View style={{height:41, backgroundColor:'rgba(255, 255, 255, 0.05)', borderRadius:4}}>
            <TextInput
              style={{flex:1, padding:12, color:colors.White}}
              placeholder="검색어를 입력해주세요"
              placeholderTextColor={colors.G08}
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
            {isGrid ? <GridIcon/> : <ListIcon/>}
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
      <TouchableOpacity style={{padding:20}}>
        <TrashCanIcon/>
      </TouchableOpacity>
      
    </View>
    }
    </LinearGradient>
  );
}

export default StorageMain;