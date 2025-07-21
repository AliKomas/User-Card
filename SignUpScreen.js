import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignUp = () => {
    if (!name || !phone) {
      Alert.alert("Lütfen tüm alanları doldurun");
      return;
    }

    
    const newUser = { name, phone };

   
    navigation.navigate("HomeScreen", { newUser });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Username"
      />

      <TextInput
        style={styles.textInput}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Kaydol</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  textInput: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
