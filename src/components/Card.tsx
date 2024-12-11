import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {colors} from '../styles/styles';
import {getRandomColor} from '../utils/common';
import LinearGradient from 'react-native-linear-gradient';

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
  logoImg,
  title,
  links = [],
  bgImg,
  brColor = getRandomColor(), // 기본값으로 랜덤 색상 설정
  gradient,
  background = 'COLOR',
}) => {

  return (
    <>
      {background === 'COLOR' ? (
        <View style={[styles.background, {backgroundColor: brColor}]} />
      ) : background === 'IMAGE' ? (
        <Image source={{uri: bgImg}} style={styles.background} />
      ) : (
        background === 'GRADIENT' && (
          <>
            <View style={[styles.background, {backgroundColor: brColor}]} />
            <LinearGradient
              colors={['black', brColor, 'rgba(255,255,255,0.2)']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.background}
            />
          </>
        )
      )}
      <View style={styles.upperLayer}>
        <View>
          {logoImg && (
            <View style={styles.logoStyle}>
              <Image
                src={logoImg}
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </View>
          )}
          <View style={{flex: 1}} />
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
      <View style={[styles.lowerBackground]}>
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
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  upperBackground: {
    width: '100%',
    height: '70%',
  },
  upperLayer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 24,
    flexDirection: 'row',
    zIndex: 100,
  },
  lowerBackground: {
    width: '100%',
    height: '30%',
  },
  lowerLayer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    zIndex: 100,
  },
  linkContainer: {
    gap: 8,
    justifyContent: 'flex-end',
  },
  logoStyle: {
    width: 63,
    height: 63,
    borderRadius: 63,
    // backgroundColor: colors.White,
    overflow: 'hidden',
  },
});

export default Card;
