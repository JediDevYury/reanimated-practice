import {Text, View, StyleSheet} from 'react-native';
import Ripple from "./components/Ripple";

const App = () => {
  return (
   <View style={styles.container}>
     <Ripple style={styles.ripple} onTap={() => {
        console.log('Tapped');
     }}>
        <Text style={styles.text}>Tab</Text>
     </Ripple>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  text: {
    fontSize: 24,
    color: 'black',
  }
});

export default App;
