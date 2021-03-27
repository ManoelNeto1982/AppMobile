import React, { useState, useEffect } from 'react';
import {Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, Animated, Keyboard} from 'react-native';
import FormField from '../components/FormField';

export default function App(){ 

  const loginForm = {
    email: "",
    senha: ""
  }

  const [form, setForm] = useState(loginForm);

  const handleChange = (value, name) => {
    setForm({...form, [name]: value})
  }
  
  
  return(
  <KeyboardAvoidingView style={styles.background}>
    <View style={styles.containerLogo}>
      <Image
        style={{
          width: 130,
          height:155,
          marginLeft: 30               
        }}
        source={require('../../assets/logo.png')}
      />
     </View>

     <View style={styles.container}>
      <FormField      
        fieldName="Email ou nome de usuário"
        event={(text) => handleChange(text, 'nome') }
      />
      <FormField
        fieldName="Senha"
        event={(text) => handleChange(text, 'nome') }
      />
      
      <TouchableOpacity style={styles.btnSubmit}>
        <Text style={styles.submitText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnRegister}>
        <Text style={styles.registerText}>Criar conta</Text>
      </TouchableOpacity>
     </View>
  </KeyboardAvoidingView>

   );
}
const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo:{
    flex: 1,
    justifyContent:'center',
    
  },
  container:{
   flex: 1,
   alignItems: 'center',
   justifyContent:'center',
   width: '90%',
   paddingBottom: 50,   
  }, 
  btnSubmit:{
    backgroundColor: '#35AAFF',
    width:'81%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnRegister:{
    marginTop: 10, 
  },
  registerText:{
    color: '#FFF',
    fontWeight: 'bold',
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  }, 
});
