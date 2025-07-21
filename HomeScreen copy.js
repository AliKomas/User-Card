import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const pageSize = 5;

  const kullanicilar = () => {
    if (loading || allLoaded) return;
    setLoading(true);

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const allUsers = res.data;
        const newUsers = allUsers.slice((page - 1) * pageSize, page * pageSize);

        if (newUsers.length === 0) {
          setAllLoaded(true);
        } else {
          setUsers(prev => [...prev, ...newUsers]);
          setPage(prev => prev + 1);
        }
      })
      .catch(() => Alert.alert('Hata oluştu'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    kullanicilar();
  },);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" style={{ margin: 10 }} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetailScreen', { user: item })}
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
        onEndReached={kullanicilar}
        onEndReachedThreshold={0.8}
        ListFooterComponent={renderFooter}
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
