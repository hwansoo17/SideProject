import React, { useRef, useState } from "react";
import { Alert, Button, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CustomHeader from "../../components/CustomHeader";
import { colors, textStyles } from "../../styles/styles";
import Card from "../../components/Card";
import ToggleSegment from "../../components/ToggleSegment";
import useToggleStore from "../../store/useToggleStore";
const EditIcon = require('../../assets/buttonIcon/EditIcon.svg').default;
const XIcon = require('../../assets/icons/links/x_icon.svg').default;
const KakaoIcon = require('../../assets/icons/links/kakao_icon.svg').default;
const FacebookIcon = require('../../assets/icons/links/facebook_icon.svg').default;
const InstagramIcon = require('../../assets/icons/links/instagram_icon.svg').default;
const LinkIcon = require('../../assets/icons/links/default_link_icon.svg').default;

interface InfoItemProps {
  title: string;
  content: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, content }) => {
  return (
    <View style={{backgroundColor:'rgba(255, 255, 255, 0.05)',padding:16, borderRadius:8, flexDirection:'row', justifyContent:'space-between' }}> 
      <Text style={[textStyles.M3, {color:colors.White}]}>
        {title}
      </Text>
      <Text style={[textStyles.M3, {color:colors.White}]}>
        {content}
      </Text>
    </View>
  )
}

const StorgeDetail: React.FC<{ route: any }> = ({route}) => {
  const item = route.params.item;
  
  const {selectedOption} = useToggleStore();


  console.log(item);
  return (
    <View style={{backgroundColor: colors.BG, flex:1}}>
      <CustomHeader title="" headerRight={<EditIcon/>}/>
      <ScrollView>
        <ToggleSegment/>
        <Text>Storage Detail</Text>
        <View style={{paddingHorizontal:20, gap:24}}>
          {selectedOption == "모바일" ?
          <Card 
            name={item.name}
            corporation={item.corporation}
            tel={item.tel}
            email={item.email}
            title={item.title}
            links={item.links}
          /> 
          :
          <View>
            <Image src={item.realCardImg} style={{width:'100%'}}/>
            <Text style={{color:colors.White}}>{item.realCardImg}</Text>
          </View>
          }
          <Text style={[textStyles.M1, {color:colors.White}]}>
            정보
          </Text>
          <View style={{gap:8}}>
            <InfoItem title="이름" content={item.name}/>
            <InfoItem title="회사명" content={item.corporation}/>
            <InfoItem title="직무" content={item.title}/>
            <InfoItem title="연락처" content={item.tel}/>
            <InfoItem title="이메일" content={item.email}/>
          </View>
          <View style={{flexDirection: 'row'}}>
            {item.links.map((link: string, index: number) => (
              <TouchableOpacity onPress={() => Linking.openURL(link)}>
                {link.startsWith('https://x.com') ? <XIcon key={index} /> :
                link.startsWith('https://kakao.com') ? <KakaoIcon key={index} /> :
                link.startsWith('https://facebook.com') ? <FacebookIcon key={index} /> :
                link.startsWith('https://instagram.com') ? <InstagramIcon key={index} /> :
                <LinkIcon key={index} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>


    </View>
  );
}

export default StorgeDetail;