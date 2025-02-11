import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import {colors} from '../../../styles/styles';
import {useBgImgBottomSheetStore} from '../../../store/useBottomSheetStore';
import {GetRandomImageAPI} from '../../../api/image';
import useUpdateCardStore from '../../../store/useUpdateCardStore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {postPresignedUrl} from '../../../api/upload';
import {getSrcFromStorage} from '../../../utils/common';

const {height: screenHeight} = Dimensions.get('window');

const CameraIcon = require('../../../assets/icons/bottomSheet/bs_camera_icon.svg').default;
const GalleryIcon = require('../../../assets/icons/bottomSheet/pick_image_icon.svg').default;
const RandomIcon = require('../../../assets/icons/bottomSheet/random_icon.svg').default;
const RightArrowIcon = require('../../../assets/icons/chevron_right.svg').default;

const BgImgBottomSheet = () => {
  const {isOpen, closeBottomSheet} = useBgImgBottomSheetStore();
  const {formData, updateFormData} = useUpdateCardStore();
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > screenHeight / 8) {
          closeBottomSheetWithAnimation();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheetWithAnimation = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => closeBottomSheet());
  };

  useEffect(() => {
    if (isOpen) {
      openBottomSheet();
    } else {
      closeBottomSheetWithAnimation();
    }
  }, [isOpen]);

  const handleSaveToRepository = async (imageUri: string) => {
    try {
      // 1. 파일 이름 생성 (timestamp를 사용하여 유니크한 파일명 생성)
      const timestamp = new Date().getTime();
      const fileName = `card_image_${timestamp}.jpg`;

      // 2. presigned URL 요청
      const payload = {
        name: fileName,
      };
      const {uploadUrl, uploadPath} = await postPresignedUrl(payload);

      // 3. 로컬 파일을 Blob으로 변환
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // S3 업로드
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });
      if (uploadResponse.ok) {
        // 업로드 성공 - S3 URL 저장
        const s3ImageUrl = getSrcFromStorage(uploadPath);
        console.log('S3 업로드 성공:', s3ImageUrl);
        return s3ImageUrl;
      } else {
        throw new Error('S3 업로드 실패');
      }
    } catch (uploadError) {
      console.error('S3 업로드 오류:', uploadError);
      Alert.alert('업로드 실패', '이미지 업로드 중 오류가 발생했습니다.');
    }
  }

  const handleTakePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      })

      if (result.assets && result.assets[0].uri) {
        // update this uri
        const imgLink = await handleSaveToRepository(result.assets[0].uri);
        if (imgLink) {
          updateFormData('bgImg', imgLink);
        }
        closeBottomSheetWithAnimation();
      }
    } catch (error) {
      Alert.alert('오류', '카메라를 실행할 수 없습니다.');
    }
  };

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      });

      if (result.assets && result.assets[0].uri) {
        // update this uri
        const imgLink = await handleSaveToRepository(result.assets[0].uri);
        if (imgLink) {
          updateFormData('bgImg', imgLink);
        }
        closeBottomSheetWithAnimation();
      }
    } catch (error) {
      Alert.alert('오류', '사진첩에서 이미지를 선택할 수 없습니다.');
    }
  };

  const handleRandomImage = async () => {
    const {imageUrl} = await GetRandomImageAPI();
    updateFormData('background', 'IMAGE');
    updateFormData('bgImg', imageUrl);
    closeBottomSheetWithAnimation();
  }

  return isOpen ? (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={closeBottomSheetWithAnimation}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.bottomSheetContainer, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers} // 드래그 제스처 핸들러
      >
        <View style={styles.drawerContainer}>
          <Image style={styles.drawerImage} />
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleTakePhoto}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <CameraIcon />
                <Text style={styles.menuText}>사진 촬영하기</Text>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleSelectImage}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <GalleryIcon />
                <Text style={styles.menuText}>사진첩에서 선택하기</Text>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleRandomImage}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <RandomIcon />
                <Text style={styles.menuText}>랜덤 이미지 선택</Text>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(1, 1, 1, 0.5)', // 투명한 배경
  },
  drawerContainer: {
    position: 'relative',
    top: 10,
    width: '100%',
    alignItems: 'center',
  },
  drawerImage: {
    width: 60,
    height: 5,
    borderRadius: 10,
    backgroundColor: colors.White,
    elevation: 10,
  },
  bottomSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight / 3.5,
    backgroundColor: '#35353C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  headerText: {
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default BgImgBottomSheet;
