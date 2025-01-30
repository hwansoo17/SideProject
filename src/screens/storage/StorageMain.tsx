import React, { FC, useEffect, useRef } from "react";
import { Button, Keyboard, Linking, Pressable, Text, TouchableOpacity, View, SectionList } from "react-native";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
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
import useMakeCardStore from "../../store/useMakeCareStepStore";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { getInitial } from "../../utils/extractInitial";
import { queryKey } from "../../hooks/queries/queryKey";

const EditIcon = require('../../assets/buttonIcon/EditIcon.svg').default;
const SettingIcon = require('../../assets/buttonIcon/SettingIcon.svg').default;
const PhoneIcon = require('../../assets/buttonIcon/PhoneIcon.svg').default;
const MailIcon = require('../../assets/buttonIcon/MailIcon.svg').default;
const GridIcon = require('../../assets/buttonIcon/GridIcon.svg').default;
const ListIcon = require('../../assets/buttonIcon/ListIcon.svg').default;
const LogoIcon = require('../../assets/icons/LogoIcon.svg').default;
const TotalSelectIcon = require('../../assets/buttonIcon/TotalSelectIcon.svg').default;
const TrashCanIcon = require('../../assets/buttonIcon/TrashCanIcon.svg').default;
const PlusIcon = require('../../assets/icons/plus.svg').default;
interface Props {
  navigation: NavigationProp<any>;
}

//인덱스 바
interface IndexBarProps {
  sections: { title: string; data: any[] }[];
  onPress: (title: string) => void;
}

const IndexBar: FC<IndexBarProps> = ({ sections, onPress }) => (
  <View style={{ position: "absolute", top:16, right: 2, backgroundColor:'rgba(255,255,255, 0.1)', paddingHorizontal:3, justifyContent:'center', alignItems:'center', borderRadius: 100, zIndex:3, gap:4, paddingVertical: 10}}>
    {sections.map((section) => (
      <TouchableOpacity
        key={section.title}
        onPress={() => onPress(section.title)} // 초성 클릭 시 동작
      >
        <Text style={[textStyles.M6, { color: colors.White}]}>
          {section.title}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const StorageMain: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {showTabBar, hideTabBar, isTabBarVisible} = useTabBarVisibilityStore();
  const {setIsMyCard} = useMakeCardStore();
  const [settingVisible, setSettingVisible] = React.useState(false);
  const [isName, setIsName] = React.useState(false);
  const [isGrid, setIsGrid] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<(number | string)[]>([]);
  const [searchText, setSearchText] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const listRef = useRef<SectionList>(null);

  useFocusEffect(
    React.useCallback(() => {
      const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
        hideTabBar();
      });
  
      const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
        settingVisible ? null : showTabBar();
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, [settingVisible])
  );
  const {isLoading, isError, data: data = [], error} = useCardList(isName);

  const deleteCardMutation  = useDeleteCard();

  const queryClient = useQueryClient();


    //초성별로 데이터를 그룹화
    const groupByInitial = (data: any[]) => {
      const grouped = data.reduce((acc, item) => {
        const initial = getInitial(isName? item.name : item.corporation); // 이름 기준으로 초성 추출
        if (!acc[initial]) acc[initial] = [];
        acc[initial].push(item);
        return acc;
      }, {} as Record<string, any[]>);
    
      return Object.keys(grouped)
        .sort() // 초성을 정렬
        .map((key) => ({ title: key, data: grouped[key] }));
    };
  
    const sections = groupByInitial(data);
    
    const scrollToSection = (sectionTitle: string) => {
      console.log(sectionTitle);
      console.log(sections);
      const index = sections.findIndex((section) => section.title === sectionTitle);
      if (index !== -1 && listRef.current) {
        console.log(index);
        listRef.current.scrollToLocation({
          sectionIndex: index, // 섹션 인덱스
          itemIndex: 0, // 섹션의 첫 번째 아이템
          animated: true, // 애니메이션 효과
        });
      }
    };

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
        queryClient.invalidateQueries({ queryKey: queryKey.cardList }); // 한 번만 호출
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
    <SectionList
      ref={listRef}
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      key={isGrid ? 'grid' : 'list'}
      data={filteredData.length == 0 && searchText.length == 0 ? data : filteredData}
      ListHeaderComponent={<View style={{height:12}}/>}
      ListFooterComponent={<View style={{height:10}}/>}
      renderSectionHeader={() => <View style={{height: 10}} />}
      renderItem={({item}) => (
        <CardListItem
          item={item}
          settingVisible={settingVisible}
          setSelectedIds={setSelectedIds}
          selectedIds={selectedIds}
        />
      )}
      // stickySectionHeadersEnabled={true}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
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
    style={{
      flex:1, 
      backgroundColor: colors.BG,
      paddingBottom: insets.bottom,
      paddingTop: insets.top,
    }}
    >
      <View style={{flex:1}}>
        <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:24, paddingVertical:16}}>
          <Text style={{fontFamily:'Pretendard-SemiBold', fontSize:28, color:'#fff'}}>보관함</Text>
          <View style={{flex:1}}/>
          <View style={{width:16}}/>
          <TouchableOpacity onPress={() => {pressSetting()}}>
            <SettingIcon/>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{paddingHorizontal: 20, gap:16, marginTop: 16}}>
            <View>
              <View style={{backgroundColor:'rgba(255, 255, 255, 0.05)', borderRadius:4}}>
                <TextInput
                  style={{ paddingHorizontal:12, paddingVertical:8, color:colors.White,}}
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
              {/* <TouchableOpacity onPress={() => {
                setIsMyCard(false); 
                navigation.navigate('AddCard');
              }}>
                <Text style={[textStyles.R4, {color: colors.G09}]}>명함추가</Text>
              </TouchableOpacity> */}
              <TouchableOpacity 
                style={{
                  gap:2,
                  flexDirection:'row',
                  borderRadius: 100, 
                  paddingHorizontal:10, 
                  paddingVertical:6, 
                  borderColor: 'rgba(142, 142, 151, 0.4)', 
                  borderWidth: 1,
                  alignItems:'center'
                }}
                onPress={() => {setIsMyCard(false); navigation.navigate("AddCard");}}
              >
                <PlusIcon/>
                <Text style={{fontFamily:'Pretendard-Medium', fontSize:11, color: colors.G09}}>명함추가</Text>
              </TouchableOpacity>
              <View style={{width:8}}/>
              <TouchableOpacity 
                style={{padding:5}}
                onPress={() => setIsGrid(!isGrid)}
              >
                {!isGrid ? <ListIcon/> : <GridIcon/>}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontFamily:'Pretendard-Light', fontSize:12, color: colors.G10}}>{`보관된 명함 ${data.length}/100`}</Text>
            </View>
          </View>
          {!isGrid && <IndexBar sections={sections} onPress={scrollToSection} />}
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