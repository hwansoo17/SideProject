import React, { useRef, useState } from "react";
import { Alert, Button, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import CustomHeader from "../../components/CustomHeader";
import { colors, textStyles } from "../../styles/styles";
import Card from "../../components/CardDetail";
import ToggleSegment from "../../components/ToggleSegment";
import useToggleStore from "../../store/useToggleStore";
import { SafeAreaView } from "react-native-safe-area-context";
import useUpdateCard from "../../hooks/mutations/useUpdateCard";
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

interface editInfoItemProps {
  title: string;
  content: string;
  setEditData: (data: any) => void;
  editTitle: string;
  editData: {name: string, corporation: string, title: string, tel: string, email: string};
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

const EditingInfoItem: React.FC<editInfoItemProps> = ({ title, content, setEditData, editTitle, editData }) => {
  const [value, setValue] = useState(content);
  return (
    <View style={{backgroundColor:'rgba(255, 255, 255, 0.05)',paddingHorizontal:16, borderRadius:8, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}> 
      <Text style={[textStyles.M3, {color:colors.White, paddingVertical:16}]}>
        {title}
      </Text>
      <TextInput 
        style={[textStyles.M3, {color:colors.White, textAlignVertical: 'center'}]}
        value={value}
        onChangeText={(e) => {setValue(e); setEditData({...editData, [editTitle]: e })}}
        multiline={false}
      />
    </View>
  )
}

const StorgeDetail: React.FC<{ route: any }> = ({route}) => {
  const item = route.params.item;
  const [isEdit, setIsEdit] = useState(false);
  const {selectedOption} = useToggleStore();
  const [editData, setEditData] = useState({name: item.name, corporation: item.corporation, title: item.title, tel: item.tel, email: item.email});
  const mutateUpdateCard = useUpdateCard();

  const [aspectRatio, setAspectRatio] = useState(0);

  interface ImageLoadEvent {
    nativeEvent: {
      source: {
        width: number;
        height: number;
      };
    };
  }

  const handleImageLoad = (event: ImageLoadEvent) => {
    const { width, height } = event.nativeEvent.source;
    const aspectRatio = width / height; // 원본 비율 계산
    setAspectRatio(aspectRatio); // 원하는 너비(200)에 맞는 높이 설정
  };

  console.log(item);
  return (
    <SafeAreaView style={{backgroundColor: colors.BG, flex:1}}>
      <CustomHeader 
      title="" 
      headerRight={<EditIcon/>} 
      onPressRightButton={() => {
        !isEdit ? 
        setIsEdit(!isEdit) 
        : 
        mutateUpdateCard.mutate({id:item.id, data: editData});
        setIsEdit(!isEdit);
      }
      }/>
      <ScrollView>
        <ToggleSegment/>
        <Text>Storage Detail</Text>
        <View style={{paddingHorizontal:20, gap:24}}>
          {selectedOption == "모바일" ?
          <Card 
            name={editData.name}
            corporation={editData.corporation}
            tel={editData.tel}
            email={editData.email}
            title={editData.title}
            links={item.links}
            background={item.background}
            logoImg={item.logoImg}
            bgImg={item.bgImg}
            brColor={item.brColor}
          /> 
          :
          <View>
            <Image
              source={{ uri: item.realCardImg }}
              style={{ width: '100%', aspectRatio: aspectRatio, borderRadius:12}}
              resizeMode="contain"
              onLoad={handleImageLoad}
            />
          </View>
          }
          <Text style={[textStyles.M1, {color:colors.White}]}>
            정보
          </Text>
          {isEdit? 
          <View style={{gap:8}}>
            <EditingInfoItem title="이름" content={editData.name} setEditData={setEditData} editData={editData} editTitle={'name'}/>
            <EditingInfoItem title="회사명" content={editData.corporation} setEditData={setEditData} editData={editData} editTitle={'corporation'}/>
            <EditingInfoItem title="직무" content={editData.title} setEditData={setEditData} editData={editData} editTitle={'title'}/>
            <EditingInfoItem title="연락처" content={editData.tel} setEditData={setEditData} editData={editData} editTitle={'tel'}/>
            <EditingInfoItem title="이메일" content={editData.email} setEditData={setEditData} editData={editData} editTitle={'email'}/>
          </View>
          :
          <View style={{gap:8}}>
            <InfoItem title="이름" content={editData.name}/>
            <InfoItem title="회사명" content={editData.corporation}/>
            <InfoItem title="직무" content={editData.title}/>
            <InfoItem title="연락처" content={editData.tel}/>
            <InfoItem title="이메일" content={editData.email}/>
          </View>}
          <View style={{flexDirection: 'row', paddingBottom:24}}>
            {item.links.map((link: string, index: number) => (
              <TouchableOpacity onPress={() => Linking.openURL(link)} key={index} >
                {link.startsWith('https://x.com') ? <XIcon/> :
                link.startsWith('https://kakao.com') ? <KakaoIcon/> :
                link.startsWith('https://facebook.com') ? <FacebookIcon/> :
                link.startsWith('https://instagram.com') ? <InstagramIcon/> :
                <LinkIcon/>}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default StorgeDetail;