import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useDispatch} from 'react-redux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

import {
  MyStatusBar,
  MyTextInput,
  MyHeader,
  MyButton,
  MyFieldError,
} from '../Components';

import {getUser} from '../apis/slots/users';

import {colours, regEx} from '../Constants';

import {bookSlot} from '../Store/actions/slot';

const Slots = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let {data, date: dateKey} = route.params;
  data = JSON.parse(data);
  const {user} = data;

  const startTime = new moment(data.slotStartTime).format('h A');
  const slotEndTime = new moment(data.slotEndTime).format('h A');
  const date = new moment(data.slotStartTime).format('do MMM,');

  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [fieldErrors, setFiledErrors] = useState({
    firstName: [],
    lastName: [],
    phoneNumber: [],
    general: [],
  });
  const [loading, setLoading] = useState(false);

  const book = async ({fname = null, lname = null}) => {
    try {
      await dispatch(
        bookSlot({
          startTime: data.slotStartTime,
          firstName: fname || firstName,
          lastName: lname || lastName,
          phoneNumber,
          dateKey,
          oldID: data._id,
        }),
      );
      await navigation.goBack();
    } catch (err) {
      console.log(err);
      setFiledErrors(err1 => {
        return {...err1, general: err};
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const errors = {firstName: [], lastName: [], phoneNumber: [], general: []};
    setLoading(true);
    try {
      setFiledErrors(errors);

      if (!firstName || firstName.length < 3) {
        errors.firstName.push('Enter a valid First name');
      }
      if (!lastName || lastName.length < 3) {
        errors.lastName.push('Enter a valid last name');
      }
      if (!phoneNumber || !regEx.indianMobileNumberRegEx.test(phoneNumber)) {
        errors.phoneNumber.push('Enter a valid Indian Mobile number');
      }

      if (
        errors.firstName.length > 0 ||
        errors.lastName.length > 0 ||
        errors.phoneNumber.length > 0
      ) {
        setFiledErrors(errors);
        return setLoading(false);
      }

      const userFromDB = await getUser({phoneNumber});

      if (
        userFromDB &&
        (userFromDB.firstName.toLowerCase() != firstName.trim().toLowerCase() ||
          userFromDB.lastName.toLowerCase() != lastName.trim().toLowerCase())
      ) {
        await Alert.alert(
          'User already exists',
          `A user named ${
            userFromDB.firstName + ' ' + userFromDB.lastName
          } already exists with mobile number ${phoneNumber}. Which name do u want to use?`,
          [
            {
              text: userFromDB.firstName + ' ' + userFromDB.lastName,
              onPress: () => {
                setFirstName(userFromDB.firstName);
                setLastName(userFromDB.lastName);
                book({fname: userFromDB.firstName, lname: userFromDB.lastName});
              },
            },
            {
              text: firstName + ' ' + lastName,
              onPress: () => {
                book({});
              },
            },
          ],
        );
      } else {
        await book({});
      }
    } catch (err) {
      console.log(err);
      errors.general.push(err);
      setFiledErrors(errors);
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View>
      <MyStatusBar backgroundColor={colours.white} barStyle="dark-content" />
      <MyHeader
        title={`${date} ${startTime} - ${slotEndTime}`}
        showBackButton
      />
      <KeyboardAvoidingView style={styles.container}>
        <MyTextInput
          title="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        {fieldErrors.firstName &&
          fieldErrors.firstName.map((d, i) => {
            return <MyFieldError text={d} key={i} />;
          })}
        <MyTextInput
          title="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        {fieldErrors.lastName &&
          fieldErrors.lastName.map((d, i) => {
            return <MyFieldError text={d} key={i} />;
          })}
        <MyTextInput
          title="Mobile"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {fieldErrors.phoneNumber &&
          fieldErrors.phoneNumber.map((d, i) => {
            return <MyFieldError text={d} key={i} />;
          })}

        {fieldErrors.general &&
          fieldErrors.general.map((d, i) => {
            return <MyFieldError text={d} key={i} />;
          })}
        <View style={styles.buttonContainer}>
          <MyButton
            buttonName="Submit"
            buttonType="primary"
            onPress={onSubmit}
            buttonStyle={styles.button}
            loading={loading}
          />
          <MyButton
            buttonName="Cancel"
            buttonType="secondary"
            onPress={onCancel}
            buttonStyle={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Slots;

const styles = StyleSheet.create({
  container: {
    height: screenHeight - 120,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colours.white,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
  },
  button: {
    width: screenWidth * 0.87,
    marginVertical: 10,
  },
});
