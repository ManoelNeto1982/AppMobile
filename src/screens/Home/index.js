import React, {useRef} from 'react';
import{ View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, TextInput} from 'react-native';
import{ useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';

const HomeScreen = ({navigation}) => {

  const comment = useRef(null);
  function OpenModalComment(){
      comment.current?.open();
  }

  
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Lista de Livros </Text>              
                    <View style={{flexDirection:'row'}}>
                        {/* <Image
                        source={require('../../assets/1.jpg')}
                        style={{height: 110, width: 80, marginTop: 2}}
                        // imageStyle={{borderRadius: 25}}
                        /> */}  
                    <View style={{justifyContent:'center'}}>
                    <View style={styles.clienteListContainer}>    
                                <Text style={styles.name}>Título: Harry Potter</Text>
                                <Text style={styles.listItem}>Autor: J.K.Rowlling</Text>                        
                                <Text style={styles.listItem}>Descrição: Harry Potter (Daniel Radcliffe) é um garoto órfão de 10 anos que vive infeliz com seus tios, os Dursley.
                            .</Text>
                            
                            <View style={{flexDirection: 'row', marginLeft:'60%'}}>
                            <View > 
                                  <TouchableOpacity onPress={() => {navigation.navigate("CommentScreen")}}>
                                      <FontAwesome name="comment-o" size={35} color="red" style={{
                                      opacity: 0.7,
                                      marginRight: 5,       
                                      borderWidth: 1,
                                      borderColor: '#fff',
                                      borderRadius: 10,
                                  }}/>
                                  </TouchableOpacity>                            
                              </View>
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
                                      marginTop: 5,
                                      borderColor: '#fff',
                                      borderRadius: 10,
                                  }}/>
                              </TouchableOpacity>   
                              </View>                 
                            </View>

                              <View > 
                              <TextInput style={styles.comments}
                                multiline={true}
                                numberOfLines={1} 
                            
                              ></TextInput>
                              <View style={{flexDirection:'row', marginLeft:250}}>
                              <TouchableOpacity onPress={() => {}}>
                                        <Icon name="trash"  size={22} color="red" style={{
                                        opacity: 0.7,
                                        marginTop: 10,
                                         marginRight:  5,       
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }}/>
                               </TouchableOpacity>
                               <TouchableOpacity onPress={() => {}}>
                                        <FontAwesome name="pencil-square-o" size={22} color="red" style={{
                                        opacity: 0.7,
                                        marginTop: 12,
                                        // marginRight:  50,       
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }}/>
                               </TouchableOpacity>
                               </View>
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
        width: 320,
        marginLeft: 5,
        marginBottom: 2,       
      },      
      panel: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        padding: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: "#000000",
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 2,
        // shadowOpacity: 0.4,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: "#FF6347",
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
      },
        confirmUpdate: {
          borderWidth: 1,
          width:'100%',
          borderRadius: 5,
          borderColor: "#1E90FF",
          // height:"350",
        
      },
      comments: {
        borderWidth: 1,
        width: '100%',
        marginTop: 5,
        height: 50,
        borderRadius: 5,
      


      }

    });
