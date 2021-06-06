import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Caption } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import {  useNavigation, CommonActions } from "@react-navigation/native";
import { useGlobal } from "../../components/GlobalContext";
import Request from "../../Service/request";

const EditProductScreen = () => {    

    const navigation = useNavigation();

    const Context = useGlobal();

    const initialBook = {
        id: Context?.bookId,
        title: "",
        author: "",
        resume: "",
        genre: "",
        owner: Context?.userId
    };

    const [bookData, setBookData] = useState(initialBook);

    const updateBook = async ({ title, author, genre, resume, owner, id }) => {
        const newBook = await Request?.updateBook(owner, id, { title, author, genre, resume });
        Context?.setBookId("");
        navigation.navigate("HomeScreen");
    }

  const handleChange = useCallback((field, value) => {
      setBookData({ ...bookData, [field]: value });
    },
    [bookData, setBookData],
  );

    useEffect(() => {        
        const getBookDataFromApiRest = async () => {
            const book = await Request?.getBook(Context?.userId, Context?.bookId);
            setBookData(book?.data);
        }

        getBookDataFromApiRest();
    }, []);

    return (
        <View style={styles.container}>  
        <Text style={styles.title}>Editar Livro</Text>      
        <Caption style={styles.caption}>Digite apenas nos campos que deseja alterar</Caption> 
            <View style={{margin: 20}}>
                <View style={{alignItems: 'center'}}>
                </View>
                <View style={styles.action}>
                    <Feather name="book" size={20}/>
                    <TextInput
                        placeholder='Alterar título do Livro'
                        placeholderTextColor="#666666"
                        value={`${bookData?.title}`}
                        autoCorrect={false}                        
                        onChangeText={(text) => handleChange('title', text)}
                        style={styles.textInput}/>
                </View>                                    
                <View style={styles.action}>
                    <Feather name="user" size={20}/>
                    <TextInput
                        placeholder='Alterar Nome do autor'
                        placeholderTextColor="#666666"
                        value={`${bookData?.author}`}
                        autoCorrect={false}
                        onChangeText={(text) => handleChange('author', text)}
                     
                        style={styles.textInput}/>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Foundation name="quote" size={24} color="black" />
                    <View>
                        <Picker        
                            selectedValue={bookData?.genre}
                            style={{ height: 30, width: 280, marginLeft:10}}
                            onValueChange={(genre) => handleChange("genre", genre)}
                        >
                            <Picker.Item label="Selecione um gênero" value="" />
                            <Picker.Item label="Aventura" value="aventura" />
                            <Picker.Item label="Biografia" value="biografia" />
                            <Picker.Item label="Contos" value="contos" />
                            <Picker.Item label="Ficção" value="ficção" />
                            <Picker.Item label="Não Ficção" value="NãoFicção" />
                            <Picker.Item label="Romance" value="romance" />
                            <Picker.Item label="Terror" value="terror" />
                        </Picker>
                    </View> 
              </View>
                <View style={styles.action}>
                    <FontAwesome name="pencil-square-o" size={20}/>
                    <TextInput
                        placeholder='Alterar resume'                       
                        placeholderTextColor="#666666"                        
                        value={`${bookData?.resume}`}
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={1}                       
                        onChangeText={(text) => handleChange('resume', text)}
                        // @ts-ignore
                        style={[styles.textInput], { width:'90%', backgroundColor: '#CACACA', paddingBottom: 125, paddingLeft: 10, marginLeft: 5}}                     
                        />
                                            
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if(bookData?.title && bookData?.author && bookData?.resume && bookData?.genre) {
                            updateBook(bookData);
                        } else {
                            alert("Preencha todos os campos");
                        }
                    }}
                    style={styles.commandButton}>
                    <Text style={styles.panelButtonTitle}>Salvar Mudanças </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('HomeScreen')}} style={styles.commandButton}>
                    <Text style={styles.panelButtonTitle}>Cancelar</Text>
                </TouchableOpacity>
            </View>
       
        </View>
    );
};

export default EditProductScreen;

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
    },
    header: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#333333",
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,        
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
        color:"#05375a"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
        marginTop: 12,
        paddingLeft:'30%'
      },
      caption: {
        fontSize: 13,
        lineHeight: 14,   
        paddingLeft:'12%',
        color: 'green'
  },
})
