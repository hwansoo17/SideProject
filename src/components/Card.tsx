import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { palette } from '../styles/styles';
import { getRandomColor } from '../utils/common';

const MailIcon = require('../assets/cardIcon/phone-1.svg').default;
const PhoneIcon = require('../assets/cardIcon/phone.svg').default;

const XIcon = require('../assets/icons/links/x_icon.svg').default;
const KakaoIcon = require('../assets/icons/links/kakao_icon.svg').default;
const FacebookIcon = require('../assets/icons/links/facebook_icon.svg').default;
const InstagramIcon = require('../assets/icons/links/instagram_icon.svg').default;
const LinkIcon = require('../assets/icons/links/default_link_icon.svg').default;

interface ICard {
  name?: string;
  corporation?: string;
  tel?: string;
  email?: string;
  address?: string;
  logoImg?: string;
  title?: string;
  links?: string[];
  bgImg?: string;
  brColor?: string;
  gradient?: string;
  realColor?: string;
  background?: string;
}

const Card: React.FC<ICard> = ({
  name,
  corporation,
  tel,
  email,
  address,
  logoImg,
  title,
  links = [],
  bgImg,
  brColor = getRandomColor(), // 기본값으로 랜덤 색상 설정
  gradient,
  realColor,
  background = 'COLOR',
}) => {
  console.log({brColor});
  return (
    <View style={{aspectRatio:0.7, borderRadius:12, overflow:'hidden'}}>
      <View style={[styles.upperBackground, { backgroundColor: brColor }]}>
        <View style={styles.upperLayer}>
          <View>
            <View style={{ width: 53, height: 53 }}>
              <Image src={logoImg} style={{ flex: 1, resizeMode: 'contain' }} />
            </View>
            <View style={{ flex: 1 }} />
            <View>
              <Text style={{ fontFamily: 'Pretendard-Bold', fontSize: 18, color: '#fff' }}>
              {corporation}
            </Text>
            <View style={{ height: 8 }} />
            <Text style={{ fontFamily: 'Pretendard-Regular', fontSize: 16, color: '#f2f2f2' }}>
              {title}
            </Text>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.linkContainer}>
            {links.map((link, index) => (
              link.startsWith('https://x.com') ? <XIcon key={index} /> :
              link.startsWith('https://kakao.com') ? <KakaoIcon key={index} /> :
              link.startsWith('https://facebook.com') ? <FacebookIcon key={index} /> :
              link.startsWith('https://instagram.com') ? <InstagramIcon key={index} /> :
              <LinkIcon key={index} />
            ))}
          </View>
        </View> 
      </View>
      <View style={[styles.lowerBackground, { backgroundColor: brColor }]}>
        <View style={styles.lowerLayer}>
          <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 18, color: '#fff' }}>
            {name}
          </Text>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PhoneIcon />
            <View style={{ width: 4 }} />
            <Text style={{ fontFamily: 'Pretendard-Light', fontSize: 14, color: '#fff' }}>
              {tel}
            </Text>
          </View>
          <View style={{ height: 4 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MailIcon />
            <View style={{ width: 4 }} />
            <Text style={{ fontFamily: 'Pretendard-Light', fontSize: 14, color: '#fff' }}>
              {email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperBackground: {
    width: '100%',
    height: '70%',
  },
  upperLayer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 24,
    flexDirection: 'row',
  },
  lowerBackground: {
    width: '100%',
    height: '30%',
  },
  lowerLayer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  linkContainer: {
    gap: 8,
    justifyContent: 'flex-end',
  },
});

export default Card;
