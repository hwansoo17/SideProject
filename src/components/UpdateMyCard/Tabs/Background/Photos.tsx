import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../../styles/styles';
import useUpdateCardStore from '../../../../store/useUpdateCardStore';
import {useBgImgBottomSheetStore} from '../../../../store/useBottomSheetStore';

const DelIcon = require('../../../../assets/icons/close_icon.svg').default;

const Photos = () => {
  const {formData, updateFormData} = useUpdateCardStore();
  const {openBottomSheet} = useBgImgBottomSheetStore();

  const handleDelete = () => {
    updateFormData('bgImg', '');
    updateFormData('background', 'COLOR');
  };

  const handleChange = () => {
    openBottomSheet();
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: formData.bgImg}} style={styles.image} />
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <DelIcon width={20} height={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.changeButton} onPress={handleChange}>
            <Text style={{color: colors.White}}>변경하기</Text>
          </TouchableOpacity>
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
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  changeButton: {
    position: 'absolute',
    bottom: 42,
    left: 15,
    width: 80,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Primary,
    zIndex: 1,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 80,
    left: 80,
    width: 20,
    height: 20,
    zIndex: 1,
  },
});

export default Photos;
