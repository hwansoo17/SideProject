import React from "react"
import { View, TouchableOpacity } from "react-native"

const ShareIcon = require('../assets/buttonIcon/ShareIcon.svg').default;


type ShareButtonProps = {
  handleFlip: () => void;
};

const ShareButton: React.FC<ShareButtonProps> = ({ handleFlip }) => {
  return (
    <TouchableOpacity  
      style={{ alignItems:'center', justifyContent:'center'}}  
      onPress={handleFlip}
    >
      <View style={{position:'absolute'}}>
        <ShareIcon />
      </View>
      <View style={{ backgroundColor: 'white', width:48, height:48, borderRadius:24, elevation:10, opacity:0.5}} />
    </TouchableOpacity>
  )
};

export default ShareButton;