import { StyleSheet, View } from 'react-native';
import {useSharedValue, useAnimatedStyle, withSpring, withRepeat, DerivedValue} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {useEffect} from "react";

const SIZE = 100.0;

const handleRotation = (progress: DerivedValue<number>) => {
  'worklet';

  return `${progress.value * 2 * Math.PI}rad`
}

export default function App() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [{ scale: scale.value }, {
        rotate: handleRotation(progress),
      }],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 3, true)
    scale.value = withRepeat(withSpring(1), 3, true)
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[{
        height: SIZE,
        width: SIZE,
        backgroundColor: 'blue',
      }, reanimatedStyle]} />
    </View>
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
