import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import {  useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobal } from "../../../components/GlobalContext";

const EditProductScreen = (props) => {

    const navigation = useNavigation();

    const myContext = useGlobal();

    const modalizeRef = useRef(null);
    function OpenModal2(){
        modalizeRef.current?.open();
    }

    const initialNewBookState = {
        title: "", 
        author: "",
        sinopse: "",
        owner: myContext.userEmail
    }

    const [bookData, setBookData] = useState(initialNewBookState);

    const saveNewBookOnAsyncStorage = async () => {
        const bookList = JSON.parse(await AsyncStorage.getItem("books"));
        const bookToEdit = JSON.parse(await AsyncStorage.getItem("bookToEdit"));
        const newBooksList = bookList?.filter?.((book) => bookToEdit !== book?.title);
        if (newBooksList?.length) {
            await AsyncStorage.setItem("books", JSON.stringify([...newBooksList, bookData]));
        } else {
            await AsyncStorage.setItem("books", JSON.stringify([bookData]));
        }
        navigation.navigate("HomeScreen");
    }

    const handleChange = (field, value) => {
        setBookData({...bookData, [field]: value})
    }

    useEffect(() => {
        const getBookDataToEditFromAsyncStorage = async () => {
            const bookTitle = JSON.parse(await AsyncStorage.getItem("bookToEdit"));
            const bookList = JSON.parse(await AsyncStorage.getItem("books"));
            const book = bookList?.find?.((book) => bookTitle === book?.title);
            setBookData(book);
        }

        getBookDataToEditFromAsyncStorage();
    }, []);


    return (
        <View style={styles.container}>         
            <View style={{margin: 20}}>
                <View style={{alignItems: 'center'}}>
                </View>
                <View style={styles.action}>
                    <Feather name="book" size={20}/>
                    <TextInput
                        placeholder='Alterar título do Livro'
                        placeholderTextColor="#666666"
                        value={`${bookData.title}`}
                        autoCorrect={false}                        
                        onChangeText={(text) => handleChange('title', text)}
                        style={styles.textInput}/>
                </View>                                    
                <View style={styles.action}>
                    <Feather name="user" size={20}/>
                    <TextInput
                        placeholder='Alterar Nome do autor'
                        placeholderTextColor="#666666"
                        value={`${bookData.author}`}
                        autoCorrect={false}
                        onChangeText={(text) => handleChange('author', text)}
                     
                        style={styles.textInput}/>
                </View>
                <View style={styles.action}>
                    <FontAwesome name="pencil-square-o" size={20}/>
                    <TextInput
                        placeholder='Alterar Sinopse'                       
                        placeholderTextColor="#666666"                        
                        value={`${bookData.sinopse}`}
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={1}                       
                        onChangeText={(text) => handleChange('sinopse', text)}
                        style={[styles.textInput], { width:'90%', backgroundColor: '#CACACA', paddingBottom: 125, paddingLeft: 10, marginLeft: 5}}                     
                        />
                                            
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if(bookData?.title && bookData?.author && bookData?.sinopse) {
                            saveNewBookOnAsyncStorage();
                        } else {
                            alert("Preencha todos os campos");
                        }
                    }}
                    style={styles.commandButton}>
                    <Text style={styles.panelButtonTitle}>Salvar Mudanças </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate("HomeScreen")}} style={styles.commandButton}>
                    <Text style={styles.panelButtonTitle}>Voltar</Text>
                </TouchableOpacity>
            </View>

            <Modalize ref={modalizeRef} snapPoint={360} modalHeight={360}>
                <View style={styles.panel}>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.panelTitle}>Escolher Capa do Livro</Text>
                        <Text style={styles.panelSubtitle}>Escolha sua capa</Text>
                    </View>
                    <TouchableOpacity style={styles.panelButton}>
                        <Text style={styles.panelButtonTitle}>Tirar foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton}>
                        <Text style={styles.panelButtonTitle}>Usar foto do Álbum</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.panelButton}>
                        <Text style={styles.panelButtonTitle}>Excluir Foto</Text>
                    </TouchableOpacity>
                </View> 
            </Modalize>
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
        color:"#05375a"
    }
})
