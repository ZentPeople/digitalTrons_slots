import React, {useEffect, useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Keyboard,
} from 'react-native';
import {colours} from '../Constants';

const screenWidth = Dimensions.get('window').width;

const MyTextInput = ({
  title,
  defaultValue,
  value,
  onChangeText,
  placeholder,
  oldStateId,
  stateId,
  hideTitle,
  autoFocus,
  style,
}) => {
  return (
    <View style={{...styles.container, style}}>
      {!hideTitle && (
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      {title === 'Mobile' ? (
        <View style={styles.mobileContainer}>
          <View
            style={{
              ...styles.valueContainer,
              paddingHorizontal: 5,
              width: screenWidth * 0.13,
            }}>
            <Text
              style={{
                ...styles.value,
                height: 20,
                width: screenWidth * 0.13,
              }}>
              + 91
            </Text>
          </View>
          <View
            style={{
              ...styles.valueContainer,
              paddingHorizontal: 15,
              marginLeft: screenWidth * 0.04,
              width: screenWidth * 0.7,
            }}>
            <TextInput
              style={styles.value}
              value={value}
              onChangeText={onChangeText}
              placeholder={`Enter your ${title}`}
              placeholderTextColor={colours.blackDimmed}
              keyboardType="number-pad"
              autoFocus={autoFocus}
              maxLength={10}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            ...styles.valueContainer,
            height: 45,
            justifyContent: 'center',
          }}>
          <TextInput
            style={styles.value}
            value={value}
            onChangeText={onChangeText}
            placeholder={`Enter your ${title}`}
            placeholderTextColor={colours.blackDimmed}
            keyboardType="default"
            autoFocus={autoFocus}
            multiline={title === 'Bio' ? true : false}
          />
        </View>
      )}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginVertical: 10,
    width: screenWidth * 0.87,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    color: colours.black,
    fontSize: 18,
    marginBottom: 10,
  },
  valueContainer: {
    backgroundColor: colours.white,
    width: screenWidth * 0.87,
    height: 45,
    borderRadius: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15,

    borderColor: colours.balck,
    borderWidth: 1,
  },
  value: {
    color: colours.balck,
    fontSize: 14,
    fontWeight: 'normal',
    width: screenWidth * 0.8,
  },
  mobileContainer: {
    flexDirection: 'row',
  },
  nameContainer: {
    width: screenWidth * 0.87,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
