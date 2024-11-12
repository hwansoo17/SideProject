import React, { FC } from "react";
import { Button, Linking, Pressable, Text, TouchableOpacity, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { fetchCardList } from "../../api/card";
import { colors, textStyles } from "../../styles/styles";
import useTabBarVisibilityStore from "../../store/useTabBarVisibilityStore";
import { Image } from "react-native-svg";

const EditIcon = require('../../assets/buttonIcon/EditIcon.svg').default;
const SettingIcon = require('../../assets/buttonIcon/SettingIcon.svg').default;
const PhoneIcon = require('../../assets/buttonIcon/PhoneIcon.svg').default;
const MailIcon = require('../../assets/buttonIcon/MailIcon.svg').default;
const GridIcon = require('../../assets/buttonIcon/GridIcon.svg').default;
const ListIcon = require('../../assets/buttonIcon/ListIcon.svg').default;
const LogoIcon = require('../../assets/icons/LogoIcon.svg').default;
interface Props {
  navigation: NavigationProp<any>;
}

const Chip: React.FC<{text: string, isSelected: boolean, onPress: () => void }> = ({text, isSelected, onPress}) => {
  return (
    <TouchableOpacity 
      style={{
        backgroundColor: isSelected? colors.Primary : undefined , 
        borderRadius: 100, 
        paddingHorizontal:20, 
        paddingVertical:10, 
        borderColor: isSelected ? colors.Primary : 'rgba(142, 142, 151, 0.4)', 
        borderWidth: 1
      }}
      onPress={onPress}
    >
      <Text style={[textStyles.R3, {color: colors.White}]}>{text}</Text>
    </TouchableOpacity>
  );
}

const StorageMain: React.FC<Props> = ({navigation}) => {
  // const {isLoading, isError, data: data, error} = useQuery({queryKey:['cards'], queryFn: fetchCardList});
  const {showTabBar, hideTabBar, isTabBarVisible} = useTabBarVisibilityStore();
  const [settingVisible, setSettingVisible] = React.useState(false);
  const [isName, setIsName] = React.useState(false);
  const [isGrid, setIsGrid] = React.useState(false);
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
      setSettingVisible(!settingVisible);
    } else {
      showTabBar();
      setSettingVisible(!settingVisible);
    }
  }

  const renderList = () => (
    <FlatList
      key={isGrid ? 'grid' : 'list'}
      data={data}
      ListHeaderComponent={<View style={{height:12}}/>}
      ListFooterComponent={<View style={{height:10}}/>}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            height: 77,
            backgroundColor: item.brColor,
            borderRadius: 4,
            marginHorizontal: 20,
          }}
          onPress={() => {
            Linking.openURL(`sideproject://storage/Detail/${item.id}`);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={[textStyles.R3, { color: colors.G11 }]}>{item.corporation}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[textStyles.M3, { color: colors.White }]}>{item.name}</Text>
                <View
                  style={{
                    width: 1,
                    height: 8,
                    backgroundColor: colors.White,
                    marginHorizontal: 8,
                  }}
                />
                <Text style={[textStyles.M3, { color: colors.White }]}>{item.tel}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <TouchableOpacity
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PhoneIcon />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MailIcon />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
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
        renderItem={({ item }) => {
          if (item.id === 'placeholder') {
            // 빈 아이템은 렌더링하지 않음
            return <View style={{ flex: 1, height: 200 }} />;
          }
  
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                height: 200,
                backgroundColor: item.brColor,
                borderRadius: 4,
              }}
              onPress={() => {
                Linking.openURL(`sideproject://storage/Detail/${item.id}`);
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  padding: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {item.logoImg ? (
                  <Image src={item.logoImg} style={{ width: 33, height: 33 }} />
                ) : (
                  <LogoIcon />
                )}
                <View style={{ gap: 4 }}>
                  <Text style={[textStyles.R3, { color: colors.G11, textAlign: 'center' }]}>
                    {item.corporation}
                  </Text>
                  <Text style={[textStyles.SB1, { color: colors.White, textAlign: 'center' }]}>
                    {item.name}
                  </Text>
                </View>
                <Text style={[textStyles.R2, { color: colors.G12 }]}>{item.tel}</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <TouchableOpacity
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PhoneIcon />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MailIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        
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
          <Chip text="이름" isSelected={isName} onPress={() => setIsName(true)}/>
          <View style={{width:8}}/>
          <Chip text="회사명" isSelected={!isName} onPress={() => setIsName(false)}/>
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
      paddingHorizontal:20,
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
      <TouchableOpacity>
        <Text style={[textStyles.R1, {color:colors.White}]}>
          전체 선택
        </Text>
      </TouchableOpacity>
      <View style={{flex:1}}/>
      <TouchableOpacity>
        <Text style={[textStyles.R1, {color:colors.Red}]}>
          삭제
        </Text>
      </TouchableOpacity>
      
    </View>
    }
    </LinearGradient>
  );
}

export default StorageMain;