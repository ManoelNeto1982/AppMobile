import React,{useRef, useState, useContext, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppContext from '../../../components/GlobalContext';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterProductScreen = ({navigation}) => {
    const modalizeRef = useRef(null);
    function OpenModal(){
        modalizeRef.current?.open();
    }

    const myContext = useContext(AppContext);

    const initialData = {
      email: "",
      name: "",
      password: "",
      registerBooks: []
    }

    const initialBook = {
        title: "",
        author: "",
        sinopse: "",
        comments: []
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem(myContext.userEmail);
                if (userData !== null) {
                    const aux = JSON.parse(userData);
                    setUserData(aux);
                } else {
                    return alert('Não conceguimos obter os dados do cliente corretamente tente novamente mais tarde');
                }
            } catch (e) {
                return alert('Erro na indentificação de usuario');
            }
        };

        getUserData();
     }, [])

    const registerNewBook = async () => {
        userData.registerBooks.push(bookData);
        try {
            await AsyncStorage.mergeItem(myContext.userEmail, JSON.stringify(userData));
            //console.log(userData);
            navigation.navigate('HomeScreen');
        } catch (e) {
            return alert('Erro ao inserir dados do livro');
        }
    };

    const handleChange = (field, value) => {
        setBookData({...bookData, [field]: value}); 
    };

    const [userData, setUserData] = useState(initialData);
    const [bookData, setBookData] = useState(initialBook);

    return(

        <View style={styles.container}>         
            <View style={{margin: 20}}>
                <View style={{alignItems: 'center'}}>
                    {/* <TouchableOpacity onPress={OpenModal}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ImageBackground
                                source={require('../../assets/1.jpg')}
                                style={{height: 100, width: 100}}
                                imageStyle={{borderRadius: 15}}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Icon name="camera" size={35} color="#fff" style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }}/>
                                </View>
                            </ImageBackground>                                
                        </View>
                    </TouchableOpacity> */}
                </View>

                <View style={styles.action}>
                    <Feather name="book" size={20}/>
                    <TextInput
                        placeholder='Título do Livro'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={text => handleChange('title', text)}
                        style={styles.textInput}/>
                </View>                                    
                <View style={styles.action}>
                    <Feather name="user" size={20}/>
                    <TextInput
                        placeholder='Nome do autor'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={text => handleChange('author', text)}
                        style={styles.textInput}/>
                </View>
                <View style={styles.action}>
                    <FontAwesome name="pencil-square-o" size={20}/>
                    <TextInput
                        placeholder='Sinopse'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={4}                       
                        onChangeText={text => handleChange('sinopse', text)}
                        style={[styles.textInput], {height: 120, width:'90%', backgroundColor: '#CACACA', paddingBottom: 125, paddingLeft: 10, marginLeft: 5}}                     
                        />
                                            
                </View>
                <TouchableOpacity onPress={() => {
                    if (bookData.title && bookData.sinopse && bookData.author) {
                         registerNewBook();
                    }
                    }} style={styles.commandButton}>
                    <Text style={styles.panelButtonTitle}>Cadstrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.goBack()}} style={styles.commandButton}>
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

export default RegisterProductScreen;

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
