import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, palette } from '../../../../styles/styles';
import useMakeCardStore from '../../../../store/useMakeCareStepStore';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Gradients = () => {
  const {formData, updateFormData} = useMakeCardStore();

  const handleSelectColor = (color: string) => {
    updateFormData('background', 'GRADIENT');
    updateFormData('brColor', color);
    updateFormData('gradient', 'rgba(0,0,0,0.4)');
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>색상을 선택해주세요</Text>
        <View style={styles.paletteContainer}>
          {Object.values(palette).map((color: string) => (
            <TouchableOpacity
              key={color}
              onPress={() => handleSelectColor(color)}
              style={[styles.paletteItem, { backgroundColor: color }]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
    gap: 16,
  },
  paletteContainer: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap', // 줄바꿈을 하도록 설정
  },
  paletteItem: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.White,
  },
  text: {
    color: colors.White,
  }
});

export default Gradients;
