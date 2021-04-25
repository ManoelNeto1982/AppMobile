import React,{useState, useRef} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, CheckBox, Button, Moda, ScrollView} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';


const BookMarkScreen = ({navigation}) => {
  const [isSelected, setSelected] = useState(false);
  const modalizeRef = useRef(null);
  function OpenModal(){
      modalizeRef.current?.open();
  }
   return(    


     <ScrollView>
     
        <Text style={styles.title}>Meus lembretes</Text>
        <View style={styles.container}> 
        <View style={styles.form}>
          <TextInput
            style={styles.field}            
            onChangeText={()=>{}}
          />
          <TouchableOpacity onPress={()=>{}}>
            <View style={styles.button}>
              <Text style={styles.buttonText} >+</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
       
        <View style={{width: 325, marginLeft:20, marginRight: 50, marginBottom:10, backgroundColor:  "white",    borderRadius: 6, borderColor: "rgba(0,0,0,0.1)"}}>       
          <View style={styles.form2}>
            <CheckBox   
            value={isSelected}
              onValueChange={() => setSelected(!isSelected)}
            style={{marginTop: 5, marginRight: 5}}
            />      
            <Text style={{marginRight: 35, width: 190, paddingTop:8, fontSize:16, fontWeight: 'bold', paddingRight:10}}> Ler 12  páginas</Text>
            <View>
              <TouchableOpacity onPress={() => {}}>
                  <FontAwesome name="trash" size={30} color="red" style={{
                    opacity: 0.7,
                    marginRight: 5,       
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                    marginTop: 4
                  }}/>
              </TouchableOpacity>  
            </View>
             <View>    
              <TouchableOpacity  onPress={OpenModal}>
                  <FontAwesome name="pencil-square-o" size={30} color="red" style={{
                    opacity: 0.7,
                    marginRight: 5,       
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                    marginTop: 5
                  }}/>
                </TouchableOpacity>  
            </View>
          </View>          
        </View>
               
        <Modalize ref={modalizeRef} snapPoint={90} modalHeight={300}>
          <View style={styles.panel}>
              <View style={{alignItems:'center', marginTop:"25%"}}>                      
                  <TextInput style={styles.confirmUpdate} autoCapitalize="none"/>                                            
              </View>
              <TouchableOpacity 
                  onPress={() => {
                      
                  }}
              >
                  <Text style={{width: "50%", backgroundColor: "#00cc99", marginLeft:'25%' ,marginVertical: 7, padding: 10, color:'white',alignItems:'center',  fontWeight: 'bold', marginTop:10, borderRadius: 5, textAlign:'center'}}>Salvar Alterações</Text>
              </TouchableOpacity>
          </View> 
        </Modalize>
     
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
    marginRight: 10,
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
    flexDirection: 'row'
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
})
