import React from "react";
import { Text, Pressable, View, TouchableOpacity } from "react-native";
import { textStyles, colors } from "../styles/styles";
const KakaoIcon = require("../assets/icons/Path.svg").default;
interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
}

const KakaoLoginButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        backgroundColor: disabled ? colors.G09 : "#FBE036",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        flexDirection: "row",
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 24,
          }}
        />
        <KakaoIcon />
      </View>
      <Text
        style={[
          textStyles.M4,
          { color: disabled ? "black" : "black" },
          textStyle,
        ]}
      >
        {title}
      </Text>
      <View style={{ flex: 1 }} />
    </TouchableOpacity>
  );
};

export default KakaoLoginButton;
