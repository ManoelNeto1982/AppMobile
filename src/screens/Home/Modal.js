import React, { 
    useState,
    useEffect,
    useRef,
    useCallback,    
} from 'react';
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,    
    StyleSheet,
} from 'react-native';
import { useGlobal } from "../../../components/GlobalContext";
import AxiosInstance from "../../../axios.config";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";

const Modal = (props) => {
    const Context = useGlobal();

    const navigation = useNavigation();

    const [book, setBook] = useState();

    const modalizeRef = useRef(null);
  
    function openModal() {
        modalizeRef.current?.open();
    }

    function closeModal() {
        modalizeRef.current?.close();
    }

    const getBookData = useCallback (
        async () => {
            const bookData = await AxiosInstance?.get(`/users/${Context?.userId}/books/${Context?.bookId}`);
            setBook(bookData?.data);
    })
    
    const removeBookFromApiRest = useCallback (
        async (bookId) => {
        try {
            const bookToRemove = await AxiosInstance?.delete(`/users/${Context?.userId}/books/${bookId}`);
            console.log(bookToRemove);
            Context?.setBookId("");
            navigation.navigate("HomeScreen");
        } catch (e) {
            //console.log(e);
            alert("Não foi possivél remover o livro");
        }
    });

    useEffect(() => {
       getBookData();
    }, [])

    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Deseja excluir o livro abaixo?</Text>      
         
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <View style={styles.clienteListContainer}>
                  <Text style={styles.name}>{`Título: ${book?.title}`}</Text>
                  <Text style={styles.listItem}>{`Genêro: ${book?.genre}`}</Text>
                  <Text style={styles.listItem}>{`Autor: ${book?.author}`}</Text>
                  <Text style={styles.listItem}>{`Resumo: ${book?.resume}`}</Text>                             
                    <View>
                      <View style={styles.panel}>                  
                        <View style={{flexDirection:'row', alignSelf: "center"}}>
                      <TouchableOpacity
                          onPress={() => {navigation.navigate('HomeScreen')}}
                          style={styles.panelButtonNo}
                        >
                          <Text style={styles.panelButtonTitle}>Não</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {removeBookFromApiRest(Context?.bookId); }}           
                          style={styles.panelButton}
                          >
                          <Text style={styles.panelButtonTitle}>Sim</Text>
                          </TouchableOpacity>                       
                        </View>
                      </View>                     
                    </View>                                   
                </View>
              </View>
            </View>     
      </View>    
    </ScrollView>
    );
}

export default Modal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: "80%",
    marginTop:"45%"
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
    marginLeft: "10%",
    width: 320, 
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
    marginHorizontal:5,
    width: 120,
    backgroundColor: "green"
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
