import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import {postPresignedUrl, putS3upload} from '../../api/upload';
import {getSrcFromStorage} from '../../utils/common';
import {useNavigation} from '@react-navigation/native';
import useMakeCardStore from '../../store/useMakeCareStepStore';

interface IRegisterComplete {
  image: string;
}

const RegisterComplete: React.FC<IRegisterComplete> = ({image}) => {
  const {step, setStep, resetStep} = useMakeCardStore();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>명함이 성공적으로 저장되었습니다!</Text>
      <>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <View style={styles.ImageBox} />
        )}
      </>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('HomeMain')}>
          <Text>홈으로 이동</Text>
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
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
  cancelButton: {
    backgroundColor: '#fff',
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#fff',
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterComplete;
