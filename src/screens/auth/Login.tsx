import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLogin } from '../../hooks/useLogin';
import useAuthStore from '../../store/useAuthStore';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, error, isPending } = useLogin();

  const handleLogin = () => {
    mutate(
      { email, password }
    );
  };

  return (
    <View style={styles.container}>
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
