import React, {useRef} from 'react';
import{ View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TextInput} from 'react-native';
import{ useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const HomeScreen = ({navigation}) => {
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Lista de Livros </Text>              
                    <View style={{flexDirection:'row'}}>
                        <Image
                        source={require('../../assets/1.jpg')}
                        style={{height: 110, width: 80, marginTop: 2}}
                        // imageStyle={{borderRadius: 25}}
                        />
                    <View style={styles.clienteListContainer}>    
                                <Text style={styles.name}>Título: Harry Potter</Text>
                                <Text style={styles.listItem}>Autor: J.K.Rowlling</Text>                        
                                <Text style={styles.listItem}>Descrição: Harry Potter (Daniel Radcliffe) é um garoto órfão de 10 anos que vive infeliz com seus tios, os Dursley.
                            .</Text>
                            <View style={{flexDirection: 'row', marginLeft:'68%'}}>
                            <View > 
                                <TouchableOpacity>
                                    <Icon name="trash" size={35} color="red" style={{
                                    opacity: 0.7,
                                    marginRight: 5,       
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    borderRadius: 10,
                                }}/>
                                </TouchableOpacity>                            
                            </View>
                            <View > 
                            <TouchableOpacity onPress={() => {navigation.navigate("EditProductScreen")}}>
                                    <FontAwesome name="pencil-square-o" size={35} color="red" style={{
                                    opacity: 0.7, 
                                    borderWidth: 1,
                                    marginTop: 3,
                                    borderColor: '#fff',
                                    borderRadius: 10,
                                }}/>
                            </TouchableOpacity>   
                            </View>                 
                            </View>
                         </View>
                    </View>
                </View>
       </ScrollView>

       
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      width: '80%',
      
    },
    buttonContainer: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center"
    },
      button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
      },
      buttonText: {
          color: "white",
          paddingVertical: 6,
          paddingHorizontal: 10,
          fontSize: 16
      },
      title:{
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: '35%'
      },
      name: {
        fontWeight: "bold",
        fontSize: 16
      },
      section: {
        fontSize: 16
      },
      clienteListContainer: {
        marginBottom: 25,
        elevation: 4,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 6,
        borderTopWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        width: '100%',
        marginLeft: 5,
        marginBottom: 2
      },      
    });
