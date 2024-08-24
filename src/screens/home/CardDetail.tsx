import React from "react";
import { Button, Text, View } from "react-native";

const CardDetail: React.FC<{route:any}> = ({route}) => {

  const item = route.params.item;

  return (
    <View>
      <Text>CardDetail {item.id}</Text>
    </View>
  );
}

export default CardDetail;