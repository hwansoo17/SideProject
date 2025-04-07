import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useKakaoLogin, useLogin } from "../../hooks/useAuthMutation";
import useAuthStore from "../../store/useAuthStore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { textStyles } from "../../styles/styles";
import PolicyModal from "../../components/PolicyModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { login } from "@react-native-kakao/user";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [registerType, setRegisterType] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const { mutate, error, isPending } = useLogin();

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
      <Text>Please log in</Text>
      {error && <Text style={styles.error}>Login failed: {error.message}</Text>}
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} disabled={isPending} />
      <Button title="카카오 로그인" onPress={handleKakaoLogin} />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
          setRegisterType("email");
        }}
      >
        <Text
          style={[
            textStyles.R1,

            {
              color: "black",
              borderBottomWidth: 1,
              borderColor: "black",
            },
          ]}
        >
          이메일로 회원가입하기
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PasswordReset");
        }}
      >
        <Text
          style={[
            textStyles.R1,

            {
              color: "black",
              borderBottomWidth: 1,
              borderColor: "black",
            },
          ]}
        >
          비밀번호 재설정
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
