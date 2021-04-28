import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppContext, { useGlobal } from "../../../components/GlobalContext";
import { Modalize } from "react-native-modalize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

const RegisterProductScreen = (props) => {
  const modalizeRef = useRef(null);
  function OpenModal() {
    modalizeRef.current?.open();
  }

  const navigation = useNavigation();

  const initialBook = {
    title: "",
    author: "",
    sinopse: "",
    owner: "",
  };

  const [bookData, setBookData] = useState(initialBook);

  const registerNewBook = useCallback(
    async ({ title, author, sinopse }) => {
      try {
        const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
        const booksList = JSON.parse(await AsyncStorage.getItem("books"));
        const books = booksList != null ? booksList : [];
        if (books?.find?.((book) => book?.title === title && book?.owner === currentUser?.email)) {
          alert("Já existe um livro com o titulo inserido, escolha outro titulo ou edite o já existente");
        } else {
          const newBook = { title, author, sinopse, owner: currentUser?.email };
          await AsyncStorage.setItem("books", JSON.stringify([...books, newBook]));
          navigation.navigate("HomeScreen");
        }
      } catch (e) {
        //console.log(e);
        return alert("Erro ao inserir dados do livro");
      }     
    },    
    [navigation]    
  );
   
  const handleChange = useCallback((field, value) => {
      setBookData({ ...bookData, [field]: value });
    },
    [bookData, setBookData],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Livro</Text>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
        </View>
        <View style={styles.action}>
          <Feather name="book" size={20} />
          <TextInput
            placeholder="Título do Livro"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => handleChange("title", text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Feather name="user" size={20} />
          <TextInput
            placeholder="Nome do autor"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => handleChange("author", text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="pencil-square-o" size={20} />
          <TextInput
            placeholder="Sinopse"
            placeholderTextColor="#666666"
            autoCorrect={false}
            multiline={true}
            numberOfLines={1}
            onChangeText={(text) => handleChange("sinopse", text)}
            style={
              ([styles.textInput],
              {
                height: 120,
                width: "90%",
                backgroundColor: "#CACACA",
                paddingBottom: 125,
                paddingLeft: 10,
                marginLeft: 5,
              })
            }
          />
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (bookData.title && bookData.sinopse && bookData.author) {
              await registerNewBook(bookData);
            } else {
              alert("Preencha todos os campos!");
            }
          }}
          style={styles.commandButton}
        >
          <Text style={styles.panelButtonTitle}>Cadstrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.commandButton}
        >
          <Text style={styles.panelButtonTitle}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Modalize ref={modalizeRef} snapPoint={360} modalHeight={360}>
        <View style={styles.panel}>
          <View style={{ alignItems: "center" }}>
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
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    padding: 20, 
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
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
    color: "gray",
    height: 30,
    marginBottom: 10,
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
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 12,
    paddingLeft:'25%'
  },
});
