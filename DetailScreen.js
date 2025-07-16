import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { user } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text>Kullanıcı Adı: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Telefon: {user.phone}</Text>
      <Text>Web Sitesi: {user.website}</Text>
      <Text>Adres:</Text>
      <Text>  Sokak: {user.address.street}</Text>
      <Text>  Şehir: {user.address.city}</Text>
      <Text>  Posta Kodu: {user.address.zipcode}</Text>
      <Text>Şirket: {user.company.name}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
