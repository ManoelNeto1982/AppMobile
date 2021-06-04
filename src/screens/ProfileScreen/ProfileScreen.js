import React, {useRef} from "react";
import { 
  View,
  SafeAreaView,
  StyleSheet, 
  TouchableOpacity
} from "react-native";
import { 
  Title,
  Caption,
  Text,
  TouchableRipple
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { useGlobal } from "../../components/GlobalContext";
import Request from "../../Service/request";

const ProfileScreen = ({ navigation }) => {

  const modalizeRef = useRef(null);

  function OpenModal() {
    modalizeRef.current?.open();
  }

  function closeModal() {
    modalizeRef.current?.close();
  }

  const Context = useGlobal();

  const removeAccount = async () => {
    try {
      const userId = Context?.userId;
      const bookList = await Request?.getAllBooks(userId);
      await removeBook(userId, bookList?.data);
      const userRemoved = await Request?.deleteUser(userId);
      console.log(userRemoved);
      setContext();
      dispatch("SignInScreen");
    } catch (error) {
      console.log(error);
      throw alert("Houve um problema na remoção da conta, por favor tente em outro momento");
    }
  };

  const removeBook = (userId, bookList) => {
    bookList?.map( async book => {
      await Request?.deleteBook(userId, book?.id);
    })
  }

  const setContext = () => {
    Context?.setUserId("");
    Context?.setUserEmail("");
    Context?.setUserName("");
  }

  const dispatch = (screen) => {
      navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: screen }], 
      }));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View style={{ marginTop: 30 }}>
            <Title style={styles.title}>{`${Context?.userName}`}</Title>
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
            {`${Context?.userEmail}`}
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
            dispatch("Editar Perfil");
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
        <View >
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
                //window.location.reload();
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
