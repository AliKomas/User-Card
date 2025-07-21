import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View,Text } from "react-native";


export default function LoginScreen({navigation}) {

const [name,setName]= useState("");
const [phone,setPhone]=useState("");


  return (
    
    <View style={styles.container}>
        <TextInput
        style={styles.textınput}
        value={name}
        onChangeText={setName}
        placeholder="Username"
        />

       
        <TextInput
         style={styles.textınput}
         value={phone}
         onChangeText={setPhone}
         placeholder="Phone"
        />

        <TouchableOpacity style={styles.tiklama} title="Login" onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        
    </View>   
  );
}

const styles = StyleSheet.create({

container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
},

textınput:{
    height: 40,
    width:250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
},
tiklama:{
  marginTop: 10,
  backgroundColor: "black",
  alignItems: "center",   
  justifyContent: "center", 
  width: 200,
  height: 50,              
  borderRadius: 8,         
},
buttonText:{
    color:'white',
    fontWeight: "bold",
    fontSize: 16,
}


})