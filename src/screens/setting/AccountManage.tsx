import React from "react";
import { Button, Dimensions, Linking, Text, Touchable, TouchableOpacity, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { colors, textStyles } from "../../styles/styles";
import CustomHeader from "../../components/CustomHeader";

interface Props {
  navigation: NavigationProp<any>;
}

interface SettingItemProps {
  title: string;
  onPress: () => void;
}

const AccountManage: React.FC<Props> = ({navigation}) => {

  const ListItem: React.FC<SettingItemProps> = ({title, onPress}) => {
    return (
      <View
        style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20, paddingVertical:12}}>
        <Text style={[textStyles.M3, {color:colors.G11, fontSize:13}]}>
          {title}
        </Text>
        <TouchableOpacity
          style={{paddingHorizontal:8, paddingVertical:4}}
          onPress={onPress}
        >
          <Text style={[textStyles.R3, {color:colors.G11, fontSize:13}]}>
            변경
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const profileEditList: SettingItemProps[] = [
    { title: "이메일 주소", onPress: () => {navigation.navigate("EmailChange")} },
    { title: "비밀번호", onPress: () => {navigation.navigate("PasswordChange")} },
  ];

  return (
    <View style={{flex:1, backgroundColor: colors.BG}}>
      <CustomHeader title="계정/정보관리" />
      {profileEditList.map((item, index) => (<ListItem key={index} title={item.title} onPress={item.onPress}/>))}
    </View>
  );
}

export default AccountManage;