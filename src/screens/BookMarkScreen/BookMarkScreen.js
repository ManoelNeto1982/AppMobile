import React,{useState, useRef, useCallback, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Modalize } from "react-native-modalize";
import { useGlobal } from "../../components/GlobalContext";
import AxiosInstance from "../../../axios.config";

const BookMarkScreen = ({navigation}) => {

  const Context = useGlobal();

  //Eu preciso dos dados do livro e do id do usuário, mas initialbook não é chamado em nenhum lugar??  
  const initialBook = {
    title: "",
    owner: Context?.userId
  }

  const modalizeRef = useRef(null);
  
  function OpenModal() {
    modalizeRef.current?.open();
  }

  function closeModal() {
    modalizeRef.current?.close();
  }
 
  const [mark, setMark] = useState('');
  const [markList, setMarkList] = useState([]);
  const [edditingMark, setEdditingMark] = useState(0);
  
  // useEffect(()=> {
  //   console.log(Context.bookId)
  //   console.log(Context.userId)
  // }, [])

  // const addMark = useCallback (
  //   async ({ userId, bookId }) => {
  //     try {
  //       const bookMark = await AxiosInstance?.post(`/users/${userId}/books/${bookId}/marks`, { description: mark })
  //       console.log(bookMark);
  //       // setMarkList([...markList, 
  //       // {key:Math.random().toString() , data:mark }]);
  //       // setMark('')
  //       // console.log(bookMark)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  // );

  // const editMark = (item) => {
  //   setMark(item.data)
  //   setEdditingMark(item.key)
  // }

  // const upadateMark = async () => {
  //   try{
  //     //const newMarkData = await AxiosInstance?.put(`/users/${owner}/books/:id/marks/:id`)
  //     console.log(owner)
  //     setMarkList(list => markList.map(item => item.key === edditingMark  ? { key:item.key, data: newMarkData} : item ))//data: mark
  //     setMark('')
  //     setEdditingMark(0)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // const removeMark =  async (itemKey) => {
  //   try{ 
  //     const newMarkData = await AxiosInstance?.delete(`/users/${owner}/books/:id/marks/:id`)
  //     let list = markList.filter(item => item.key !== itemKey)
  //     setMarkList(list)
  //     console.log(list)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

   return(    
     <ScrollView>     
        <Text style={styles.title}>Meus Marcadores</Text>
        <View style={styles.container}> 
          <View style={styles.form}>
              <TextInput
                style={styles.field}  
                placeholder={'Adicione um marcador'}          
                onChangeText={text=> setMark(text)}
                value={mark}
              />
            <CustomButton
              text={edditingMark === 0 ? "+" : "Up"}
              textSize={20}
              padding={20}
              textColor="white"
              onPressEvent={edditingMark === 0 ? addMark({userId: Context.userId, bookId: Context.bookId}) : upadateMark}
              disabled={mark.length <= 0}
            /> 
          </View>
        </View>
        
        {markList.map((item ) => {
          return (
        <TouchableOpacity onPress={OpenModal}>
        <View style={{width: 325, marginLeft:20, marginRight: 60, marginBottom:10, backgroundColor:  "white", borderRadius: 6, borderColor: "rgba(0,0,0,0.1)"}} key={item.key} >       
          <View style={styles.form2} >              
            <Text style={{marginRight: 50, width: 190, paddingTop:3, fontSize:16, fontWeight: 'bold', paddingRight:10, marginLeft: 10}}>{item.data}</Text>
            <View>
              <TouchableOpacity onPress={() => {removeMark(item.key)}}>
                  <FontAwesome name="trash" size={30} color= "red" style={{
                    opacity: 0.7,
                    marginRight: 15,       
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                    marginTop: 4,                                      
                  }}/>
              </TouchableOpacity>  
            </View>
             <View>    
              <TouchableOpacity  onPress={() => editMark(item)}>
                  <FontAwesome name="pencil-square-o" size={30} color="green" style={{
                    opacity: 0.7,
                    marginRight: 15,       
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                    marginTop: 5
                  }}/>
                </TouchableOpacity>  
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
             onPress={() => {removeMark(item.key)}}             
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
        </TouchableOpacity>
          )
        })}

   
      </ScrollView>
   )
}

export default BookMarkScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 10,
    paddingLeft:'25%'

  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,      
},
  confirmUpdate: {
    borderWidth: 1,
    width:'100%',
    borderRadius: 5,
    borderColor: "#1E90FF",
    height: 30,
    
  }, 
  field: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    padding: 10,
    fontSize: 15,
    color: '#333',
    borderRadius: 5,
    flex: 1,
    marginRight: 15,
  },
  field2: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    padding: 10,
    fontSize: 15,
    color: '#333',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    height: 32,
    marginTop: 5, 
    
  },
  button: {
    backgroundColor: '#00cc99',  
    borderRadius: 5,
    justifyContent: 'center',
    width: 50,
    height: 50,   
  },
  buttonText: {
    color: '#fdfdfd',
    fontSize: 25, 
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  item: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 10,
    marginTop: 15,
    borderRadius: 3,   
  },
  form:{
    flexDirection: 'row',
   
  },
  form2:{
    flexDirection: 'row',
    height: 60,
  },
  clienteListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,  
    borderColor: "rgba(0,0,0,0.1)",
    width: 280,
    marginLeft: 5,
    marginBottom: 2,  
  
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#35AAFF",
    alignItems: "center",
    marginVertical: 7,
    width: 120,
    marginHorizontal:5,


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
  
})
