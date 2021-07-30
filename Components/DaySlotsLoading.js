import React from 'react';
import {StyleSheet, View, Dimensions, FlatList} from 'react-native';

import colours from '../Constants/colours';

const screenWidth = Dimensions.get('window').width;
const Slot = () => {
  return <View style={styles.slotContainer} />;
};

const DaySlots = () => {
  const data = [1, 2, 3, 4, 5, 6];
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <View style={styles.dateDescription} />
      </View>
      <FlatList
        data={data}
        numColumns={2}
        style={styles.flatList}
        listKey={(item, index) => `_key${index.toString()}`}
        keyExtractor={(item, index) => `_key${index.toString()}`}
        renderItem={({item}) => <Slot key={item} />}
      />
    </View>
  );
};

const DaySlotsLoading = () => {
  return (
    <View>
      <DaySlots key="1" />
      <DaySlots key="2" />
      <DaySlots key="3" />
      <DaySlots key="4" />
    </View>
  );
};

export default DaySlotsLoading;

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
    backgroundColor: colours.loadingGray,
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
    backgroundColor: colours.loadingGray,
  },
  slotText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colours.gray,
  },
});
