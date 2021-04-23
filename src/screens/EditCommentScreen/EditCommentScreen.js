import React,{useRef} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';

const EditCommentScreen = ({navigation}) => {
   
    return(

        <View style={styles.container}>         
            <View style={{margin: 20}}>
                
                <Text style={styles.title}> </Text>  
                <View style={styles.action}>
                    <FontAwesome name="pencil-square-o" size={20}/>
                    <TextInput                                              
                        placeholderTextColor="#666666"                        
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={1}                       
                        style={[styles.textInput], {width:'90%', backgroundColor: '#CACACA', paddingBottom: 125, paddingLeft: 10, marginLeft: 5}}                     
                        
                        />
                                            
                </View>
                <TouchableOpacity onPress={() => {}} style={styles.commandButton}>
                    <Text style={styles.panelButtonTitle}>Salvar Alterações</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.commandButton}>
                    <Text style={styles.panelButtonTitle}>Voltar</Text>
                </TouchableOpacity>
            </View>

            
        </View>
    );
};

export default EditCommentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#1E90FF",
        alignItems: 'center',
        marginTop:10,
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
    header: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#333333",
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
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
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color:"#05375a",
        borderWidth: 1
    },
    title:{
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: '20%',       
        
      },
})
