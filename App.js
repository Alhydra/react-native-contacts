import React, { useEffect, useState} from 'react';
import * as Contacts from 'expo-contacts';
import { StyleSheet, View, Text, FlatList } from 'react-native'

export default function App() {
  const [contacts, setContacts ] = useState([])
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data)
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts}
        renderItem={({item}) => {
          return (
            <Text>{`${item.name} (${item.phoneNumbers ? item.phoneNumbers[0].number : ''})`}</Text>
          )
        }}
      />
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
});
