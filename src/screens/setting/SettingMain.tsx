import React from "react";
import { Button, Text, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import useAuthStore from "../../store/useAuthStore";

interface Props {
  navigation: NavigationProp<any>;
}

const SettingMain: React.FC<Props> = ({navigation}) => {

  const logout = useAuthStore((state) => state.logout);
  return (
    <View style={{flex:1, backgroundColor: '#282828'}}>
      <View style={{flex:1}}>
        <Text>SettingMain</Text>
        <View style={{flex:1}}/>
        <Button title="logout" onPress={() => {logout()}} />
      </View>
    </View>
  );
}

export default SettingMain;