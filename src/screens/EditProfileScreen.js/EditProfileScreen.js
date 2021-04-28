import React, { useRef, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobal } from "../../../components/GlobalContext";

const EditProfileScreen = ({ navigation }) => {

  const myContext = useGlobal();

  const initialCurrentData = {
    //email: "",
    name: "",
    password: "",
  };

  const [newData, setNewData] = useState(initialCurrentData);

  const updateDataFromAsyncStorage = async ({name, password}) => {
    try {
      const userList = JSON.parse(await AsyncStorage.getItem("users"));
      const userToChangeData = userList?.find?.((user) => user?.email === myContext?.userEmail);
      userToChangeData.name = (name) ? name : userToChangeData.name;
      userToChangeData.password = (password) ? password : userToChangeData.password;
      const newUserList = userList?.filter?.((user) => user.email !== myContext?.userEmail);
      await changeDataFromAsyncStorage({ users: newUserList, newUser: userToChangeData });
    } catch (e) {
      //console.log(e);
      return alert("Erro ao atualizar dados");
    }
  };

  const changeDataFromAsyncStorage = async ({ users, newUser }) => {
    try {
      await AsyncStorage.setItem("users", JSON.stringify([...users, newUser]));
      alert("Dados alterados com sucesso");
      myContext.setUserName(newUser.name);
      navigation.navigate("Perfil");
    } catch (e){
      //console.log(e);
      alert("Erro ao salvar os dados após as alterações");
    }
  }

  const handleChange = (field, value) => {
    setNewData({...newData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
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
          <MaterialCommunityIcons name="email-outline" size={20} />
          <TextInput
            placeholder="Alterar E-mail"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => handleChange("email", text)}
            autoCorrect={false}
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
        <TouchableOpacity 
          onPress={() => updateDataFromAsyncStorage({name: newData.name, password: newData.password})}
          style={styles.commandButton}>
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
