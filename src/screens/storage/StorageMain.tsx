import React from "react";
import { Button, Text, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>;
}

const StorageMain: React.FC<{ navigation: any }> = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        <Text>Storage Main</Text>
        <View style={{flex:1}}/>
        <Button title="Go to Storage Detail" onPress={() => {navigation.navigate("storageDetail")}} />
      </View>
      <View style={{ height: 73 }} />
    </View>
  );
}

export default StorageMain;