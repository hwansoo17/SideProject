import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Linking,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { colors, textStyles } from '../styles/styles';
import CustomButton from './CustomButton';
const ArrowIcon = require('../assets/icons/ArrowIcon.svg').default;
const Check = require('../assets/icons/Check.svg').default;
interface PolicyModalProps {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  registerType: string;
  setIsAgree: (agree: boolean) => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({setModalVisible, modalVisible, registerType, setIsAgree}) => {
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
        console.log(gestureState.dy, gestureState.vy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > screenHeight/4 || gestureState.vy > 0.8) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
    if (agreeAll) {
      setIsAgree(true);
    }
    if (!agreeAll) {
      setIsAgree(false);
    }
  }, [modalVisible, agreeAll]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
      setAgreeAll(false);
      setAgreeService(false);
      setAgreePrivacy(false);
    });
  };

  const handleAgreeAll = () => {
    const newValue = !agreeAll;
    setAgreeAll(newValue);
    setAgreeService(newValue);
    setAgreePrivacy(newValue);
  };

  const handleAgreeService = () => {
    const newValue = !agreeService;
    setAgreeService(newValue);
    if (!newValue) {
      setAgreeAll(false);
    } else if (agreePrivacy) {
      setAgreeAll(true);
    }
  };

  const handleAgreePrivacy = () => {
    const newValue = !agreePrivacy;
    setAgreePrivacy(newValue);
    if (!newValue) {
      setAgreeAll(false);
    } else if (agreeService) {
      setAgreeAll(true);
    }
  };

  const onPressHandler = async() => {
    closeModal();
    if (registerType === 'email') {
      navigation.navigate('Register' as never);
    }
  };

  interface PolicyListItemProps {
    title: string;
    onPress: () => void;
    link: string;
    agreeItem: boolean;
  }

  const PolicyListItem: React.FC<PolicyListItemProps> = ({title, onPress, link, agreeItem}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 16,
        }}>
        <TouchableOpacity onPress={onPress} style={{padding: 4}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: agreeItem ? colors.Primary : colors.G05,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Check />
          </View>
        </TouchableOpacity>
        <View style={{width: 12}} />
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row'}}
          onPress={() => {
            Linking.openURL(link);
          }}>
          <Text
            style={[
              textStyles.M4,
              {color: colors.G06},
            ]}>{`(필수) ${title}`}</Text>
          <View style={{flex: 1}} />
          <ArrowIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        closeModal();
      }}>
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
        <TouchableOpacity
          style={{flex: 23}}
          onPress={() => {
            closeModal();
          }}
        />
        <Animated.View style={{transform: [{translateY: translateY}], flex:77}}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.G01,
              paddingHorizontal: 20,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <View style={{paddingVertical: 16}} {...panResponders.panHandlers}>
              <View
                style={{
                  height: 5,
                  width: 50,
                  alignSelf: 'center',
                  backgroundColor: colors.G04,
                  borderRadius: 10,
                }}
              />
              <View style={{height: 8}} />
            </View>
            <Text style={[textStyles.B2, {color: colors.G06}]}>
              약관에 동의해주세요
            </Text>
            <View style={{height: 12}} />
            <Text style={[textStyles.M4, {color: colors.G06}]}>
              여러분의 개인정보와 서비스 이용 권리를 잘 지켜드릴게요
            </Text>
            <View style={{height: 24}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
                backgroundColor: "#313131",
                borderRadius:4
              }}>
              <TouchableOpacity
                onPress={() => handleAgreeAll()}
                style={{padding: 4}}>
                <View
                  style={{
                    width: 22,
                    height: 22, 
                    borderRadius: 11,
                    backgroundColor: agreeAll ? colors.Primary : colors.G05,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Check />
                </View>
              </TouchableOpacity>
              <View style={{width: 12}} />
              <View>
              <Text style={[textStyles.B5, {color: colors.G06}]}>
                모두 동의
              </Text>
              <Text style={[textStyles.M5, {color: colors.G06}]}>
                서비스 이용을 위해 아래 약관에 모두 동의합니다.
              </Text>
              </View>
              <View style={{flex: 1}} />
            </View>
            <View style={{height: 32}} />
            <PolicyListItem
              title="서비스 이용약관 동의"
              link={
                'https://peppered-game-6ea.notion.site/5a78b112fec74a2184526fe314dce3cf'
              }
              agreeItem={agreeService}
              onPress={() => handleAgreeService()}
            />
            <View style={{height: 20}} />
            <PolicyListItem
              title="개인정보 수집 및 이용 동의"
              link={
                'https://peppered-game-6ea.notion.site/74aa30df62754ddfb6aeae8d82b9d96d'
              }
              agreeItem={agreePrivacy}
              onPress={() => handleAgreePrivacy()}
            />
            <View style={{flex:1}}/>
            <CustomButton
              title="다음"
              onPress={onPressHandler}
              disabled={!agreeAll}
            />
            <View style={{height: 16}} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PolicyModal;
