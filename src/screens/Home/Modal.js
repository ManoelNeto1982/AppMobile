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
            const bookToRemove = await AxiosInstance?.get(`/users/${Context?.userId}/books/${bookId}`);
            console.log(bookToRemove);
            //Context?.setBookId("");
            //navigation.navigate("HomeScreen");
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
           <Text>{book?.title}</Text>
           <Text>{book?.author}</Text>
           <Text>{book?.genre}</Text>
           <Text>{book?.resume}</Text>
           <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>

                <Text>Back</Text>
            </TouchableOpacity>
           <TouchableOpacity onPress={openModal}>
                <Text>Remove</Text>
            </TouchableOpacity>
              <Modalize ref={modalizeRef} snapPoint={10} modalHeight={360}>
              <View 
                  //style={styles.panel}
              >
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
                  onPress={() => {removeBookFromApiRest(Context?.bookId); }}           
                  //style={styles.panelButton}
                  >
                    <Text 
                      //style={styles.panelButtonTitle}
                    >Sim</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={closeModal}
                    //style={styles.panelButtonNo}
                  >
                    <Text 
                      //style={styles.panelButtonTitle}
                    >Ainda Não</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modalize>   
        </ScrollView>
    );
}

export default Modal;
