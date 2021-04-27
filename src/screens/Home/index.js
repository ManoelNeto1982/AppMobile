import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [allBooksData, setAllBooksData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchBooks = async () => {
        try {
          const booksList = JSON.parse(await AsyncStorage.getItem("books"));
          const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
          const books = booksList?.filter?.((book) => currentUser?.email === book?.owner);
          if (books?.length && isActive) {
            setAllBooksData([...books]);
          } else {
            setAllBooksData([]);
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
        {allBooksData.map((book) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <View style={styles.clienteListContainer}>
                  <Text style={styles.name}>{`Título: ${book.title}`}</Text>
                  <Text style={styles.listItem}>{`Autor: ${book.author}`}</Text>
                  <Text style={styles.listItem}>{`Descrição: ${book.sinopse}`}</Text>
                  <View style={{ flexDirection: "row", marginLeft: "75%" }}>
                    <View>                    
                    </View>
                    <View>
                      <TouchableOpacity>
                        <Icon
                          name="trash"
                          size={35}
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
                          navigation.navigate("EditProductScreen");
                        }}
                      >
                        <FontAwesome
                          name="pencil-square-o"
                          size={35}
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
    alignItems: "center",
    marginVertical: 7,
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
