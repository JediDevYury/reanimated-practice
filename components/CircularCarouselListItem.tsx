import {Dimensions, StyleSheet, Image, ImageProps} from 'react-native';
import Animated, {DerivedValue, Extrapolation, interpolate, useAnimatedStyle} from "react-native-reanimated";

type CircularCarouselListItemProps = {
  imageSource: ImageProps['source'];
  index: number;
  contentOffset: DerivedValue<number>;
}

const {width} = Dimensions.get('window');
export const LIST_ITEM_SIZE = width / 4;

const CircularCarouselListItem = (
 {
   imageSource,
   index,
   contentOffset
 }: CircularCarouselListItemProps) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * LIST_ITEM_SIZE,
      (index - 1) * LIST_ITEM_SIZE,
      index * LIST_ITEM_SIZE,
      (index + 1) * LIST_ITEM_SIZE,
      (index + 2) * LIST_ITEM_SIZE,
    ];
    const outputRange = [
      0,
      -LIST_ITEM_SIZE / 3,
      -LIST_ITEM_SIZE / 2,
      -LIST_ITEM_SIZE / 3,
      0
    ];

    const opacityOutputRange = [0.5, 0.7, 1, 0.7, 0.5];

    const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

    const translateY = interpolate(
     contentOffset.value,
     inputRange,
     outputRange,
     Extrapolation.CLAMP
    );

    const opacity = interpolate(
     contentOffset.value,
     inputRange,
     opacityOutputRange,
     Extrapolation.CLAMP
    );

    const scale = interpolate(
     contentOffset.value,
     inputRange,
     scaleOutputRange,
     Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [
        {translateY}, {scale}
      ]
    }
  })
  return (
   <Animated.View style={[styles.container, rStyle]}>
     <Image source={imageSource} style={styles.image}/>
   </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: LIST_ITEM_SIZE,
    aspectRatio: 1,
    elevation: 5,
    backgroundColor: 'lightgray',
    borderRadius: 100,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  image: {
    margin: 3,
    flex: 1,
    aspectRatio: 1,
    height: LIST_ITEM_SIZE,
    width: LIST_ITEM_SIZE,
    borderRadius: 200,
    borderColor: 'white',
  },
});

export default CircularCarouselListItem;
