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
} from 'react-native';
import {useCardSubmitBottomSheetStore} from '../../store/useBottomSheetStore';
import {colors, textStyles} from '../../styles/styles';

const {height: screenHeight} = Dimensions.get('window');

const SaveIcon = require('../../assets/icons/save_icon.svg').default;
const EditIcon = require('../../assets/icons/edit_icon.svg').default;
const RightArrowIcon = require('../../assets/icons/chevron_right.svg').default;

const CardSubmitBottomSheet = () => {
  const {isOpen, closeBottomSheet, onSubmit, onCreateMobileCard} = useCardSubmitBottomSheetStore();
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
              onSubmit();
              closeBottomSheetWithAnimation();
            }}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <SaveIcon style={{width: 24, height: 24}} />
                <Text style={[textStyles.R2, {color: colors.White}]}>이대로 명함 제작</Text>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onCreateMobileCard();
              closeBottomSheetWithAnimation();
            }}>
            <View style={styles.linkContainer}>
              <View style={[styles.linkHeader, {gap: 10}]}>
                <EditIcon style={{width: 24, height: 24}} />
                <Text style={[textStyles.R2, {color: colors.White}]}>모바일 명함 제작</Text>
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
  background: {
    flex: 1,
    backgroundColor: 'rgba(1, 1, 1, 0.5)', // 투명한 배경
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
    // paddingVertical: 12,
    paddingHorizontal: 4,
    height: 54,
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
    gap: 8,
  },
});

export default CardSubmitBottomSheet;
