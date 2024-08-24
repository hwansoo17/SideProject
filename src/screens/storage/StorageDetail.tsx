import React from "react";
import { Button, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const StorgeDetail: React.FC<{ route: any }> = ({route}) => {
  const id = route.params.id;

  return (
    <View>
      <Text>Storage Detail {id}</Text>
    </View>
  );
}

export default StorgeDetail;