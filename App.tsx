import { useEffect, useState } from 'react';
import { View, StyleSheet} from "react-native";
import * as Font from 'expo-font';
import {StatusBar} from 'expo-status-bar';
import sfCompactRoundedMedium from './assets/fonts/SF-Compact-Rounded-Medium.otf';
import Dropdown from "./components/Dropdown";

const options = [
  { label: 'Charts', iconName: 'barschart' },
  { label: 'Book', iconName: 'book' },
  { label: 'Calendar', iconName: 'calendar' },
  { label: 'Camera', iconName: 'camera' },
];

const header = {
  label: 'Header',
  iconName: 'ellipsis1',
};

export function App() {

  return (
   <View style={styles.container}>
     <Dropdown header={header} options={options}/>
     <StatusBar style="auto" />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
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
