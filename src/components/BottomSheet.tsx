import React, {useRef, useEffect, ReactNode, Key} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import useBottomSheetStore from '../store/useBottomSheetStore';

const { height: screenHeight } = Dimensions.get('window');

const BottomSheet = () => {
  const isOpen = useBottomSheetStore(state => state.isOpen);
  const menuItems = useBottomSheetStore(state => state.menuItems);
  const closeBottomSheet = useBottomSheetStore(state => state.closeBottomSheet);

  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > screenHeight / 4) {
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

  return (
    <Animated.View
      style={[styles.bottomSheetContainer, { transform: [{ translateY }] }]}
      {...panResponder.panHandlers} // 드래그 제스처 핸들러
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Drag down to close</Text>
      </View>
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
            onPress={() => console.log(`${item} clicked`)}
          >
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: screenHeight / 4,
    backgroundColor: '#ffffff',
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
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default BottomSheet;
