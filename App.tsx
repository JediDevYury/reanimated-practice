import { View, StyleSheet} from 'react-native';
import CircularCarousel from "./components/CircularCarousel";

const data = [
  require('./assets/images/00.jpg'),
  require('./assets/images/01.jpg'),
  require('./assets/images/03.jpg'),
  require('./assets/images/04.jpg'),
  require('./assets/images/05.jpg'),
  require('./assets/images/06.jpg'),
  require('./assets/images/07.jpg'),
  require('./assets/images/08.jpg'),
  require('./assets/images/09.jpg'),
]

const App = () => {
  return (
   <View style={styles.container}>
     <CircularCarousel data={data}/>
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
});

export default App;
