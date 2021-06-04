import React, {
    useState,
    useEffect,
    useCallback,    
} from 'react';
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,    
    StyleSheet,
} from 'react-native';
import { useGlobal } from "../../components/GlobalContext";
import { useNavigation } from "@react-navigation/native";
import Request from "../../Service/request";

const Modal = () => {

    const Context = useGlobal();

    const navigation = useNavigation();

    const initialBook = {
      id: Context?.bookId,
      title: "",
      author: "",
      resume: "",
      genre: "",
      owner: Context?.userId
    };

    const [book, setBook] = useState(initialBook);

    const getBookData = useCallback (
        async ({ id, owner }) => {
            const bookData = await Request?.getBook(owner, id);
            setBook(bookData?.data);
    }, [navigation]);
    
    const removeBookFromApiRest =  async ({ id, owner }) => {
        try {
            const bookToRemove = await Request?.deleteBook(owner, id);
            Context?.setBookId("");
            navigation.navigate("HomeScreen");
        } catch (e) {
            console.log(e);
            alert("Não foi possivél remover o livro");
        }
    };

    useEffect(() => {
       getBookData(book);
    }, [])

    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Deseja excluir o livro abaixo?</Text>      
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <View style={styles.clienteListContainer}>
                  <Text style={styles.title}>{`Título: ${book?.title}`}</Text>
                  <Text style={styles.name}>{`Genêro: ${book?.genre}`}</Text>
                  <Text style={styles.name}>{`Autor: ${book?.author}`}</Text>
                  <Text style={styles.name}>{`Resumo: ${book?.resume}`}</Text>
                  {/* <View style={{ flexDirection: "row", marginLeft: "65%"  }}> */}                
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
                          onPress={() => {removeBookFromApiRest(book); }}           
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
  },
  panel: {
   
    backgroundColor: "#FFFFFF",
    padding: 10
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#00AF00",
    alignItems: "center",
    marginVertical: 7,
    marginHorizontal:5,
    width: 120,
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
