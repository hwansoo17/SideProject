import React from "react";
import { Button, Text, View } from "react-native";

const MyCardMain: React.FC<{ navigation: any }> = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor: '#282828'}}> 
      <View style={{flex:1}}>
        <Text>my card Main</Text>
        <Button title="Go to My card Detail" onPress={() => {navigation.navigate('MyCardDetail')}} />
      </View>
    </View>
  );
}

export default MyCardMain;