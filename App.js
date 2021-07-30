import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

// Import store
import store from './Store';

//Import Navigation here
import StackNavigator from './Navigators/StackNavigator';

export default function App() {
  return (
    <InternetConnectionAlert>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </InternetConnectionAlert>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
