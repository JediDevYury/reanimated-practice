import {Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import {forwardRef, PropsWithChildren, useCallback, useImperativeHandle} from "react";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type BottomSheetProps = PropsWithChildren<{}>;

export type BottomSheetRef = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const MAX_TRANSLATION_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(({children}, ref) => {
  const context = useSharedValue({
    y: 0,
  });
  const active = useSharedValue(false);
  const translationY = useSharedValue(0);
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    active.value = destination !== 0;

    translationY.value = withSpring(destination, {
      damping: 50,
    });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  } , []);

  useImperativeHandle(ref, () => ({
    scrollTo,
    isActive,
  }), [scrollTo]);

  const gesture = Gesture.Pan().onStart(() => {
    context.value = {y: translationY.value};
  }).onUpdate((event) => {
    translationY.value = event.translationY + context.value.y;
    translationY.value = Math.max(translationY.value, MAX_TRANSLATION_Y);
  })
   .onEnd(() => {
     if(translationY.value > -SCREEN_HEIGHT / 3) {
       scrollTo(0);
       return;
     }

     if(translationY.value < -SCREEN_HEIGHT / 1.5) {
       scrollTo(MAX_TRANSLATION_Y);
     }
   });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(translationY.value, [MAX_TRANSLATION_Y + 50, MAX_TRANSLATION_Y], [25, 5], Extrapolation.CLAMP);
    return {
      borderRadius,
      transform: [{ translateY: translationY.value }]
    }
  });

  return (
   <GestureDetector gesture={gesture}>
     <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
       <View style={styles.line} />
       {children}
     </Animated.View>
   </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  }
});

export default BottomSheet;
