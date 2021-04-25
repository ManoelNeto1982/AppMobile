import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modalize } from "react-native-modalize";
import { useGlobal } from "../../../components/GlobalContext";

const EditProfileScreen = ({ navigation }) => {
  const modalizeRef = useRef(null);
  function OpenModal() {
    modalizeRef.current?.open();
  }

  const myContext = useGlobal();

  const initialCurrentData = {
    email: "",
    name: "",
    password: "",
  };

  const updateDataFromAsyncStorage = async () => {
    try {
      await AsyncStorage.mergeItem(
        myContext.userEmail,
        JSON.stringify(currentData)
      );
      alert("Dados alterados com sucesso");
    } catch (e) {
      return alert("Erro ao atualizar dados");
    }
  };

  useEffect(() => {
    const takeUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem(myContext.userEmail);
        if (userData !== null) {
          const current = JSON.parse(userData);
          setCurrentData(current);
          setNewData(current);
        } else {
          alert("Erro ao carregar os dados");
        }
      } catch (e) {
        return alert(
          "Houve algum problema em carregar os dados do cliente na página de edição"
        );
      }
    };

    takeUserData();
  }, []);

  const [currentData, setCurrentData] = useState(initialCurrentData);
  const [newData, setNewData] = useState(initialCurrentData);

  const [currentPassword, setCurrentPassword] = useState("");
  const handleChange = (field, value) => {
    setNewData({ ...newData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          {/* <TouchableOpacity>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}    
                        >
                            <ImageBackground
                                source={{
                                    uri:'https://scontent.fssa2-1.fna.fbcdn.net/v/t1.6435-1/p160x160/91588976_3412154335481357_848580981005746176_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=7206a8&_nc_ohc=DpGmMOWcfpkAX_3gYRI&_nc_ht=scontent.fssa2-1.fna&tp=6&oh=460904a6dfce27d1fea41c4f2f0d3af6&oe=60976151' 
                                }}
                                style={{height: 100, width: 100}}
                                imageStyle={{borderRadius: 15}}
                                 >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Icon name="camera" size={35} color="#fff" style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }}/>
                                </View>
                            </ImageBackground>                                
                        </View>
                        </TouchableOpacity>                    */}
          {/* <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>Meu email é: {global.userId}</Text>                   */}
        </View>

        <View style={styles.action}>
          <Feather name="user" size={20} />
          <TextInput
            placeholder="Alterar Nome"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => handleChange("name", text)}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        {/* <View style={styles.action}>
                    <Feather name="lock" size={20}/>
                    <TextInput
                        placeholder='Digite a senha atual'
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        secureTextEntry= {true}
                        style={styles.textInput}
                    />
                </View> */}
        <View style={styles.action}>
          <Feather name="lock" size={20} />
          <TextInput
            placeholder="Digite a nova senha"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(text) => handleChange("password", text)}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={OpenModal} style={styles.commandButton}>
          <Text style={styles.panelButtonTitle}>Alterar Dados</Text>
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
          <View style={{ alignItems: "center", marginTop: "25%" }}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Para continuar, digite sua senha atual
            </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.confirmUpdate}
              autoCapitalize="none"
              onChangeText={(text) => setCurrentPassword(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (currentPassword === currentData.password) {
                if (newData.name) {
                  currentData.name = newData.name;
                  myContext.setUserName(currentData.name);
                }
                if (newData.password) {
                  currentData.password = newData.password;
                }
                updateDataFromAsyncStorage();
                navigation.navigate("Perfil");
              } else
                alert("A senha fornecida não é compativel com a cadastrada");
            }}
            style={styles.panelButton}
          >
            <Text style={styles.panelButtonTitle}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

export default EditProfileScreen;

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
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: "#000000",
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 2,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
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
  confirmUpdate: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
    borderColor: "#1E90FF",
    height: 30,
  },
});
