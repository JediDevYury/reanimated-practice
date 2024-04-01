import { StyleSheet, View } from 'react-native';
import {
  useSharedValue,
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {Page} from "./components/Page";

const WORDS = ["What's", "up", "React", "Native", "Master"];

export default function App() {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
     horizontal
     style={styles.container}
     onScroll={scrollHandler}
     scrollEventThrottle={16}
     pagingEnabled
    >
      {WORDS.map((word, index) => {
        return <Page
         key={index.toString()}
         title={word}
         index={index}
         translateX={translateX}
        />
      }, [])}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
