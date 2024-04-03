import {StyleSheet, FlatList, ImageProps} from 'react-native';
import CircularCarouselListItem, {LIST_ITEM_SIZE} from "./CircularCarouselListItem";
import {useSharedValue} from "react-native-reanimated";

type CircularCarouselProps = {
  data: ImageProps['source'][];
};

const CircularCarousel = ({data}: CircularCarouselProps) => {
  const contentOffset = useSharedValue(0)

  return (
   <FlatList
      data={data}
      style={styles.flatList}
      snapToInterval={LIST_ITEM_SIZE}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16} // 60fps -> 16ms (1000ms / 60fps)
      onScroll={(e) => {
        contentOffset.value = e.nativeEvent.contentOffset.x
      }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => {
        return <CircularCarouselListItem
         imageSource={item}
         index={index}
         contentOffset={contentOffset}
        />
      }}
      contentContainerStyle={styles.contentContainer}
      horizontal
   />
  );
};

const styles = StyleSheet.create({
  flatList: {
    position: 'absolute',
    bottom: 0,
    height: 300,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1.5 * LIST_ITEM_SIZE,
  },
});

export default CircularCarousel;
