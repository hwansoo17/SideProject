import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

const BackIcon = require('../../assets/icons/BackIcon.svg').default;

const MakeCard: React.FC = () => {
  const cameraRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      // const options = {quality: 0.5, base64: true};
      // const data = await cameraRef.current.takePictureAsync(options);
      // 파일 경로 지정
      // const filePath = `${RNFS.DocumentDirectoryPath}/photo.jpg`;
      // 이미지 저장
      // await RNFS.writeFile(filePath, data.base64, 'base64')
      //   .then(() => {
      //     console.log('Image saved successfully:', filePath);
      //     setCapturedImage(filePath); // 화면에 저장된 이미지 경로 설정
      //   })
      //   .catch(error => console.log('Failed to save image:', error));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftIcon}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      {/* {!capturedImage ? (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
        />
      ) : (
        <Image
          source={{uri: `file://${capturedImage}`}}
          style={styles.preview}
        />
      )} */}

      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.captureText}>
          {capturedImage ? 'Retake' : 'Capture'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  header: {
    flex: 0.1,
    textAlign: 'center',
    // backgroundColor: '#0d0d0d',
    justifyContent: 'space-between',
  },
  leftIcon: {
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'center',
    color: '#fff',
  },
  camera: {width: '100%', height: '80%'},
  captureButton: {
    backgroundColor: '#4287f5',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  captureText: {color: '#fff', fontSize: 16},
  preview: {width: '100%', height: '80%'},
});

export default MakeCard;
