import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLogin } from '../../hooks/useLogin';
import useAuthStore from '../../store/useAuthStore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { textStyles } from '../../styles/styles';
import PolicyModal from '../../components/PolicyModal';
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [registerType, setRegisterType] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const { mutate, error, isPending } = useLogin();

  const handleLogin = () => {
    mutate(
      { email, password }
    );
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
      <Button title="Login" onPress={handleLogin} disabled={isPending}/>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
          setRegisterType('email');
        }}>
        <Text
          style={[
            textStyles.R1,

            {
              color: 'black',
              borderBottomWidth: 1,
              borderColor: 'black',
            },
          ]}>
          이메일로 회원가입하기
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
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default LoginScreen;
