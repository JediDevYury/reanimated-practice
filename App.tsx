import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import {useRef} from "react";

const SIZE = 100.0;


const CIRCLE_RADIUS = SIZE * 2;

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const prevX = useRef(0);
  const prevY = useRef(0);

  const gesture = Gesture.Pan()
   .onStart(() => {
     prevX.current = translateY.value
     prevY.current = translateX.value
   })
   .onUpdate((e) => {
      translateX.value = e.translationX + prevX.current;
      translateY.value = e.translationY + prevY.current;
   })
   .onEnd(() => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if(!(distance < CIRCLE_RADIUS + SIZE / 2)) {
        prevX.current = translateX.value;
        prevY.current = translateY.value;
        return;
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
   })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
        <View style={styles.circle}>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.square, rStyle]} />
          </GestureDetector>
        </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: `rgba(0, 0, 256, 0.5)`,
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: `rgba(0, 0, 256, 0.5)`,
  }
});
