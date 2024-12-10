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
import {colors} from '../../styles/styles';


const RegisterComplete: React.FC = () => {
  const {resetStep, formData} = useMakeCardStore();
  const navigation = useNavigation<any>();
  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>명함이 성공적으로 저장되었습니다!</Text>
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
            navigation.navigate('HomeMain');
          }}>
          <Text style={styles.buttonText}>홈으로</Text>
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
    width: '100%',
    height: Dimensions.get('window').width * (184 / 343),
    marginVertical: 20,
  },
  ImageBox: {
    width: '100%',
    height: Dimensions.get('window').width * (184 / 343),
    marginVertical: 20,
    backgroundColor: '#bebebe',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
  homeButton: {
    backgroundColor: colors.G03,
    width: 150,
    height: 40,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default RegisterComplete;
