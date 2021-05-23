import React, {
  useRef,
  useState,
  useEffect,
  useFocusEffect
} from "react";
import {Picker} from '@react-native-picker/picker';
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
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobal } from "../../../components/GlobalContext";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

const RegisterProductScreen = (props) => {

  const [selectedValue, setSelectedValue] = useState("");

  const navigation = useNavigation();

  const Context = useGlobal();

  const initialBook = {
    title: "",
    author: "",
    resume: "",
    genre: "",
    owner: Context?.userId
  };

  const [bookData, setBookData] = useState(initialBook);

  const registerNewBook = useCallback (
    async ({ title, author, resume }) => {
      try {

      } catch (e) {
        console.log(e); 
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
        <View style={{flexDirection:'row'}}>
          <Foundation name="quote" size={24} color="black" />
        <View>
          <Picker        
            selectedValue={selectedValue}
            style={{ height: 30, width: 280, marginLeft:10}}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
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
          <FontAwesome name="pencil-square-o" size={20} />
          <TextInput
            placeholder="resume"
            placeholderTextColor="#666666"
            autoCorrect={false}
            multiline={true}
            numberOfLines={1}
            onChangeText={(text) => handleChange("resume", text)}
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
            if (bookData.title && bookData.resume && bookData.author) {
              await registerNewBook(bookData);
            } else {
              alert("Preencha todos os campos!");
            }
          }}
          
          style={styles.commandButton}
        >
          <Text style={styles.panelButtonTitle}>Cadastrar</Text>
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
