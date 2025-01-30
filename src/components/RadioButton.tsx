import React, {useState, useRef} from 'react';
import {View, TouchableWithoutFeedback, Animated, StyleSheet} from 'react-native';
import { colors } from '../styles/styles';

interface ToggleSwitchProps {
  onPress: () => void;
  firstState: boolean;
}

const RadioButton: React.FC<ToggleSwitchProps> = ({onPress, firstState}) => {
  const [isOn, setIsOn] = useState(firstState);

  // 0(OFF) ~ 1(ON)
  const circleAnim = useRef(new Animated.Value(isOn ? 1 : 0)).current;
  const backgroundAnim = useRef(new Animated.Value(isOn ? 1 : 0)).current;

  const toggleSwitch = () => {
    const toValue = isOn ? 0 : 1;

    // 두 애니메이션을 동시에(병렬) 실행
    Animated.parallel([
      Animated.timing(circleAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,  // translateX에만 사용
      }),
      Animated.timing(backgroundAnim, {
        toValue,
        duration: 300,
        useNativeDriver: false, // 색상 인터폴레이션
      }),
    ]).start(() => {
      setIsOn(!isOn);
      onPress();
    });
  };

  // circleAnim: 0 -> 1
  const translateX = circleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 18],
  });

  // backgroundAnim: 0 -> 1
  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', colors.Primary],
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <View style={styles.switchContainer}>
        {/* backgroundColor는 Animated.View로 감싸줘야 애니메이션이 적용됨 */}
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor, borderRadius: 15 }]} />
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 24,
    borderRadius: 15,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 13,
    backgroundColor: '#fff',
    elevation: 2,
  },
});

export default RadioButton;
