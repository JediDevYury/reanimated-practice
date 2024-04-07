import {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from "react-native";
import {StatusBar} from 'expo-status-bar';
import ContactsListItem from "./components/ContactsListItem";
import {SafeAreaView} from "moti";

export type ContactInfo = {
  name: string;
  email: string;
}

export function App() {
  const [contacts, setContacts] = useState<ContactInfo[] | undefined>()
  const contactsPlaceholderList = useMemo(() => Array.from({length: 15}).map((_, index) => {
    return null
  }), []);

  const fetchContacts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    if (response.ok) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const data = await response.json()
      console.log(data)
      setContacts(data)
    } else {
      console.error('Failed to fetch data')
    }
  };

  useEffect(() => {
    fetchContacts()
  }, []);

  return (
   <SafeAreaView style={styles.container}>
     <StatusBar style="auto" />
     <FlatList
      data={contacts ?? contactsPlaceholderList}
      ItemSeparatorComponent={() => {
        return <View style={{
          height: 1,
          width: '100%',
          backgroundColor: 'gray',
        }}/>
      }}
      renderItem={({item}) => {
        return <ContactsListItem contact={item}/>
      }}
      keyExtractor={(item) => {
        return item?.name ?? Math.random().toString()
      }}
     />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});


// eslint-disable-next-line import/no-default-export
export default App;
