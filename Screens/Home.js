import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// Components
import {DaySlots, DaySlotsLoading, MyStatusBar} from '../Components';

// Actions
import {getSlots} from '../Store/actions/slot';
import colours from '../Constants/colours';

// Imges
import galleryImage from '../assets/icons/iphone-gallery.jpg';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const {slots} = useSelector(state => state.SLOTS);

  useEffect(() => {
    getDate();
  }, []);

  const onOpenGallery = () => {
    navigation.push('Gallery');
  };

  const getDate = async () => {
    try {
      setLoading(true);
      await dispatch(getSlots());
    } catch (err) {
      console.log(`err`, err);
    } finally {
      setLoading(false);
    }
  };
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerIcons}></View>
        <Text style={styles.headerText}>Available Slots</Text>
        <TouchableOpacity style={styles.headerIcons} onPress={onOpenGallery}>
          <Image source={galleryImage} style={styles.galleryImage} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={colours.MuiBlue} barStyle="light-content" />
      <FlatList
        data={Object.values(slots)}
        keyExtractor={(item, index) => Object.keys(slots)[index]}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Header}
        renderItem={({item, index}) => (
          <DaySlots data={item} date={Object.keys(slots)[index]} />
        )}
        ListEmptyComponent={
          loading ? (
            <DaySlotsLoading />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No slots found</Text>
            </View>
          )
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.MuiBlue,
  },
  flatList: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colours.white,
    paddingBottom: screenHeight * 0.4,
  },
  headerContainer: {
    flexDirection: 'row',

    backgroundColor: colours.MuiBlue,
    width: screenWidth,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerText: {
    color: colours.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryImage: {height: 30, width: 30},
  emptyContainer: {
    height: screenHeight,
    paddingTop: screenHeight * 0.3,
  },
  emptyText: {
    color: colours.lightGray,
  },
});
