import React, { useState } from "react";
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity, Platform, Image, TextInput, StatusBar, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = ({ navigation }) => {
  const initialSignUpState = {
    email: "",
    name: "",
    password: "",
    registerBooks: [],
  };

  const verifyItemOnAsyncstorage = async (value) => {
    try {
      const userList = await AsyncStorage.getItem("users");

      if (!userList?.find?.((user) => user?.email == value?.email)) {
        await storeDataToAsyncStorage(value);
      } else {
        //console.log(isExist)
        alert("Email já registrado por favor escolha outro email");
      }
    } catch (e) {
      //console.log(e);
      alert("Houve uma falha ao carregar os dados, tente novamente");
    }
  };

  const storeDataToAsyncStorage = async (value) => {
    try {
      const userList = JSON.parse(await AsyncStorage.getItem("users"));
      if (userList?.length) {
        await AsyncStorage.setItem("users", JSON.stringify([...userList, value]));
      } else {
        await AsyncStorage.setItem("users", JSON.stringify([value]));
      }
      await AsyncStorage.setItem("user", JSON.stringify(value));
      alert("Conta criada com sucesso");
      navigation.navigate("SignInScreen");
    } catch (e) {
      throw e;
      //console.log(e);
      return alert("Falha ao salvar tente novamente");
    }
  };

  const [rePassword, setRePassword] = useState("");
  const [dataSignUp, setDataSignUp] = useState(initialSignUpState);

  const handleChange = (field, value) => {
    setDataSignUp({ ...dataSignUp, [field]: value });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#35AAFF" barStyle="light-content"></StatusBar>
      <View style={styles.header}>
        <Text style={styles.text_header}>Cadastre-se Agora!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>Nome de usuário</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Nome do Usuário"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleChange("name", text)}
          />
        </View>
        <Text style={([styles.text_footer], { marginTop: 8 })}>E-mail</Text>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color="#05375a"
          />
          <TextInput
            placeholder="Digite seu E-mail"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        <Text style={([styles.text_footer], { marginTop: 8 })}>Senha</Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} color="#05375a" />
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => handleChange("password", text)}
          />
        </View>
        <Text style={([styles.text_footer], { marginTop: 8 })}>
          Confirmar Senha
        </Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} color="#05375a" />
          <TextInput
            placeholder="Confirmar senha"
            placeholderTextColor="#666666"
            secureTextEntry={true}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setRePassword(text)}
          />
        </View>
        <View>
          <TouchableOpacity
            style={([styles.button], { marginTop: 10 })}
            onPress={() => {
              if (
                dataSignUp.email &&
                dataSignUp.name &&
                dataSignUp.password &&
                rePassword
              ) {
                if (dataSignUp.password === rePassword) {
                  verifyItemOnAsyncstorage(dataSignUp);
                } else return alert("As senhas não são compativeis");
              } else
                return alert(
                  "Preencha todos os campos para poder realizar o cadastro"
                );
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
                    marginTop: 10,
                  },
                ]}
              >
                Cadastrar
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignInScreen");
            }}
            style={[
              styles.signIn,
              {
                borderColor: "#6cb7ff",
                borderWidth: 1,
                marginTop: 10,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: "#6cb7ff" }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
    marginTop: 50,
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
