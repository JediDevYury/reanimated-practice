import {
  Easing,
  useAnimatedStyle, useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from "react-native-reanimated";
import {useCallback} from "react";

const useAnimatedShake = (duration: number) => {
  const shakeTranslateX = useSharedValue(0);
  const TranslationAmount = 20;
  const timingConfig = {
    duration: duration,
    easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
  };

  const shake = useCallback(() => {
    shakeTranslateX.value = withSequence(
      withTiming(TranslationAmount, timingConfig),
      withRepeat(withTiming(-TranslationAmount, timingConfig), 3, true),
      withSpring(0, {
        mass: 0.5,
      })
    )
  }, []);

  const rShakeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shakeTranslateX.value
        }
      ]
    };
  });

  const isShaking = useDerivedValue(() => {
    return shakeTranslateX.value !== 0;
  });

  return {shake, rShakeStyle, isShaking};
}

export default useAnimatedShake;
