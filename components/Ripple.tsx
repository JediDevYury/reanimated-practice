import {View, ViewStyle, StyleProp} from 'react-native';
import {PropsWithChildren} from "react";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {
  measure, runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

type RippleProps = {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
};
const Ripple =
  ({
    style,
    children,
    onTap,
  }: PropsWithChildren<RippleProps>) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0)
  const aRef = useAnimatedRef<View>();
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const rippleOpacity = useSharedValue(1);

  const tabGesture = Gesture.Tap()
   .onStart((tapEvent) => {
     const measurement = measure(aRef);

     if(measurement) {
       width.value = measurement.width;
       height.value = measurement.height
     }

     centerX.value = tapEvent.x;
     centerY.value = tapEvent.y;

     scale.value = 0;
     rippleOpacity.value = 1;
     scale.value = withTiming(1, {
        duration: 1000,
     })
   })
   .onTouchesUp(() => {
      if (onTap) {
        runOnJS(onTap)()
      }
   })
   .onFinalize(() => {
      rippleOpacity.value = withTiming(0, {
        duration: 1000
      })
   })

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2)
    console.log(circleRadius)

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        {translateX},
        {translateY},
        { scale: scale.value }
      ],
    };
  });

  return (
     <GestureHandlerRootView>
       <Animated.View ref={aRef} style={style}>
         <GestureDetector gesture={tabGesture}>
           <Animated.View style={[style, {
             overflow: "hidden"
           }]}>
             <Animated.View>{children}</Animated.View>
             <Animated.View style={rStyle} />
           </Animated.View>
         </GestureDetector>
        </Animated.View>
     </GestureHandlerRootView>
  );
};


export default Ripple;
