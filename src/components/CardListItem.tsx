import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { colors, textStyles } from '../styles/styles';

const PhoneIcon = require('../assets/buttonIcon/PhoneIcon.svg').default;
const MailIcon = require('../assets/buttonIcon/MailIcon.svg').default;
const Check = require('../assets/icons/Check.svg').default;

// Item 타입 정의
type Item = {
  id: number;
  corporation: string;
  name: string;
  tel: string;
  brColor: string;
};

// Props 타입 정의
type CardListItemProps = {
  item: Item;
  settingVisible: boolean;
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  selectedIds: number[];
};

const CardListItem: React.FC<CardListItemProps> = ({ 
  item, 
  settingVisible, 
  setSelectedIds, 
  selectedIds 
}) => {
  const isSelected = selectedIds.includes(item.id);

  useEffect(() => {
    if (!settingVisible) {
      setSelectedIds([]); // 설정 모드 해제 시 선택 초기화
    }
  }, [settingVisible, setSelectedIds]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <TouchableOpacity
      style={{
        height: 77,
        backgroundColor: item.brColor,
        borderRadius: 4,
        marginHorizontal: 20,
      }}
      onPress={() => {
        if (settingVisible) {
          toggleSelection(item.id);
        } else {
          Linking.openURL(`sideproject://storage/Detail/${item.id}`);
        }
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {settingVisible && (
          <View
            style={{
              borderRadius: 100,
              height: 17,
              width: 17,
              borderWidth: 1,
              borderColor: isSelected ? colors.Primary : colors.G10,
              marginRight: 16,
              backgroundColor: isSelected ? colors.Primary : undefined,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isSelected && <Check />}
          </View>
        )}
        <View>
          <Text style={[textStyles.R3, { color: colors.G11 }]}>{item.corporation}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[textStyles.M3, { color: colors.White }]}>{item.name}</Text>
            <View
              style={{
                width: 1,
                height: 8,
                backgroundColor: colors.White,
                marginHorizontal: 8,
              }}
            />
            <Text style={[textStyles.M3, { color: colors.White }]}>{item.tel}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }} />
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
            disabled={settingVisible}
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
            disabled={settingVisible}
          >
            <MailIcon />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardListItem;