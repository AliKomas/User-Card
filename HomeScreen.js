import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const isFirstLoad = useRef(true);

  const pageSize = 5;
  const USERS_CACHE_KEY = 'users_cache';

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          AsyncStorage.removeItem(USERS_CACHE_KEY).then(() => {
            setUsers([]);
            setPage(1);
            setAllLoaded(false);
            kullanicilar(true);
          });
        } else {
          loadFromCache();
        }
      });
    }
  }, [isConnected]);

  const loadFromCache = async () => {
    try {
      const cached = await AsyncStorage.getItem(USERS_CACHE_KEY);
      if (cached) {
        console.log('Önbellekten veri yüklendi:', JSON.parse(cached).length, 'kullanıcı');
        setUsers(JSON.parse(cached));
        setAllLoaded(true);
      } else {
        console.log('📱 Önbellekte veri bulunamadı');
      }
    } catch (e) {
      console.log('Önbellekten veri okunamadı:', e);
      Alert.alert('Önbellekten veri okunamadı');
    }
  };

  const kullanicilar = (isInitial = false) => {
    if (loading || allLoaded) return;
    
    if (!isConnected) {
      console.log('İnternet bağlantısı yok, API çağrısı yapılmıyor');
      return;
    }
    
    setLoading(true);

    console.log('🌐 API\'den veri çekiliyor... Sayfa:', page);

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(async res => {
        const allUsers = res.data;
        
        if (isInitial) {
          console.log('İlk yüklemeTüm veriler alındı:', allUsers.length, 'kullanıcı');
          setUsers(allUsers);
          setAllLoaded(true);
          
          try {
            await AsyncStorage.setItem(USERS_CACHE_KEY, JSON.stringify(allUsers));
            console.log('Önbelleğe kaydedildi:', allUsers.length, 'kullanıcı');
          } catch (e) {
            console.log('Önbelleğe kaydedilemedi:', e);
          }
        } else {
          const newUsers = allUsers.slice((page - 1) * pageSize, page * pageSize);
          
          if (newUsers.length === 0) {
            setAllLoaded(true);
          } else {
            const updatedUsers = [...users, ...newUsers];
            setUsers(updatedUsers);
            setPage(prev => prev + 1);
            
            try {
              await AsyncStorage.setItem(USERS_CACHE_KEY, JSON.stringify(updatedUsers));
              console.log('Önbelleğe kaydedildi:', updatedUsers.length, 'kullanıcı');
            } catch (e) {
              console.log('Önbelleğe kaydedilemedi:', e);
            }
          }
        }
      })
      .catch((error) => {
        console.log('API hatası:', error.message);
        Alert.alert('Hata oluştu');
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 60 }}
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
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

  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
