import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

const nth = d => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const DayDescription = ({inputDate, style}) => {
  const arr = inputDate.split('/');
  const date = new Date(arr[2], arr[0] - 1, arr[1]);
  const today = new Date();
  const tomorrow = new Date();
  const yesterday = new Date();

  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);
  if (date.toLocaleDateString() === today.toLocaleDateString()) {
    return <Text style={style}>Today</Text>;
  }
  if (date.toLocaleDateString() === tomorrow.toLocaleDateString()) {
    return <Text style={style}>Tomorrow</Text>;
  } else if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
    return <Text style={style}>Yesterday</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Text style={{...style, ...styles.content}}>{date.getDate()}</Text>
        <Text style={{...style, ...styles.nth}}>{nth(date.getDate())}</Text>
        <Text style={{...style, ...styles.content}}>
          {' ' + moment(date.getMonth(), 'MM').format('MMMM')},{' '}
          {date.getFullYear()}
        </Text>
      </View>
    );
  }
};

export default memo(DayDescription);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  content: {
    margin: 0,
    marginLeft: 0,
  },
  nth: {fontSize: 10, marginLeft: 0},
});
