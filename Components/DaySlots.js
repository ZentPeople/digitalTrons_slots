import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {DayDescription} from '../Components';

import colours from '../Constants/colours';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Slot = ({data, date}) => {
  const navigation = useNavigation();

  const startTime = new moment(data.slotStartTime).format('h A');
  const slotEndTime = new moment(data.slotEndTime).format('h A');
  // const startTime = new moment(data.slotStartTime).format('hh:mm A');
  // const slotEndTime = new moment(data.slotEndTime).format('hh:mm A');

  const onOpen = () => {
    navigation.push('Slots', {data: JSON.stringify(data), date});
  };

  return (
    <TouchableOpacity
      onPress={onOpen}
      style={{
        ...styles.slotContainer,
        backgroundColor: data.status === 'BOOKED' ? colours.red : colours.green,
      }}>
      <Text style={styles.slotText}>
        {startTime} to {slotEndTime}
      </Text>
    </TouchableOpacity>
  );
};

const DaySlots = ({data, date}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <DayDescription inputDate={date} style={styles.dateDescription} />
      </View>
      <FlatList
        data={data}
        numColumns={2}
        style={styles.flatList}
        keyExtractor={item => item._id}
        renderItem={({item}) => <Slot data={item} date={date} />}
      />
    </View>
  );
};

export default DaySlots;

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    borderRadius: 10,
    marginVertical: 10,
    width: screenWidth * 0.87,
    backgroundColor: colours.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateContainer: {
    backgroundColor: colours.MuiBlue,
    height: 30,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dateDescription: {
    color: colours.white,
    fontWeight: 'bold',
  },
  flatList: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  slotContainer: {
    width: screenWidth * 0.38,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  slotText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colours.gray,
  },
});
