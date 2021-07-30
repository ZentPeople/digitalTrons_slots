import React from 'react';
import {StyleSheet, Image, View, Dimensions} from 'react-native';
import {MyHeader, MyStatusBar} from '../Components';
import colours from '../Constants/colours';
import Carousel from 'react-native-snap-carousel';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const getRandomInt = (min = 300, max = 500) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const images = [
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
  `https://picsum.photos/${getRandomInt()}`,
];

console.log(`images`, images);

const RenderImage = ({imageURI}) => {
  return <Image source={{uri: imageURI}} style={styles.imageStyle} />;
};

const Gallery = () => {
  return (
    <View>
      <MyStatusBar backgroundColor={colours.white} barStyle="dark-content" />
      <MyHeader title="Gallery" showBackButton />
      <View style={styles.container}>
        <Carousel
          data={images}
          layout={'stack'}
          renderItem={({item}) => <RenderImage imageURI={item} />}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.7}
        />
      </View>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    height: screenHeight - 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.white,
    paddingTop: 100,
  },
  imageStyle: {width: 300, height: 300},
});
