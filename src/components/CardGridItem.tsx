import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, Linking, Image } from 'react-native';
import { colors, textStyles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// SVG 파일 import
const LogoIcon = require('../assets/icons/LogoIcon.svg').default;
const PhoneIcon = require('../assets/buttonIcon/PhoneIcon.svg').default;
const MailIcon = require('../assets/buttonIcon/MailIcon.svg').default;
const Check = require('../assets/icons/Check.svg').default;

type Item = {
  id: number | string;
  brColor: string;
  corporation: string;
  name: string;
  tel: string;
  logoImg?: string;
};

type GridItemProps = {
  item: Item;
  settingVisible: boolean;
  setSelectedIds: React.Dispatch<React.SetStateAction<(number | string)[]>>;
  selectedIds: (number | string)[];
};

const CardGridItem: React.FC<GridItemProps> = ({ 
  item,  
  settingVisible, 
  setSelectedIds, 
  selectedIds  
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  if (item.id === 'placeholder') {
    // Placeholder 아이템은 렌더링하지 않음
    return <View style={{ flex: 1, height: 200 }} />;
  }

  const isSelected = selectedIds.includes(item.id);

  useEffect(() => {
    if (!settingVisible) {
      setSelectedIds([]); // 설정 모드 해제 시 선택 초기화
    }
  }, [settingVisible, setSelectedIds]);

  const toggleSelection = (id: number | string) => {
    setSelectedIds((prev: (number | string)[]) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 200,
        backgroundColor: item.brColor,
        borderRadius: 4,
      }}
      onPress={() => {
        if (settingVisible) {
          toggleSelection(item.id);
        } else {
          navigation.navigate('StorageDetail', { item: item });
          // Linking.openURL(`sideproject://storage/Detail/${item}`);
        }
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
        {settingVisible && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              borderRadius: 100,
              height: 17,
              width: 17,
              borderWidth: 1,
              borderColor: isSelected ? colors.Primary : colors.G10,
              backgroundColor: isSelected ? colors.Primary : undefined,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isSelected && <Check />}
          </View>
        )}
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
