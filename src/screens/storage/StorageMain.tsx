import React from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";

import { NavigationProp } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

const EditIcon = require('../../assets/buttonIcon/EditIcon.svg').default;
const SettingIcon = require('../../assets/buttonIcon/SettingIcon.svg').default;
interface Props {
  navigation: NavigationProp<any>;
}

interface CarouselItem {
  id: number;
  title: string;
  color: string;
  backColor: string;
}

const data: CarouselItem[] = [
  { id: 0, title: 'Item 1', color: '#42FFC6', backColor: '#eee' },
  { id: 1, title: 'Item 2', color: '#FFB2B2', backColor: '#eee' },
  { id: 2, title: 'Item 3', color: '#fff', backColor: '#eee' },
  { id: 3, title: 'Item 4', color: '#0053F5', backColor: '#eee' },
  { id: 4, title: 'Item 5', color: '#FF9D2A', backColor: '#eee' },
  { id: 5, title: 'Item 6', color: '#0053F5', backColor: '#eee' },
  { id: 6, title: 'Item 7', color: '#FF9D2A', backColor: '#eee' },
  { id: 7, title: 'Item 8', color: '#42FFC6', backColor: '#eee' },
  { id: 8, title: 'Item 9', color: '#FF9D2A', backColor: '#eee' },
  { id: 9, title: 'Item 10', color: '#fff', backColor: '#eee' },
  { id: 10, title: 'Item 11', color: '#0053F5', backColor: '#eee' },
  { id: 11, title: 'Item 12', color: '#FFB2B2', backColor: '#eee' },
  { id: 12, title: 'Item 13', color: '#FF9D2A', backColor: '#eee' },
  { id: 13, title: 'Item 14', color: '#42FFC6', backColor: '#eee' },
  { id: 14, title: 'Item 15', color: '#0053F5', backColor: '#eee' },
];

const StorageMain: React.FC<Props> = ({navigation}) => {

  return (
    <View style={{flex:1, backgroundColor: '#282828'}}>
      <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:24, paddingVertical:16}}>
        <Text style={{fontFamily:'Pretendard-SemiBold', fontSize:28, color:'#fff'}}>보관함</Text>
        <View style={{flex:1}}/>
        <Pressable onPress={() => {navigation.navigate("AddCard")}}>
          <EditIcon/>
        </Pressable>
        <View style={{width:16}}/>
        <Pressable onPress={() => {navigation.navigate("")}}>
          <SettingIcon/>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity 
              style={{height:77, backgroundColor:item.color, margin:8, borderRadius:8}}
              onPress={() => {navigation.navigate("StorageDetail", {id: item.id})}}
            >              
              <View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                <Text style={{color:'#fff'}}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default StorageMain;