import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useKakaoLogin, useLogin } from "../../hooks/useAuthMutation";
import useAuthStore from "../../store/useAuthStore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, textStyles } from "../../styles/styles";
import PolicyModal from "../../components/PolicyModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { login } from "@react-native-kakao/user";
import RegisterPage from "../../components/RegisterPage";
import CustomButton from "../../components/CustomButton";
import KakaoLoginButton from "../../components/KakaoLoginButton";
const Logo = require("../../assets/icons/tmi.svg").default;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [registerType, setRegisterType] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const { mutate, error, isPending } = useLogin();
  const isEmailValid = (email: string) => {
    if (email.length > 0) {
      const emailRegEx =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      return emailRegEx.test(email);
    }
    return true;
  };

  const isPasswordValid = (password: string) => {
    if (password.length > 0) {
      const passwordRegEx =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,100}$/;
      return passwordRegEx.test(password);
    }
    return true;
  };
  useEffect(() => {
    setIsValidEmail(isEmailValid(email));
    setIsValidPassword(isPasswordValid(password));
  }, [email, password]);
  const {
    mutate: kakaoLogin,
    error: kakaoError,
    isPending: kakaoIsPending,
  } = useKakaoLogin();

  const handleLogin = () => {
    mutate({ email, password });
  };

  const handleKakaoLogin = async () => {
    try {
      const response = await login();
      if (response.accessToken) {
        console.log(response.accessToken);
        kakaoLogin(response.accessToken);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("카카오 로그인에 실패했습니다.");
    }
  };
  return (
    <View style={styles.container}>
      <PolicyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        registerType={registerType}
        setIsAgree={setIsAgree}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 75,
        }}
      >
        <Logo />
        <Text style={[textStyles.R2, { color: colors.White }]}>
          This is My Information.
        </Text>
      </View>
      {error && <Text style={styles.error}>Login failed: {error.message}</Text>}
      <RegisterPage
        inputData={[
          {
            category: "이메일 주소",
            value: email,
            placeHolder: "예) splash@splash.co.kr",
            onChangeText: setEmail,
            isValid: isValidEmail,
            errorMessage: "",
          },
          {
            category: "비밀번호",
            value: password,
            placeHolder: "숫자, 영문, 특수문자를 포함한 8~20자",
            onChangeText: setPassword,
            isValid: isValidPassword,
            errorMessage: "",
            secureTextEntry: true,
          },
        ]}
        buttonTitle="로그인"
        onPress={handleLogin}
        disabled={
          !(isValidEmail && email.length > 1) ||
          isPending ||
          password.length == 0
        }
      />
      <View style={{ height: 16 }} />
      <KakaoLoginButton
        title={"카카오 로그인"}
        onPress={handleKakaoLogin}
        disabled={kakaoIsPending}
      />
      <View style={{ height: 16 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
            setRegisterType("email");
          }}
          style={{ padding: 4 }}
        >
          <Text style={[textStyles.M5, { color: colors.G10 }]}>회원가입</Text>
        </TouchableOpacity>
        <Text style={[textStyles.M5, { color: colors.G10 }]}>{"|"}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PasswordReset");
          }}
          style={{ padding: 4 }}
        >
          <Text style={[textStyles.M5, { color: colors.G10 }]}>
            비밀번호 찾기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.Black,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
});

export default LoginScreen;
