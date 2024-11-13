import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  Image,
} from 'react-native';
import EditLinkModal from './EditLinkModal';
import {colors} from '../../styles/styles';
import {useLinkBottomSheetStore} from '../../store/useBottomSheetStore';

const {height: screenHeight} = Dimensions.get('window');

const DelIcon = require('../../assets/icons/del_icon.svg').default;
const EditIcon = require('../../assets/icons/edit_icon.svg').default;
const LinkExternalIcon = require('../../assets/icons/link_external_icon.svg').default;
const RightArrowIcon = require('../../assets/icons/chevron_right.svg').default;

const LinkBottomSheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {isOpen, closeBottomSheet, deleteLink, editLink, selectedUrl} = useLinkBottomSheetStore();
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
            onPress={() => {
              deleteLink();
              closeBottomSheetWithAnimation();
            }}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <DelIcon width={22} height={22} />
                <Text style={styles.menuText}>링크 삭제하기</Text>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setIsModalOpen(true);
            }}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <EditIcon />
                <Text style={styles.menuText}>링크 수정하기</Text>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              Linking.openURL(selectedUrl);
              closeBottomSheetWithAnimation();
            }}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <LinkExternalIcon />
                <Text style={styles.menuText}>링크 방문하기</Text>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <EditLinkModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(url: string) => {
          editLink(url);
          closeBottomSheetWithAnimation();
        }}
        link={selectedUrl}
      />
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
    height: screenHeight / 4,
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
    gap: 10,
  },
});

export default LinkBottomSheet;
