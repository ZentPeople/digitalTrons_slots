import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import backIcon from '../assets/icons/back.png';

import {colours} from '../Constants';
const MyHeader = ({
  title,
  showBackButton,
  LeftIcon,
  RightIcon,
  onRightIconPress,
  isRightIconLoading = false,
  style,
  titleStyle,
}) => {
  const navigation = useNavigation();
  return (
    <View style={{...styles.container, ...style}}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          {LeftIcon ? (
            <LeftIcon />
          ) : (
            <Image source={backIcon} style={{width: 20, height: 20}} />
          )}
        </TouchableOpacity>
      )}
      <Text style={{...styles.title, ...titleStyle}}>{title}</Text>

      <View style={styles.backButton}>
        {RightIcon && !isRightIconLoading && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <RightIcon />
          </TouchableOpacity>
        )}
        {RightIcon && isRightIconLoading && (
          <ActivityIndicator color={colours.white} size="small" />
        )}
      </View>
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: colours.white,
  },
  backButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    flex: 10,
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
  },
});
