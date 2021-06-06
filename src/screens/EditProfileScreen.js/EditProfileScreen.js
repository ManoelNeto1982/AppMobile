import React, {   
  useState, 
} from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity, 
  TextInput
} from "react-native";
import { Caption } from 'react-native-paper'
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobal } from "../../components/GlobalContext";
import Request from "../../Service/request";

const EditProfileScreen = ({ navigation }) => {

  const Context = useGlobal();

  const initialCurrentData = {
    email: "",
    name: "",
    password: "",
  };

  const [newData, setNewData] = useState(initialCurrentData);

  const verifyEmailExist = async (email) => {
    try {
      const userList = await Request?.getUsersByEmail(email);
      if (userList?.data?.find((user) => user?.email === email)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      //console.log(error);
      throw alert(`Houve um problema na conexão com o servidor por favor tente novamente mais tarde`);
    }
  };

  const updateDataFromApiRest = async ({ email, name, password }) => {
    try {
      if (Context?.userEmail !== email && await verifyEmailExist(email)) {
        return alert(`Email ja registrado`);
      } else {
        const user = await Request?.getUser(Context.userId);
        const userData = user.data;
        userData.email = (email) ? email : userData.email;
        userData.name = (name) ? name : userData.name;
        userData.password = (password) ? password : userData.password;
        await changeDataOnApiRest(userData);
      }
    } catch (error) {
      //console.log(error);
      throw alert("Erro ao salvar os novos dados, tente novamente mais tarde");
    }
  };

  const changeDataOnApiRest = async ({ email, name, password }) => {
    try {
      const newUserData = await Request?.updateUser(Context.userId, { email, name, password });
      setContext(newUserData?.data);
      navigation.navigate("Perfil");
    } catch (error) {
      //console.log(error);
      //throw alert("Erro ao salvar os novos dados, tente novamente mais tarde");
    }
  }

  const setContext = (newUserData) => {
    Context?.setUserEmail(newUserData?.email);
    Context?.setUserName(newUserData?.name);
  }

  const handleChange = (field, value) => {
    setNewData({...newData, [field]: value });
  };

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Editar Perfil</Text>
       <Caption style={styles.caption}>Digite apenas nos campos que deseja alterar</Caption>
      <View style={{ margin: 20 }}>
        <View style={styles.action}>
          <MaterialCommunityIcons name="email-outline" size={20} />
          <TextInput
            placeholder="Alterar E-mail"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => handleChange("email", text)}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Feather name="user" size={20} />
          <TextInput
            placeholder="Alterar Nome"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => handleChange("name", text)}
            style={styles.textInput}
          />
        </View>
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
          onPress={() => {
              if (newData?.email || newData?.name || newData?.password) {
                updateDataFromApiRest({email: newData?.email, name: newData?.name, password: newData?.password})
              } else {
                return alert(`Preencha pelo menos um dos campos para continuar com a alteração`);
              }
            }
          }
          style={styles.commandButton}>
          <Text style={styles.panelButtonTitle}>Alterar Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Perfil");
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
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 12,
    paddingLeft:'30%'
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,   
    paddingLeft:'12%',
    color: 'green'
  },
});
