import React from 'react';
import { Text, TouchableOpacity, View, Linking, Image } from 'react-native';
import { colors, textStyles } from '../styles/styles';

// SVG 파일 import
const LogoIcon = require('../assets/icons/LogoIcon.svg').default;
const PhoneIcon = require('../assets/buttonIcon/PhoneIcon.svg').default;
const MailIcon = require('../assets/buttonIcon/MailIcon.svg').default;

type GridItemProps = {
  item: {
    id: number | string;
    brColor: string;
    corporation: string;
    name: string;
    tel: string;
    logoImg?: string;
  };
};

const CardGridItem: React.FC<GridItemProps> = ({ item }) => {
  if (item.id === 'placeholder') {
    // Placeholder 아이템은 렌더링하지 않음
    return <View style={{ flex: 1, height: 200 }} />;
  }

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 200,
        backgroundColor: item.brColor,
        borderRadius: 4,
      }}
      onPress={() => {
        Linking.openURL(`sideproject://storage/Detail/${item.id}`);
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {item.logoImg ? (
          <Image 
          src={item.logoImg}
          style={{ width: 33, height: 33 }} />
        ) : (
          <LogoIcon />
        )}
        <View style={{ gap: 4 }}>
          <Text style={[textStyles.R3, { color: colors.G11, textAlign: 'center' }]}>
            {item.corporation}
          </Text>
          <Text style={[textStyles.SB1, { color: colors.White, textAlign: 'center' }]}>
            {item.name}
          </Text>
        </View>
        <Text style={[textStyles.R2, { color: colors.G12 }]}>{item.tel}</Text>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PhoneIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MailIcon />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardGridItem;
