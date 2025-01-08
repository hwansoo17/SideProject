import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useMakeCardStore from '../../store/useMakeCareStepStore';
import {colors, textStyles} from '../../styles/styles';


const RegisterComplete: React.FC = () => {
  const {resetStep, formData, isMyCard} = useMakeCardStore();
  const navigation = useNavigation<any>();
  
  return (
    <View style={styles.container}>
      <Text style={[textStyles.B2, {color: colors.White, marginTop: 24}]}>명함이 성공적으로 저장되었습니다!</Text>
      <>
        {formData.realCardImg ? (
          <Image source={{uri: formData.realCardImg}} style={styles.image} />
        ) : (
          <View style={styles.ImageBox} />
        )}
      </>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            resetStep();
            if (isMyCard) {
              navigation.navigate('HomeMain');
            } else {
              navigation.navigate('StorageMain');
            }
          }}>
          <Text style={[textStyles.M3, {color: colors.White}]}>{isMyCard ? '홈으로' : '보관함으로'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    // width: '100%',
    // height: Dimensions.get('window').width * (184 / 343),
    width: 273,
    height: 150,
    borderRadius: 4,
    marginVertical: 53,
  },
  ImageBox: {
    // width: '100%',
    // height: Dimensions.get('window').width * (184 / 343),
    width: 273,
    height: 150,
    marginVertical: 53,
    backgroundColor: '#bebebe',
    borderRadius: 4,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  homeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 165,
    height: 42,
    borderRadius: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterComplete;
