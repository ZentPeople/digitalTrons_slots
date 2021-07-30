import React from 'react';
import {StyleSheet, Image, Text, View, Dimensions} from 'react-native';
import {colours} from '../Constants';

const screenWidth = Dimensions.get('window').width;

const MyFieldError = ({text, style}) => {
  return (
    <View style={{...styles.container, style}}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/icons/error.png')}
        />
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default MyFieldError;

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 5,
    color: colours.error,
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 12,
    height: 12,
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 3,
    alignItems: 'center',
    width: screenWidth * 0.87,
  },
});
