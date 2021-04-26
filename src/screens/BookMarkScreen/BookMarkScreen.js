import React,{useState, useRef} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, CheckBox, ScrollView} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../../component/CustomButton/CustomButton';

const BookMarkScreen = ({navigation}) => {
  const [isSelected, setSelected] = useState(false);
  const [mark, setMark] = useState('');
  const [markList, setMarkList] = useState([]);
  const [edditingMark, setEdditingMark] = useState(0);

  const addMark = () => {
    setMarkList([...markList, 
    {key:Math.random().toString() , data:mark }]);
    setMark('')
  }

  const editMark = (item) => {
    setMark(item.data)
    setEdditingMark(item.key)
  }

  const upadateMark = () => {
    setMarkList(list => markList.map(item => item.key === edditingMark  ? { key:item.key, data: mark} : item ))
    setMark('')
    setEdditingMark(0)
  }

  const removeMark = (itemKey) => {
    let list = markList.filter(item => item.key !== itemKey)
    setMarkList(list)
    console.log(list)
  }
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
              onPressEvent={edditingMark === 0 ? addMark : upadateMark}
              disabled={mark.length <= 0}
            /> 
          </View>
        </View>
    
        {markList.map((item ) => {
          return (
        <View style={{width: 325, marginLeft:20, marginRight: 50, marginBottom:10, backgroundColor:  "white", borderRadius: 6, borderColor: "rgba(0,0,0,0.1)"}} key={item.key} >       
          <View style={styles.form2} >
            <CheckBox   
            value={isSelected}
            onValueChange={() => setSelected(!isSelected)}
            style={{marginTop: 5, marginRight: 5, marginLeft:5}} 
            />      
            <Text style={{marginRight: 35, width: 190, paddingTop:1, fontSize:16, fontWeight: 'bold', paddingRight:10}}>{item.data}</Text>
            <View>
              <TouchableOpacity onPress={() => {removeMark(item.key)}}>
                  <FontAwesome name="trash" size={30} color= "red" style={{
                    opacity: 0.7,
                    marginRight: 5,       
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
})
