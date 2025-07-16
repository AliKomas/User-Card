import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  const kullanicilar = () => {

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(() => alert('Hata oluştu'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.ButtonContainer}>
        <Button title="Kullanıcılar Listesi" onPress={kullanicilar} />
      </View>

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detay', { user: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.username}</Text>
            <Text>{item.email}</Text>
            <Text>{item.address.street}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.website}</Text>
            <Text>{item.company.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    marginTop: 20,
    justifyContent:'center',
    alignContent:'center'
  },

  ButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  card: {
    backgroundColor: 'gray',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
});













