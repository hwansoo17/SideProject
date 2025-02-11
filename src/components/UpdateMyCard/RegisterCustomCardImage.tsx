import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import useUpdateCardStore from '../../store/useUpdateCardStore';
import Card from '../Card';


const RegisterCustomCardImage = () => {
  const {formData} = useUpdateCardStore();

  useEffect(() => {
    console.log('RegisterCustomCard', formData);
  }, [formData]);

  return (
    <View style={styles.imageContainer}>
      <View style={styles.image}>
        <Card {...formData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    marginTop: 24,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: (465 / 343) * Dimensions.get('window').width,
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default RegisterCustomCardImage;