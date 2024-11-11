import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors, textStyles} from '../../styles/styles';

interface AddLinkModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [linkUrl, setLinkUrl] = useState('');

  const handleSubmit = () => {
    if (linkUrl.trim()) {
      onSubmit(linkUrl);
      setLinkUrl('');
      onClose();
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
          <Text style={[textStyles.M4, styles.modalTitle]}>링크 추가</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="URL을 입력해주세요"
            placeholderTextColor={colors.G04}
            value={linkUrl}
            onChangeText={setLinkUrl}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.submitButton]}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>추가</Text>
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
   marginBottom: 24,
   fontFamily: 'Pretendard-Regular',
   fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  modalButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
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

export default AddLinkModal;