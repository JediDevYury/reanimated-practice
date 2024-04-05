import { useEffect, useState } from 'react';
import { View, StyleSheet} from "react-native";
import * as Font from 'expo-font';
import {StatusBar} from 'expo-status-bar';
import {Palette} from "./constants";
import sfCompactRoundedMedium from './assets/fonts/SF-Compact-Rounded-Medium.otf';
import SegmentedControl from "./components/SegmentedConrol"; // medium

const options = ['Light', 'Standard', 'Pro', "Metal"];

export function App() {
  const [selectedOption, setSelectedOption] = useState('Standard');

  return (
   <View style={styles.container}>
     <StatusBar style="auto" />
     <SegmentedControl
      options={options}
      selectedOption={selectedOption}
      onSelect={setSelectedOption}
     />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppContainer = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load custom fonts using async Font.loadAsync
  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'SF-Compact-Rounded-Medium': sfCompactRoundedMedium, // medium
      });
      setFontsLoaded(true);
    })();
  }, []);

  return <>{fontsLoaded && <App />}</>;
};

// eslint-disable-next-line import/no-default-export
export default AppContainer;
