import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import CustomButton from "../../component/CustomButton/CustomButton";
import { Modalize } from "react-native-modalize";
import { useGlobal } from "../../../components/GlobalContext";
import AxiosInstance from "../../../axios.config";
import MarkItem from "../../component/MarkItem";

const BookMarkScreen = ({ navigation }) => {
  const Context = useGlobal();

  //Eu preciso dos dados do livro e do id do usuário, mas initialbook não é chamado em nenhum lugar??
  const [mark, setMark] = useState("");
  const [currentMark, setCurrentMark] = useState(null);
  const [markList, setMarkList] = useState([]);
  const [edditingMark, setEdditingMark] = useState(null);

  const modalizeRef = useRef(null);

  const openModal = useCallback(
    ({ markId }) => {
      setCurrentMark(markId);
      modalizeRef.current?.open();
    },
    [modalizeRef.current]
  );

  const closeModal = useCallback(() => {
    setCurrentMark(null);
    modalizeRef.current?.close();
  }, [modalizeRef.current]);

  const getMarks = useCallback(
    async ({ userId, bookId }) => {
      try {
        const bookMark = await AxiosInstance.get(
          `/users/${userId}/books/${bookId}/marks`
        );
        setMarkList([...bookMark.data, ...markList]);
      } catch (e) {
        console.error(e);
      }
    },
    [Context.userId, Context.bookId]
  );

  const addMark = useCallback(
    async ({ userId, bookId, mark }) => {
      try {
        const bookMark = await AxiosInstance?.post(
          `users/${userId}/books/${bookId}/marks`,
          { description: mark }
        );
        setMarkList([
          { id: bookMark?.data?.id, description: bookMark?.data?.description },
          ...markList,
        ]);
        setMark("");
      } catch (e) {
        console.error(e);
      }
    },
    [Context.userId, Context.bookId, markList.length]
  );

  const removeMark = useCallback(
    async ({ userId, bookId, markId }) => {
      try {
        await AxiosInstance?.delete(
          `/users/${userId}/books/${bookId}/marks/${markId}`
        );

        setMarkList(markList.filter((item) => item.id !== markId));
        closeModal();
      } catch (e) {
        console.log(e);
      }
    },
    [Context.userId, Context.bookId, markList.length]
  );

  const upadateMark = useCallback(
    async ({ userId, bookId, markId, ...data }) => {
      try {
        const updatedItem = await AxiosInstance.put(
          `/users/${userId}/books/${bookId}/marks/${markId}`,
          { ...data }
        );
        setMarkList([
          ...markList.map((item) =>
            item.id == updatedItem?.data?.id
              ? { ...item, ...updatedItem?.data }
              : item
          ),
        ]);
        setEdditingMark(null);
      } catch (e) {
        console.log(e);
      }
    },
    [Context.userId, Context.bookId, markList]
  );

  useEffect(() => {
    const { userId, bookId } = Context;
    getMarks({ userId, bookId });
  }, [Context.bookId, Context.userId]);

  return (
    <>
      <ScrollView>
        <Text style={styles.title}>Meus Marcadores</Text>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.field}
              placeholder={"Adicione um marcador"}
              onChangeText={(text) => setMark(text)}
              value={mark}
            />

            <CustomButton
              text={"+"}
              textSize={20}
              padding={20}
              textColor="white"
              onPress={() =>
                addMark({
                  userId: Context.userId,
                  bookId: Context.bookId,
                  mark,
                })
              }
              disabled={mark.length <= 0}
            />
          </View>
        </View>
        {markList.map(({ description, id }, key) => (
          <MarkItem
            description={description}
            id={id}
            key={key}
            edditingMark={edditingMark}
            setEdditingMark={setEdditingMark}
            upadateMark={upadateMark}
            openModal={openModal}
            closeModal={closeModal}
          />
        ))}
      </ScrollView>

      <Modalize ref={modalizeRef} snapPoint={180} modalHeight={180}>
        <View style={styles.panel}>
          <View style={{ alignItems: "center", marginTop: "2%" }}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Meta alcançada?
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => {
                removeMark({ ...Context, markId: currentMark });
              }}
              style={styles.panelButton}
            >
              <Text style={styles.panelButtonTitle}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}
              style={styles.panelButtonNo}
            >
              <Text style={styles.panelButtonTitle}>Ainda Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </>
  );
};

export default BookMarkScreen;

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
    marginTop: 5,
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
