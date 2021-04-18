<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 03ee480f5fda62fbb106bfeb0a9ae0da0b737b94
import { View, Text, Button, StyleSheet, TouchableOpacity, Platform, Image, TextInput, StatusBar} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {

  const loggedUser = {
    email: "",
    userName: "",
  }

  const verifyItemOnAsyncstorage = async (value) => {
    try {
      const isExist = await AsyncStorage.getItem(value.email)
      if (isExist !== null) {
        const check = JSON.parse(isExist);
        if (check.password === password) {
          setLoginData(check);
          setCheckData(true);
        } else return alert('Usuario ou senha invalido');  
      } else return alert('Usuario ou senha invalido');
      
    } catch (e) {
      return alert('Ocorreu um erro no login');
    }
  }

  const handleChange = (field, value) => {
    setLoginData({...loggedUser, [field]: value})
  }

  const [checkData, setCheckData] = useState(false);
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState(loggedUser);
=======




const SignInScreen = ({navigation}) => {
>>>>>>> 03ee480f5fda62fbb106bfeb0a9ae0da0b737b94

  return(
    <View style={styles.container}>
      <StatusBar backgroundColor="#35AAFF" barStyle="light-content"></StatusBar>
      <View style={styles.header}>
        <Text style={styles.text_header}>Bem-Vindo!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder="Digite seu e-mail"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
<<<<<<< HEAD
            onChangeText={text => handleChange('email', text)}
=======
>>>>>>> 03ee480f5fda62fbb106bfeb0a9ae0da0b737b94
          />
        </View>
        
        <Text style={[styles.text_footer], {marginTop:30}}>Senha</Text>
        <View style={styles.action}>
          
            <Feather
            name="lock"
            size={20}
            color="#05375a"/>
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#666666"
              secureTextEntry= {true}
              style={styles.textInput}
              autoCapitalize="none"            
<<<<<<< HEAD
              onChangeText={text => setPassword(text)}
=======
>>>>>>> 03ee480f5fda62fbb106bfeb0a9ae0da0b737b94
            />
         
        </View>

        <View style={styles.button}>    
             <TouchableOpacity
                  style={styles.signIn}
<<<<<<< HEAD
                  onPress={() => {
                    if (loginData.email && password) {
                      verifyItemOnAsyncstorage(loginData) 
                    } else return alert('Você precisa preencher todos os campos');
                    if (checkData) {
                      //console.log(loginData);
                      navigation.navigate('HomeScreen')
                    }
               }}
             > 
=======
                  onPress={() => {navigation.navigate('Home')}}
                  
             /> 
>>>>>>> 03ee480f5fda62fbb106bfeb0a9ae0da0b737b94
            <LinearGradient
              colors={['#008bdd', '#6cb7ff']}
              style={styles.signIn}
            ><Text style={[styles.textSign, {
                color:'#fff'
                
              }]}>Entrar</Text>              
            </LinearGradient>
<<<<<<< HEAD
             </TouchableOpacity>
=======
>>>>>>> 03ee480f5fda62fbb106bfeb0a9ae0da0b737b94
            <TouchableOpacity
              onPress={() => {navigation.navigate('SignUpScreen')}}
              style={[styles.signIn, {
                borderColor: '#6cb7ff',
                borderWidth: 1,
                marginTop: 15
              }] }              
            ><Text style={[styles.textSign, {color:'#6cb7ff'}]}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
      </View>
<<<<<<< HEAD
=======

>>>>>>> 03ee480f5fda62fbb106bfeb0a9ae0da0b737b94
    </View>
    

  )
}

export default SignInScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#35AAFF'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop:  -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  iconEye:{
    marginLeft: 100
  }
});
<<<<<<< HEAD
=======



























>>>>>>> 03ee480f5fda62fbb106bfeb0a9ae0da0b737b94
