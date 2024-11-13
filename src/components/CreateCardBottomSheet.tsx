import React, {useRef, useEffect, Key} from 'react';
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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { useCreatedCardBottomSheetStore } from '../store/useBottomSheetStore';
import { colors } from '../styles/styles';

interface INav extends NavigationProp<any> {}

const {height: screenHeight} = Dimensions.get('window');

const CameraIcon = require('../assets/icons/bottomSheet/bs_camera_icon.svg').default;
const PlusIcon = require('../assets/icons/bottomSheet/bs_plus_icon.svg').default;
const RightArrowIcon = require('../assets/icons/chevron_right.svg').default;

const CreateCardBottomSheet = () => {
  const isOpen = useCreatedCardBottomSheetStore(state => state.isOpen);
  const closeBottomSheet = useCreatedCardBottomSheetStore(state => state.closeBottomSheet);

  const navigation = useNavigation<INav>();

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
              navigation.navigate('MakeCard');
              closeBottomSheetWithAnimation();
            }}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <PlusIcon />
                <Text style={styles.menuText}>새로 제작하기</Text>
              </View>
              <RightArrowIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('RegisterCard');
              closeBottomSheetWithAnimation();
            }}>
            <View style={styles.linkContainer}>
              <View style={styles.linkHeader}>
                <CameraIcon />
                <Text style={styles.menuText}>기존 명함 추가</Text>
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
    alignItems: 'center',
    gap: 10,
  },
});

export default CreateCardBottomSheet;
