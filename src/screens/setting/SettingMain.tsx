import React from "react";
import { Button, Dimensions, Linking, Text, Touchable, TouchableOpacity, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import useAuthStore from "../../store/useAuthStore";
import { colors, textStyles } from "../../styles/styles";
import SettingBoard from "../../components/SettingBoard";
import CustomHeader from "../../components/CustomHeader";
import StorageStatusBar from "../../components/StorageStatusBar";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { fetchMyCardList } from "../../api/myCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ArrowIcon = require('../../assets/icons/ArrowIcon.svg').default;

const {width} = Dimensions.get('window');
interface Props {
  navigation: NavigationProp<any>;
}

interface SettingItemProps {
  title: string;
  pageName: string;
}

const infoList: SettingItemProps[] = [
  { title: "프로필 편집", pageName: "EditProfile" },
  { title: "자주 묻는 질문 FAQ", pageName: "FAQ" },
  { title: "서비스 이용약관", pageName: "TermsOfService" },
  { title: "개인정보 처리방침", pageName: "PrivacyPolicy" }
];




const SettingMain: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const {isLoading, isError, data: myCardList = [], error} = useQuery({queryKey:['myCards'], queryFn: fetchMyCardList});
  const logout = useAuthStore((state) => state.logout);

  const ListItem: React.FC<SettingItemProps> = ({title, pageName}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(pageName)}
        style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20, paddingVertical:12}}>
        <Text style={[textStyles.M3, {color:colors.G11, fontSize:13}]}>
          {title}
        </Text>
        <ArrowIcon width={16} height={16} color={colors.G11}/>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={{
      backgroundColor: colors.BG,
      paddingBottom: insets.bottom,
      paddingTop: insets.top
      }}>
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:24, paddingVertical:16}}>
        <Text style={{fontFamily:'Pretendard-SemiBold', fontSize:28, color:'#fff'}}>설정</Text>
        <View style={{flex:1}}/>
      </View>
      <View style={{height:24}}/>
      <View style={{gap:40}}>
        <SettingBoard 
          title="내 명함" 
          buttonTitle="내 명함 이동"
          onPressRightButton={() => {
            Linking.openURL('sideproject://myCard');
          }}>
          <View>
            <FlatList
              data={myCardList}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View style={{width:40}} />}
              ListHeaderComponent={() => <View style={{width:20}} />}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{width:width-40, backgroundColor:item.brColor, borderRadius:4, padding:20}}
                  onPress={() => {navigation.navigate('CardDetail', { item });}}>
                  <View style={{gap:4}}>
                    <Text style={[textStyles.R3, { color: colors.G11, fontSize:12 }]}>{item.corporation}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[textStyles.B4, { color: colors.White }]}>{item.name}</Text>
                      <View
                        style={{
                          width: 1,
                          height: 8,
                          backgroundColor: colors.White,
                          marginHorizontal: 8,
                        }}
                      />
                      <Text style={[textStyles.R3, { color: colors.White }]}>{item.tel}</Text>
                    </View>
                  </View>

                </TouchableOpacity>
              )}
              ListFooterComponent={() => <View style={{width:20}} />}
              onScroll={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / (width - 20));
                setCurrentIndex(index);
              }}
            />
            <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 8,
                }}>
                {myCardList.map((_, indicatorIndex) => (
                  <View
                    key={indicatorIndex}
                    style={{
                      width: currentIndex === indicatorIndex ? 12 : 6,
                      height: 6,
                      borderRadius: 4,
                      marginHorizontal: 4,
                      backgroundColor:
                        currentIndex === indicatorIndex ? colors.White : '#666',
                    }}
                  />
                ))}
              </View>
          </View>
        </SettingBoard>
        <SettingBoard 
          title="보관함" 
          buttonTitle="보관함 이동"
          onPressRightButton={() => {
            Linking.openURL('sideproject://storage');
          }}>
          <View style={{backgroundColor: '#191919', paddingVertical:20, paddingHorizontal:12, borderRadius:8, marginHorizontal:20}}>
            <StorageStatusBar />
          </View>
        </SettingBoard>
        <SettingBoard title="정보">
          <View>
          {infoList.map((item, index) => (<ListItem key={index} title={item.title} pageName={item.pageName}/>))}
          </View>
        </SettingBoard>
      </View>
    </ScrollView>
  );
}

export default SettingMain;