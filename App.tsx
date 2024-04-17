import {StyleSheet, TouchableOpacity, View} from "react-native";
import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import BottomSheet, {BottomSheetRef} from "./components/BottomSheet";
import {useRef} from "react";

export function App() {
  const ref = useRef<BottomSheetRef>(null);
  const onPress = () => {
    const isActive = ref.current?.isActive();
    if(isActive) {
      ref.current?.scrollTo(0);
      return;
    }
    ref.current?.scrollTo(-200);
  };

  return (
   <GestureHandlerRootView style={styles.container}>
     <StatusBar style="light" />
     <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={1}/>
     <BottomSheet ref={ref}>
      <View style={{
        flex: 1,
        backgroundColor: 'orange',
      }}/>
     </BottomSheet>
   </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 60,
    backgroundColor: "white",
    borderRadius: 25,
    aspectRatio: 1,
    opacity: 0.6,
  }
});


// eslint-disable-next-line import/no-default-export
export default App;
