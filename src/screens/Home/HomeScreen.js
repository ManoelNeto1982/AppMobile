import React from 'react';
import  {KeyboardAvoidingView, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

const HomeScreen = ({navigation}) => {
    return(

        
        <KeyboardAvoidingView style={styles.background}>
            <View>
                <Text style={styles.text}>Olá, seja bem vindo! Clique no menu para continuar</Text>
                
            </View>
            {/* <View style={styles.container}> 

                { <TouchableOpacity style={styles.btn1}>
                    <Text style={styles.text}>Cadastrar Produto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn2}
                    onPress={() => navigation.navigate('ProfileScreen') }>
                    <Text style={styles.text}>Perfil</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.btn4}>
                    <Text style={styles.text}>Sair</Text>
                </TouchableOpacity> }
            </View> */}
        </KeyboardAvoidingView>

    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    
    background:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#26445f',
        backgroundColor: '#FFF',
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
                
       }, 
    btn1:{
        width: 320,
        backgroundColor: '#009900',  
        alignItems: 'center',
        margin: 10
               
    },
    btn2:{
        
        width: 320,
        backgroundColor: '#5c5c8a',  
        alignItems: 'center',
        margin: 10          
    },
    btn3:{
       
        width: 320,
        backgroundColor: 'grey',  
        alignItems: 'center',
        margin: 10          
    },
    btn4:{
       
        width: 320,
        backgroundColor: '#A52A2A',  
        alignItems: 'center',
        margin: 10          
    },
    text:{
        fontSize: 25,
        padding: 15,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#26445f',
        letterSpacing: 2,
        textAlign: 'center',
        marginTop: '5%'


    }
  });
