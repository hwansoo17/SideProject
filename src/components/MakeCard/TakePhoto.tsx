import React, {useRef, useState} from 'react';
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
// import {
//   launchCamera,
//   launchImageLibrary,
//   Asset,
// } from 'react-native-image-picker';
import {postPresignedUrl, putS3upload} from '../../api/upload';
import {getSrcFromStorage} from '../../utils/common';
import {useNavigation} from '@react-navigation/native';
import useMakeCardStore from '../../store/useMakeCareStepStore';
import {RNCamera} from 'react-native-camera';

const TakePhoto: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const {step, setStep, resetStep} = useMakeCardStore();
  const navigation = useNavigation();
  
  const [isCameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef<RNCamera | null>(null);

  const handleBack = () => {
    resetStep();
    navigation.goBack();
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      return Object.values(granted).every(
        permission => permission === PermissionsAndroid.RESULTS.GRANTED,
      );
    }
    return true;
  };

  // const handleSelectImage = async () => {
  //   const hasPermission = await requestPermissions();
  //   if (!hasPermission) {
  //     Alert.alert('권한 오류', '카메라 및 갤러리 접근 권한이 필요합니다.');
  //     return;
  //   }

  //   try {
  //     const result = await launchImageLibrary({
  //       mediaType: 'photo',
  //       quality: 1,
  //       selectionLimit: 1,
  //     });

  //     if (result.didCancel) {
  //       console.log('사용자가 이미지 선택을 취소했습니다');
  //       return;
  //     }

  //     if (result.errorCode) {
  //       console.error('ImagePicker Error: ', result.errorMessage);
  //       return;
  //     }

  //     if (result.assets && result.assets[0]) {
  //       const selectedImage = result.assets[0];
  //       setImage(selectedImage.uri || '');

  //       // 이미지 업로드 로직
  //       handleImageUpload(selectedImage);
  //     }
  //   } catch (error) {
  //     console.error('이미지 선택 오류:', error);
  //     Alert.alert('오류', '이미지를 선택하는 중 문제가 발생했습니다.');
  //   }
  // };

  // const handleImageUpload = async (selectedImage: Asset) => {
  //   if (!selectedImage.uri) return;

  //   setLoading(true);
  //   try {
  //     const payload = {
  //       name: selectedImage.fileName || 'photo.jpg',
  //       fileType: selectedImage.type || 'image/jpeg',
  //     };

  //     const {uploadUrl, uploadPath} = await postPresignedUrl(payload);
  //     const response = await fetch(selectedImage.uri);
  //     const blob = await response.blob();

  //     const uploadResult = await putS3upload({
  //       url: uploadUrl,
  //       file: blob,
  //     });

  //     if (uploadResult.status === 200) {
  //       setImage(getSrcFromStorage(uploadPath));
  //     }
  //   } catch (error) {
  //     console.error('업로드 오류:', error);
  //     Alert.alert('오류', '이미지 업로드에 실패했습니다.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // function to handle the selected images
  const handleTakePhoto = async () => {
    console.log(loading);
    setCameraVisible(true);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
      };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
      setCameraVisible(false);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {isCameraVisible ? ( // 카메라 UI 표시
            <RNCamera
              ref={cameraRef}
              style={styles.camera}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              captureAudio={false}>
              <View style={styles.captureButtonContainer}>
                <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
                  <Text style={styles.captureText}>촬영</Text>
                </TouchableOpacity>
              </View>
            </RNCamera>
          ) : (
            <>
              {image ? (
                <Image source={{uri: image}} style={styles.image} />
              ) : (
                <View style={styles.ImageBox}></View>
              )}
              {/* <Button title="갤러리에서 선택" onPress={handleSelectImage} /> */}
              <Button title="카메라로 촬영" onPress={handleTakePhoto} />
            </>
          )}
        </>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
          <Text>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => setStep(step + 1)}>
          <Text>다음</Text>
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  camera: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    width: '100%',
    // height: Dimensions.get('window').width * (184 / 343),
    height: '100%',
    marginVertical: 20,
    backgroundColor: '#bebebe',
    borderRadius: 10,
    borderWidth: 1,
  },
  captureButtonContainer: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    margin: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureText: {
    fontSize: 14,
    color: '#000',
  },
});

export default TakePhoto;
