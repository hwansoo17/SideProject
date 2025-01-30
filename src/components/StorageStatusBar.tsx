import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { colors, textStyles } from '../styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import useCardList from '../hooks/queries/useCardList';

const WalletIcon = require('../assets/icons/wallet.svg').default;

const StorageStatusBar: React.FC = () => {

  const { data: cardList = [] } = useCardList(true);

  return (
    <View>
      <TouchableOpacity 
        style={{gap:12}}
        onPress={() => Linking.openURL('sideproject://storage')}
        >
        <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <WalletIcon />
            <View style={{width: 8}} />
            <Text style={[textStyles.SB1, {color: colors.White}]}>{cardList.length}</Text>
            <Text style={[textStyles.SB1, {color: colors.White}]}>/100</Text>
          </View>
          <View style={{borderRadius:100, paddingHorizontal:12, paddingVertical:2, backgroundColor:colors.Primary, borderWidth:1, borderColor: '#BBB0FF'}}>
            <Text style={[textStyles.M5, {color: colors.White}]}>FREE</Text>
          </View>
        </View>
        <View
          style={{
            height: 10,
            borderRadius: 100,
            backgroundColor: colors.G02,
            flexDirection: 'row',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 50/cardList.length == null ? 100 : cardList.length, y: 0}}
            colors={['#5539FF', '#D8D8FF']}
            style={{flex: cardList.length == null ? 100 : cardList.length, borderRadius: 100}}
          />
          <View style={{flex: 100-(cardList.length == null ? 100 : cardList.length)}} />
        </View>
      </TouchableOpacity>
      <View style={{height: 16}} />
      <View style={{flexDirection: 'row', alignItems:'center', gap:16, justifyContent:'center'}}>
        <TouchableOpacity style={{padding:4}}>
          <Text style={[textStyles.M5, {color: colors.G10}]}>
            명함 등록
          </Text>
        </TouchableOpacity>
        <Text style={[textStyles.M5, {color: colors.G10}]}>
          {'|'}
        </Text> 
        <TouchableOpacity style={{padding:4}}>
          <Text style={[textStyles.M5, {color: colors.G10}]}>
            플랜 구독
          </Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default StorageStatusBar;