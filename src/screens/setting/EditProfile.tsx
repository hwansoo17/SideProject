import React from "react";
import { Button, Dimensions, Linking, Text, Touchable, TouchableOpacity, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import useAuthStore from "../../store/useAuthStore";
import { colors, textStyles } from "../../styles/styles";
import SettingBoard from "../../components/SettingBoard";
import CustomHeader from "../../components/CustomHeader";
import StorageStatusBar from "../../components/StorageStatusBar";
import { FlatList } from "react-native-gesture-handler";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyCardList } from "../../api/myCard";
import RadioButton from "../../components/RadioButton";

const ArrowIcon = require('../../assets/icons/ArrowIcon.svg').default;

const {width} = Dimensions.get('window');
interface Props {
  navigation: NavigationProp<any>;
}

interface SettingItemProps {
  title: string;
  onPress: () => void;
  isNavigated: boolean;
}

interface RadioItemProps {
  title: string;
  onPress: () => void;
  firstState: boolean;
}

const ListItem: React.FC<SettingItemProps> = ({title, onPress, isNavigated}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20, paddingVertical:12}}>
      <Text style={[textStyles.M3, {color:colors.G11, fontSize:13}]}>
        {title}
      </Text>
      {isNavigated && <ArrowIcon width={16} height={16} color={colors.G11}/>}
    </TouchableOpacity>
  );
}

const RadioItem: React.FC<RadioItemProps> = ({title, onPress, firstState}) => {
  return (
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20, paddingVertical:12}}>
      <Text style={[textStyles.M3, {color:colors.G11, fontSize:13}]}>
        {title}
      </Text>
      <RadioButton onPress={onPress} firstState={firstState}/>
    </View>
  )
}


const EditProfile: React.FC<Props> = ({navigation}) => {
  
  const logout = useAuthStore((state) => state.logout);

  const RadioList: RadioItemProps[] = [
    { title: "알림 설정", onPress: () => {}, firstState: true },
    { title: "마케팅 수신 동의", onPress: () => {}, firstState: true }  ,
  ];
  const queryClient = useQueryClient();

  const profileEditList: SettingItemProps[] = [
    { title: "계정/정보관리", onPress: () => {navigation.navigate("AccountManage")}, isNavigated: true },
    { title: "카드 액션 변경", onPress: () => {}, isNavigated: false },
    { title: "로그아웃", onPress: () => {logout(); queryClient.removeQueries();}, isNavigated: false },
    { title: "캐시 데이터 삭제", onPress: () => {}, isNavigated: false },
    { title: "회원탈퇴", onPress: () => {}, isNavigated: false }
  ];
  return (
    <View style={{flex:1, backgroundColor: colors.BG}}>
      <CustomHeader title="프로필 편집" />
      <RadioItem title="알림 설정" onPress={() => {}} firstState={true} />
      <RadioItem title="마케팅 수신 동의" onPress={() => {}} firstState={true} />
      {profileEditList.map((item, index) => (<ListItem key={index} title={item.title} onPress={item.onPress} isNavigated={item.isNavigated}/>))}
    </View>
  );
}

export default EditProfile;