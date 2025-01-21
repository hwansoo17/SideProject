import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Linking, ImageBackground } from 'react-native';
import { colors, palette } from '../styles/styles';
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
  return (
    <View style={{aspectRatio:0.7, borderRadius:12, overflow:'hidden', backgroundColor:brColor}}>
      {background == 'COLOR' &&
      <View>
        <View style={[styles.upperBackground, { backgroundColor: brColor }]}>
          <View style={styles.upperLayer}>
            <View>
              <View style={{ width: 53, height: 53, borderRadius: 100, overflow: 'hidden', backgroundColor: colors.White }}>
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
                <TouchableOpacity 
                  key={index}
                  onPress={() => Linking.openURL(link)}>
                  {link.startsWith('https://x.com') ? <XIcon /> :
                  link.startsWith('https://kakao.com') ? <KakaoIcon /> :
                  link.startsWith('https://facebook.com') ? <FacebookIcon /> :
                  link.startsWith('https://instagram.com') ? <InstagramIcon /> :
                  <LinkIcon />}
                </TouchableOpacity>
              ))}
            </View>
          </View> 
        </View>
        <View style={[styles.lowerBackground, { backgroundColor: brColor }]}>
          <View style={styles.lowerLayer}>
            <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 24, color: '#fff' }}>
              {name}
            </Text>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <PhoneIcon width={24} height={24}/>
              <View style={{ width: 4 }} />
              <Text style={{ fontFamily: 'Pretendard-Light', fontSize: 18, color: '#fff' }}>
                {tel}
              </Text>
            </View>
            <View style={{ height: 4 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MailIcon width={24} height={24}/>
              <View style={{ width: 4 }} />
              <Text style={{ fontFamily: 'Pretendard-Light', fontSize: 18, color: '#fff' }}>
                {email}
              </Text>
            </View>
          </View>
        </View>
      </View>}
      {(background == 'IMAGE' || background == 'GRADIENT') &&
      <ImageBackground
        src={bgImg}
        style={{flex:1}}
      >
        <View>
          <View style={[styles.upperBackground]}>
            <View style={styles.upperLayer}>
              <View>
                <View style={{ width: 53, height: 53, borderRadius: 100, overflow: 'hidden', backgroundColor: colors.White }}>
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
                  <TouchableOpacity 
                    key={index}
                    onPress={() => Linking.openURL(link)}>
                    {link.startsWith('https://x.com') ? <XIcon /> :
                    link.startsWith('https://kakao.com') ? <KakaoIcon /> :
                    link.startsWith('https://facebook.com') ? <FacebookIcon /> :
                    link.startsWith('https://instagram.com') ? <InstagramIcon /> :
                    <LinkIcon />}
                  </TouchableOpacity>
                ))}
              </View>
            </View> 
          </View>
          <View style={[styles.lowerBackground]}>
            <View style={styles.lowerLayer}>
              <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 24, color: '#fff' }}>
                {name}
              </Text>
              <View style={{ flex: 1 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <PhoneIcon width={24} height={24}/>
                <View style={{ width: 4 }} />
                <Text style={{ fontFamily: 'Pretendard-Light', fontSize: 18, color: '#fff' }}>
                  {tel}
                </Text>
              </View>
              <View style={{ height: 4 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MailIcon width={24} height={24}/>
                <View style={{ width: 4 }} />
                <Text style={{ fontFamily: 'Pretendard-Light', fontSize: 18, color: '#fff' }}>
                  {email}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      }
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
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 24,
    flexDirection: 'row',
  },
  lowerBackground: {
    width: '100%',
    height: '30%',
  },
  lowerLayer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    paddingBottom:27
  },
  linkContainer: {
    gap: 8,
    justifyContent: 'flex-end',
  },
});

export default Card;