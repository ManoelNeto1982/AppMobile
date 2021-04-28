import React, {useRef} from "react";
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Title, Caption, Text, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modalize } from "react-native-modalize";
import { useGlobal } from "../../../components/GlobalContext";

const ProfileScreen = ({ navigation }) => {

  const modalizeRef = useRef(null);

  function OpenModal() {
    modalizeRef.current?.open();
  }

  function closeModal() {
    modalizeRef.current?.close();
  }

  const myContext = useGlobal();

  const removeAccount = async () => {
    try {
      const userList = JSON.parse(await AsyncStorage.getItem("users"));
      const bookList = JSON.parse(await AsyncStorage.getItem("books"));
      const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
      if(userList?.length) {
        await AsyncStorage.setItem("users", JSON.stringify(userList?.filter?.((user) =>
          user?.email !== currentUser?.email)));
        if (bookList?.legth) {
          await AsyncStorage.setItem("books", JSON.stringify(bookList?.filter?.((book) =>
            book?.owner !== currentUser?.email )));
        } else {
          await AsyncStorage.setItem("books", JSON.stringify([]));
        }
      } else {
        await AsyncStorage.setItem("users", JSON.stringify([]));
        return alert("Problema no sitema aparentemente o úsuario não está logado").
        navigation.navigate("SignInScreen");
      }
      //myContext.userEmail = "";
      //myContext.userName = "";
      alert("Conta apagada com sucesso");
      navigation.navigate("SignInScreen");
    } catch (e) {
      console.log(e);
      return alert("Problema na remoção");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          {/* <Avatar.Image
                        source={{
                            uri:'https://scontent.fssa2-1.fna.fbcdn.net/v/t1.6435-1/p160x160/91588976_3412154335481357_848580981005746176_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=7206a8&_nc_ohc=DpGmMOWcfpkAX_3gYRI&_nc_ht=scontent.fssa2-1.fna&tp=6&oh=460904a6dfce27d1fea41c4f2f0d3af6&oe=60976151'
                        }}
                        size={80}
                        marginTop={20}
                    /> */}
          <View style={{ marginTop: 30 }}>
            <Title style={styles.title}>{`${myContext.userName}`}</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Entypo name="map" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>comming soon</Text>
        </View>
        <View style={styles.row}>
          <Entypo name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>comming soon</Text>
        </View>
        <View style={styles.row}>
          <Entypo name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {`${myContext.userEmail}`}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={styles.infoBox}>
          <Title>Coming Soon</Title>
          <Caption>Coming Soon</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("Editar Perfil");
          }}
        >
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              color="#FF6347"
              size={25}
            />
            <Text style={styles.menuItemText}>Editar Perfil</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={OpenModal}
        >
          <View style={styles.menuItem}>
            <AntDesign name="delete" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Excluir Conta</Text>
          </View>
        </TouchableRipple>
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
              Deseja excluir sua conta?
            </Text>
          </View>
          <View style={{flexDirection:'row', alignSelf: "center"}}>
            <TouchableOpacity
              onPress={() => {
                removeAccount();
                closeModal();
                window.location.reload();
              }}
              style={styles.panelButtonYes}
            >
              <Text style={styles.panelButtonTitle}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {closeModal()}}
              style={styles.panelButton}
            >
              <Text style={styles.panelButtonTitle}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
    
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#35AAFF",
    alignItems: "center",
    marginVertical: 7,
    width: 100,
    marginHorizontal:5,


  },
  panelButtonYes:{
    padding: 13,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    marginVertical: 7,
    width: 100
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
