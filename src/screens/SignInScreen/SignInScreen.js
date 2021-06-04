import React, {
  useState,
  useCallback
} from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity, 
  TextInput, 
  StatusBar, 
  CheckBox,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import { useGlobal } from "../../components/GlobalContext";
import { CommonActions } from "@react-navigation/native";
import Request from "../../Service/request";

const SignInScreen = ({ navigation }) => {

  const userData = {
    email: "",
    name: "",
  };

const Context = useGlobal();

  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState(userData);
  const [isSelected, setSelected] = useState(false);

  const verifyItemInApiRest = useCallback (
    async ({ email, password }) => {
      try {
        const userList = await Request?.getUsersByEmail(email);
        const userData = userList?.data?.find((user) => user?.email === email && user?.password === password); 
        if (userData) {
            setContext(userData);
            navigation.navigate("HomeScreen");
        } else {
          alert(`Usuario ou senha invalida`);
        }
      } catch (error) {
        throw alert("Houve um problema no servidor. Tente novamente mais tarde");
      }
    },
    [password],   
  );
  
  const setContext = (currentUser) => {
    Context?.setUserId(currentUser?.id);
    Context?.setUserEmail(currentUser?.email);
    Context?.setUserName(currentUser?.name);
  }

  const dispatch = (screen) => {
      navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: screen }], 
      }));
  }

  const handleChange = (field, value) => {
    setLoginData({ ...loginData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#35AAFF" barStyle="light-content"></StatusBar>
      <View style={styles.header}>
        <Text style={styles.text_header}>Bem-Vindo!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Digite seu e-mail"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        <Text style={([styles.text_footer], { marginTop: 30 })}>Senha</Text>
        <View>
          <View style={styles.action}>
            <Feather name="lock" size={20} color="#05375a" />
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#666666"
              secureTextEntry={true}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={{flexDirection:'row', marginTop:5}}>
            <CheckBox               
              value={isSelected}
              onValueChange={() => setSelected(!isSelected)}
              style={{marginTop: 15, with:15, height:14}} 
              />   
              <Text style={{marginTop:14, color:'blue', fontSize:13, paddingLeft: 5}}>Lembrar minha senha</Text>
            </View>
           </View>
      
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              if (loginData?.email && password) {
                verifyItemInApiRest({ email: loginData.email, password });
              } else return alert("Você precisa preencher todos os campos");
            }}
          >
            <LinearGradient
              colors={["#008bdd", "#6cb7ff"]}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Entrar
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              dispatch("SignUpScreen");
            }}
            style={[
              styles.signIn,
              {
                borderColor: "#6cb7ff",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: "#6cb7ff" }]}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#35AAFF",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
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
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconEye: {
    marginLeft: 100,
  },
});
