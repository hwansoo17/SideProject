import React from "react";
import { Button, Text, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>;
}

const StorageMain: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor: '#282828'}}>
      <View style={{flex:1}}>
        <Text>Storage Main</Text>
        <View style={{flex:1}}/>
        <Button title="Go to Storage Detail" onPress={() => {navigation.navigate("storageDetail")}} />
      </View>
    </View>
  );
}

export default StorageMain;