import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const formField = (props) => {
    return(
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder={props.fieldName}
                style={styles.input}
                onChangeText={props.event}
                autoCorrect={false}//Isso serve para não ativar o autocorretor do celular 
            />
        </View>
    );
}
export default formField;

const styles = StyleSheet.create({   
    input:{
      backgroundColor: '#FFF',
      width: '90%',
      marginBottom: 15,
      color: '#222',
      fontSize: 17,
      borderRadius: 7,
      padding: 10,
    },    
    container:{
        alignItems: 'center',
        justifyContent:'center',
        width: '90%',      
       },
  });