import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {colors, textStyles} from '../../styles/styles';
import { getSrcFromStorage } from '../../utils/common';
import { launchImageLibrary } from 'react-native-image-picker';
import { postPresignedUrl } from '../../api/upload';
import useMakeCardStore from '../../store/useMakeCareStepStore';

const LinkIcon = require('../../assets/icons/link_icon.svg').default;
const CloseIcon = require('../../assets/icons/close_icon.svg').default;

interface RegisterLogoModalProps {
  visible: boolean;
  onClose: () => void;
}

const RegisterLogoModal: React.FC<RegisterLogoModalProps> = ({
  visible,
  onClose,
}) => {
  const {formData, updateFormData} = useMakeCardStore();

  const handleSubmit = () => {
    onClose();
  };

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
          updateFormData('logoImg', imgLink);
        }
        
      }
    } catch (error) {
      Alert.alert('오류', '사진첩에서 이미지를 선택할 수 없습니다.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={[textStyles.M4, styles.modalTitle]}>로고 추가</Text>
          {
            formData.logoImg ? 
            <View style={styles.logoContainer}>
              <View style={styles.logoImageContainer}>
                <Image source={{uri: formData.logoImg}} style={styles.logoImage} />
                <TouchableOpacity onPress={() => updateFormData('logoImg', '')} style={styles.closeIcon}>
                  <CloseIcon width={20} height={20} />
                </TouchableOpacity>
              </View>
            </View> : 
            <View>
              <View>
                <TextInput
                  style={styles.modalInput}
                  placeholder="이미지를 첨부해주세요"
                  placeholderTextColor={colors.G04}
                  readOnly
                  onPress={handleSelectImage}
                />
                <View style={styles.iconContainer}>
                  <LinkIcon />
                </View>
              </View>
              <Text style={styles.modalText}>*사진 포맷은 jpg, jpeg, png만 가능합니다.</Text>
            </View>
          }
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.submitButton]}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.G01,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    color: colors.White,
    marginBottom: 16,
    textAlign: 'left',
  },
  modalInput: {
   backgroundColor: colors.G02,
   borderRadius: 8,
   padding: 16,
   color: colors.White,
   fontFamily: 'Pretendard-Regular',
   fontSize: 14,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImageContainer: {
    position: 'relative',
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  closeIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  modalText: {
    color: colors.G04,
    marginTop: 8,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  modalButton: {
    flex: 1,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.G02,
  },
  submitButton: {
    backgroundColor: colors.Primary,
  },
  cancelButtonText: {
   color: colors.White,
   fontFamily: 'Pretendard-Regular',
   fontSize: 14,
  },
  submitButtonText: {
    color: colors.White,
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
  },
});

export default RegisterLogoModal;