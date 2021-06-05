import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "./CustomButton/CustomButton";
import { useGlobal } from "../../components/GlobalContext";

const MarkItem = ({
  id,
  description,
  edditingMark,
  upadateMark,
  openModal,
  setEdditingMark,
}) => {
  const [text, setText] = useState("");
  const Context = useGlobal();

  useEffect(() => {
    setText(description);
  }, [description]);

  return (
    <TouchableOpacity
      onPress={() => openModal({ markId: id })}
      disabled={edditingMark == id}
    >
      <View
        style={{
          width: 325,
          marginLeft: 20,
          marginRight: 60,
          marginBottom: 10,
          backgroundColor: "white",
          borderRadius: 6,
          borderColor: "rgba(0,0,0,0.1)",
        }}
      >
        <View style={styles.form2}>
          {edditingMark == id ? (
            <>
              <TextInput
                style={styles.field}
                placeholder={"Atualizar marcador"}
                onChangeText={(text) => setText(text)}
                value={text}               
              />
              <CustomButton
                text={"Up"}
                textSize={14}                
                padding={14}  
                margin={2}                            
                textColor="white"            
                onPress={() =>
                  upadateMark({
                    userId: Context.userId,
                    bookId: Context.bookId,
                    markId: id,
                    description: text,
                  })
                }
                disabled={text?.trim?.() == "" || !text?.length}
              />
            </>
          ) : (
            <Text
              style={{
                marginRight: 50,
                width: 190,
                paddingTop: 3,
                fontSize: 16,
                fontWeight: "bold",
                paddingRight: 10,
                marginLeft: 10,
              }}
            >
              {description}
            </Text>
          )}
          <View>
            <TouchableOpacity
              onPress={() => {
                openModal({ markId: id });
              }}
            >
              <FontAwesome
                name="trash"
                size={30}
                color="red"
                style={{
                  opacity: 0.7,
                  marginRight: 15,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 10,
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setEdditingMark(edditingMark == id ? null : id)}
            >
              <FontAwesome
                name="pencil-square-o"
                size={30}
                color="green"
                style={{
                  opacity: 0.7,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 10,
                  marginTop: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: "25%",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  confirmUpdate: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
    borderColor: "#1E90FF",
    height: 30,
  },
  field: {
    borderWidth: 1,
    borderColor: "#DCDCDC",
    padding: 10,
    fontSize: 15,
    color: "#333",
    borderRadius: 5,
    flex: 1,
    marginRight: 15,
  },
  itenField: {
    borderWidth: 1,
    borderColor: "#DCDCDC",
    padding: 10,
    fontSize: 15,
    color: "#333",
    borderRadius: 5,
    flex: 1,
    marginRight: 15,
    width: 125,
  },
  field2: {
    borderWidth: 1,
    borderColor: "#DCDCDC",
    padding: 10,
    fontSize: 15,
    color: "#333",
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    height: 32,
    marginTop: 5    
  },
  button: {
    backgroundColor: "#00cc99",
    borderRadius: 5,
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  buttonText: {
    color: "#fdfdfd",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
  },
  item: {
    borderWidth: 1,
    borderColor: "#dcdcdc",
    padding: 10,
    marginTop: 15,
    borderRadius: 3,
  },
  form: {
    flexDirection: "row",
  },
  form2: {
    flexDirection: "row",
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
    marginHorizontal: 10,
  },
  panelButtonNo: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    marginVertical: 7,
    width: 120,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});

export default MarkItem;
