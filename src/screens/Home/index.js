import React, { 
  useState,
  useCallback,
} from "react";
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation, 
  CommonActions 
} from "@react-navigation/native";
import { useGlobal } from "../../components/GlobalContext";
import Request from "../../Service/request";


const HomeScreen = () => {
  
  const navigation = useNavigation();
  
  const Context = useGlobal();

  const [userBooks, setUserBooks] = useState([]);

  const dispatch = (screen) => {
      navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: screen }], 
      }));
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchBooks = async () => {
        try {
          const booksList = await Request?.getAllBooks(Context?.userId);
          const books = booksList?.data;
          if (books?.length && isActive) {
            setUserBooks([...books]);
          } else {
            setUserBooks([]);
          }
        } catch (e) {
          console.log(e);
          return alert("Erro ao pegar os dados dos usuários para exibir os seus livros postados");
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
            <View key={book?.id} style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <View style={styles.clienteListContainer}>
                  <Text style={styles.name}>{`Título: ${book?.title}`}</Text>
                  <Text >{`Genêro: ${book?.genre}`}</Text>
                  <Text >{`Autor: ${book?.author}`}</Text>
                  <Text >{`Resumo: ${book?.resume}`}</Text>
                  <View style={{ flexDirection: "row", marginLeft: "65%"  }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => {Context.setBookId(book.id); dispatch('BookMarkScreen')}}
                      >
                        <Ionicons
                          name="bookmark-outline"
                          size={30}
                          color="blue"
                          style={{
                            opacity: 0.7,
                            borderWidth: 1,
                            marginRight: 5,
                            borderColor: "#fff",
                            borderRadius: 10,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => { 
                          Context?.setBookId(book?.id);
                          dispatch("Modal");
                        }}
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
                          Context?.setBookId(book?.id);
                          dispatch("EditProductScreen");
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
