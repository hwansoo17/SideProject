import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../styles/styles';

interface CodeInputProps {
  length: number; // 입력 필드의 길이
  onCodeChange: (code: string) => void; // 코드가 변경되면 상위 컴포넌트로 전달
}

const CodeInput: React.FC<CodeInputProps> = ({ length, onCodeChange }) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    onCodeChange(newCode.join('')); // 상위 컴포넌트로 전체 코드를 전달

    if (text && index < length - 1) {
      // 다음 입력 필드로 포커스 이동
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      // 이전 입력 필드로 포커스 이동
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.codeContainer}>
      {code.map((_, index) => (
        <TextInput
          key={index}
          ref={(input) => (inputRefs.current[index] = input)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          onChangeText={(text) => handleInputChange(text, index)}
          value={code[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 50,
    height: 64,
    backgroundColor: colors.G03,
    color: colors.White,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 4
  },
});

export default CodeInput;
