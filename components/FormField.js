import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const formField = (props) => {
    return(
        <View style={styles.container}>
            <FontAwesome
                name={props.nameIcon}
                color={props.colorIcon}
                size={props.sizeIcon}
            />
            <TextInput style={styles.input}
                placeholder={props.fieldName}
                style={styles.input}
                onChangeText={props.event}
                autoCorrect={false}
            />
        </View>
    )
}
export default formField;

const styles = StyleSheet.create({   
    input:{
      flex: 'row',
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