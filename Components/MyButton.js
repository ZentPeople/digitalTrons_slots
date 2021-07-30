import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {colours} from '../Constants';
let disabled = false;
// Button Component
export default function MyButton({
  buttonType = 'primary',
  onPress,
  buttonName,
  fontStyle,
  buttonStyle,
  loading,
  disabled = false,
}) {
  if (loading) {
    return (
      <View style={{...styles[buttonType], ...buttonStyle}}>
        <ActivityIndicator
          size="small"
          color={(buttonType = 'primary' ? 'white' : colours.appGreen)}
        />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={{
        ...styles[buttonType],
        backgroundColor:
          buttonType === 'primary' ? colours.MuiBlue : colours.white,
        ...buttonStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={{...styles[`${buttonType}Text`], ...fontStyle}}
        maxFontSizeMultiplier={1}>
        {buttonName}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  primary: {
    padding: 20,
    paddingVertical: 15,
    width: '100%',
    backgroundColor: colours.MuiBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  secondary: {
    padding: 20,
    paddingVertical: 15,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: colours.balck,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  secondaryText: {
    color: colours.balck,
    // fontWeight: '700',
    fontSize: 18,
  },
  primaryText: {
    color: colours.white,
    fontWeight: '700',
    fontSize: 18,
  },
});
