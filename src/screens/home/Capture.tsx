import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {postPresignedUrl} from '../../api/upload';
import {getSrcFromStorage} from '../../utils/common';
import {useNavigation} from '@react-navigation/native';
import useMakeCardStore from '../../store/useMakeCareStepStore';
import {colors, textStyles} from '../../styles/styles';
import ImageEditor from '@react-native-community/image-editor';

const BackIcon = require('../../assets/icons/BackIcon.svg').default;

interface ICapture {
  isMyCard: boolean;
}

const Capture: React.FC<ICapture> = () => {
  const [loading, setLoading] = useState(false);
  const {updateFormData} = useMakeCardStore();
  const navigation = useNavigation();
  const device = useCameraDevice('back');
  // const format = device?.formats.find(f => f.photoWidth && f.photoHeight);
  const camera = useRef<Camera | null>(null);

  // test for device
  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      console.log({cameraPermission});
      if (cameraPermission !== 'granted') {
        const newPermission = await Camera.requestCameraPermission();
        console.log({newPermission});
        if (newPermission !== 'granted') {
          Alert.alert('권한 필요', '카메라 사용을 위해 권한이 필요합니다.');
        }
      }
    };
    checkPermissions();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const cropImage = async (imageUri: string) => {
    try {
      // Image.getSize를 Promise로 래핑
      const getImageSize = (uri: string): Promise<{width: number; height: number}> => {
        return new Promise((resolve, reject) => {
          Image.getSize(
            uri,
            (width, height) => {
              resolve({width, height});
            },
            (error) => {
              reject(error);
            },
          );
        });
      };
  
      // 화면 크기
      const screenWidth = Dimensions.get('window').width;
      const screenHeight = Dimensions.get('window').height;
      console.log({screenWidth, screenHeight})
      // 원본 이미지 크기 가져오기
      const imageSize = await getImageSize(imageUri);
      console.log({imageSize})
      // captureArea의 화면상 위치와 크기
      const viewWidth = 343;
      const viewHeight = 200;
      const viewX = (screenWidth - viewWidth) / 2;
      const viewY = 120;
      console.log({viewX, viewY})
      // 이미지와 화면의 비율 계산
      const widthRatio = imageSize.width / screenWidth;
      const heightRatio = imageSize.height / screenHeight;
      
      console.log("크롭 영역")
      console.log({x: Math.floor(viewX * widthRatio), y: Math.floor(viewY * heightRatio)})
      console.log({width: Math.floor(viewWidth * widthRatio), height: Math.floor(viewHeight * heightRatio)})
      // 실제 크롭할 영역 계산
      const cropData = {
        offset: {
          x: Math.floor(viewX * widthRatio),
          y: Math.floor(viewY * heightRatio),
        },
        size: Platform.OS === 'android' 
        ? {
            // Android에서는 약간 다른 계산식 사용
            width: Math.ceil(viewWidth * widthRatio),  // 올림 사용
            height: Math.ceil(viewHeight * heightRatio),
          }
        : {
            width: Math.floor(viewWidth * widthRatio), // 내림 사용
            height: Math.floor(viewHeight * heightRatio),
          },
        displaySize: {
          width: viewWidth,
          height: viewHeight,
        },
      };
  
      const croppedImageResult = await ImageEditor.cropImage(imageUri, cropData);
      console.log({croppedImageResult})
      if (typeof croppedImageResult === 'string') {
        return croppedImageResult;
      } else if (croppedImageResult && 'uri' in croppedImageResult) {
        return croppedImageResult.uri;
      }
  
      return null;
    } catch (error) {
      console.error('이미지 크롭 실패:', error);
      return null;
    }
  }

  const handleCapture = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({
          enableShutterSound: false,
          flash: 'off',
        });
        setLoading(true);
        const imageUri = `file://${photo.path}`;
        const croppedImageUri = await cropImage(imageUri);

        if (croppedImageUri) {
          try {
            const timestamp = new Date().getTime();
            const fileName = `card_image_${timestamp}.jpg`;
            const payload = {
              name: fileName,
            };
            const {uploadUrl, uploadPath} = await postPresignedUrl(payload);

            const response = await fetch(croppedImageUri);
            const blob = await response.blob();

            const uploadResponse = await fetch(uploadUrl, {
              method: 'PUT',
              body: blob,
              headers: {
                'Content-Type': 'image/jpeg',
              },
            });
            
            if (uploadResponse.ok) {
              const s3ImageUrl = getSrcFromStorage(uploadPath);
              console.log({s3ImageUrl});
              updateFormData('realCardImg', s3ImageUrl);
              navigation.navigate('MakeCard');
            } else {
              throw new Error('S3 업로드 실패');
            }
          } catch (uploadError) {
            console.error('S3 업로드 오류:', uploadError);
            Alert.alert('업로드 실패', '이미지 업로드 중 오류가 발생했습니다.');
          }
        }
      } catch (error) {
        console.error('촬영 또는 크롭 실패:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>카메라를 사용할 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.leftIcon}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* <RNCamera
            ref={cameraRef}
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={false}>
            <View />
          </RNCamera> */}
          <Camera
            ref={camera}
            style={styles.camera}
            device={device}
            isActive={true}
            photo={true}
            // format={format}
          />
          {/* 상단 반투명 영역 */}
          <View style={styles.overlayTop} />
          {/* 좌측 반투명 영역 */}
          <View style={styles.overlayLeft} />
          {/* 우측 반투명 영역 */}
          <View style={styles.overlayRight} />
          {/* 하단 반투명 영역 */}
          <View style={styles.overlayBottom} />
          <View style={styles.captureArea}>
            <View style={styles.borderFrame} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, textStyles.M3]}>프레임 안에 명함을 맞춰주세요</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
              <Text style={[styles.text, textStyles.M3]}>뒤로</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleCapture}>
              <Text style={[styles.text, textStyles.M3]}>촬영</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    flex: 0.1,
    textAlign: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  leftIcon: {
    paddingLeft: 16,
    flex: 1,
    justifyContent: 'center',
    color: '#fff',
  },
  textContainer: {
    position: 'absolute',
    top: 340,
  },
  text: {
    color: colors.G12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    top: 360,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 8,
  },
  cancelButton: {
    backgroundColor: `rgba(255, 255, 255, 0.4)`,
    width: 165,
    height: 42,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: colors.Primary,
    width: 165,
    height: 42,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120, // captureArea가 시작되는 위치
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get('window').height - 320, // 하단부터 captureArea 끝까지
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayLeft: {
    position: 'absolute',
    top: 120, // captureArea 시작 위치
    left: 0,
    width: (Dimensions.get('window').width - 343) / 2, // captureArea 좌측 여백
    height: 200, // captureArea 높이
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayRight: {
    position: 'absolute',
    top: 120, // captureArea 시작 위치
    right: 0,
    width: (Dimensions.get('window').width - 343) / 2, // captureArea 우측 여백
    height: 200, // captureArea 높이
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  borderFrame: {
    position: 'absolute',
    top: -2, // border 두께만큼 음수값
    left: -2,
    right: -2,
    bottom: -2,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
  captureArea: {
    position: 'absolute',
    top: 120, // 카메라 촬영 영역의 위치 조정
    left: (Dimensions.get('window').width - 343) / 2,
    width: 343, // 촬영 영역의 너비
    height: 200, // 촬영 영역의 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 2,
  },
});

export default Capture;
