import {StyleSheet, Image, Dimensions, ImageBackground, Text} from 'react-native';
import {Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from "react-native-reanimated";
import {useCallback} from "react";

const { width: SIZE } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function App() {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0)}],
    };
  })

  const rOpacity = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  })

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, [])

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, [])

  const singleTapGestureHandler = Gesture.Tap()
   .onStart(onSingleTap);

  const doubleTapGestureHandler = Gesture.Tap()
   .maxDelay(250)
   .numberOfTaps(2)
   .onStart(onDoubleTap);

  return (
    <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={
          Gesture.Exclusive(
           doubleTapGestureHandler,
           singleTapGestureHandler
          )}>
         <Animated.View>
           <ImageBackground
            source={require('./assets/image.jpeg')}
            style={styles.image}
           >
             <AnimatedImage
              style={[styles.image, styles.heart, rStyle]}
              source={require('./assets/heart.png')}
              resizeMode="center"
             />
           </ImageBackground>
           <Animated.Text style={[styles.turtleStyle, rOpacity]}>🐢🐢🐢🐢🐢</Animated.Text>
         </Animated.View>
        </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  heart: {
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.35,
    shadowRadius: 35,
  },
  turtleStyle: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 35,
  }
});
