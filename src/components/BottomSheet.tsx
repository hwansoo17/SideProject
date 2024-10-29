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
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useBottomSheetStore from '../store/useBottomSheetStore';

interface INav extends NavigationProp<any> {}

const {height: screenHeight} = Dimensions.get('window');

const BottomSheet = () => {
  const isOpen = useBottomSheetStore(state => state.isOpen);
  const menuItems = useBottomSheetStore(state => state.menuItems);
  const closeBottomSheet = useBottomSheetStore(state => state.closeBottomSheet);

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
        <View style={styles.contentContainer}>
          {menuItems.map((
            item: {
              icon: string,
              title: string,
              link: string
            }, 
            index: Key) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                navigation.navigate(item.link);
                closeBottomSheetWithAnimation();
              }}
            >
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
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
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
});

export default BottomSheet;
