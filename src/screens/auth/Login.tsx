import React from 'react';
import { Button, Text, View } from 'react-native';
import useAuthStore from '../../store/useAuthStore';
const Login = () => {
  const {login} = useAuthStore();
  return (
    <View>
      <Text>로그인 화면</Text>
      <Button title="로그인" onPress={() => {login({ name: 'fakeUser' })}} />
    </View>
  );
};

export default Login;