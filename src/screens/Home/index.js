import React, { useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, CommonActions } from "@react-navigation/native";
import { Modalize } from "react-native-modalize";
import { useGlobal } from "../../../components/GlobalContext";
import AxiosInstance from "../../../axios.config";

const HomeScreen = (props) => {
  const modalizeRef = useRef(null);
  
  function OpenModal(bookId) {
    console.log(bookId);
    modalizeRef.current?.open();
  }

  function closeModal() {
    modalizeRef.current?.close();
  }
 
  const navigation = useNavigation();
  
  const Context = useGlobal();

  const [userBooks, setUserBooks] = useState([]);

  const removeBookFromApiRest = useCallback (
    async ({ bookId }) => {
      try {
        const bookToRemove = await AxiosInstance?.get(`/users/${Context?.userId}/books/${bookId}`);
        console.log(bookToRemove);
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: 'HomeScreen'}], 
          }));
      } catch (e) {
        //console.log(e);
        alert("Não foi possivél remover o livro");
      }
    });

  const bookToEdit = async ({ bookId }) => {    
    await AsyncStorage.setItem("bookToEdit", JSON.stringify(title));
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: 'EditProductScreen'}], 
          }));
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchBooks = async () => {
        try {
          const booksList = await AxiosInstance?.get(`/users/${Context?.userId}/books/`);
          const books = booksList?.data;
          if (books?.length && isActive) {
            setUserBooks([...books]);
          } else {
            setUserBooks([]);
          }
        } catch (e) {
          console.log(e);
          return alert("Erro ao pegar os dados dos usuarios para exibir os seus livros postados");
        }
      };

      fetchBooks();

      return () => {
        isActive = false;
      };
    }, [navigation])
  );


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Livros </Text>
        {userBooks.map((book) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <View style={styles.clienteListContainer}>
                  <Text style={styles.name}>{`Título: ${book?.title}`}</Text>
                  <Text style={styles.listItem}>{`Genêro: ${book?.genre}`}</Text>
                  <Text style={styles.listItem}>{`Autor: ${book?.author}`}</Text>
                  <Text style={styles.listItem}>{`Descrição: ${book?.resume}`}</Text>
                  <View style={{ flexDirection: "row", marginLeft: "65%"  }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => {navigation.navigate('BookMarkScreen')}}
                      >
                        <Ionicons
                          name="bookmark-outline"
                          size={30}
                          color="blue"
                          style={{
                            opacity: 0.7,
                            borderWidth: 1,
                            marginRight: 5,
                            borderWidth:1,
                            borderColor: "#fff",
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => { removeBookFromApiRest({bookId: book?.id}); }}
                      >
                        <Icon
                          name="trash"
                          size={30}
                          color="red"
                          style={{
                            opacity: 0.7,
                            marginRight: 5,
                            borderWidth: 1,
                            borderColor: "#fff",
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          bookToEdit({bookId: book?.id});
                        }}
                      >
                        <FontAwesome
                          name="pencil-square-o"
                          size={30}
                          color="green"
                          style={{
                            opacity: 0.7,
                            borderWidth: 1,
                            marginTop: 5,
                            borderColor: "#fff",
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>               
                </View>
              </View>
              <Modalize ref={modalizeRef} snapPoint={360} modalHeight={360}>
              <View style={styles.panel}>
                <View style={{ alignItems: "center", marginTop: "25%" }}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontWeight: "bold",
                      fontSize: 18,
                      marginBottom: 5,
                    }}
                  >
                    Meta alcançada?
                  </Text>
                </View>
                <View style={{flexDirection:'row', alignSelf: "center"}}>
                  <TouchableOpacity
                  onPress={() => {console.log(book?.id); removeBookFromApiRest({bookId: book?.id}); }}           
                  style={styles.panelButton}
                  >
                    <Text style={styles.panelButtonTitle}>Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {closeModal()}}
                    style={styles.panelButtonNo}
                  >
                    <Text style={styles.panelButtonTitle}>Ainda Não</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modalize>   
            </View>                 
          );
          
        })}
      </View>
    
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: "80%",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: "flex-start",
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: "35%",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    fontSize: 16,
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
   
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonNo:{
    padding: 13,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    marginVertical: 7,
    width: 120
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  confirmUpdate: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
    borderColor: "#1E90FF",
    // height:"350",
  },
  comments: {
    borderWidth: 1,
    width: "100%",
    marginTop: 5,
    height: 50,
    borderRadius: 5,
  },
});
