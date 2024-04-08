import {StyleSheet, TouchableOpacity, View} from "react-native";
import {StatusBar} from 'expo-status-bar';
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import useAnimatedShake from "./useAnimatedShake";
import {Entypo} from "@expo/vector-icons";
import {useState} from "react";

export function App() {
  const {shake, rShakeStyle, isShaking} = useAnimatedShake(100);
  const [count, setCount] = useState(0);

  const onIncrement = () => {
    setCount(count + 1);
  };

  const onDecrement = () => {
    setCount(prev => {
      if (prev === 0) {
        shake();
        return prev;
      }
      return prev - 1;
    });
  };

  const rErrorStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(isShaking.value ? 'red' : 'black', {
        duration: 50,
      }),
    };
  });

  return (
   <View style={styles.container}>
     <StatusBar style="auto" />
     <Animated.Text style={[styles.counterText, rShakeStyle, rErrorStyle]}>
       {count}
     </Animated.Text>
     <View style={styles.buttonsContainer}>
       <TouchableOpacity style={styles.button} onPress={onDecrement}>
         <Entypo name="minus" size={32} color="white"/>
       </TouchableOpacity>
       <TouchableOpacity style={styles.button} onPress={onIncrement}>
          <Entypo name="plus" size={32} color="white"/>
       </TouchableOpacity>
     </View>
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
  counterText: {
    fontSize: 98,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 64,
    right: 32,
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    height: 64,
    aspectRatio: 1,
    backgroundColor: '#0f41a4',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


// eslint-disable-next-line import/no-default-export
export default App;
