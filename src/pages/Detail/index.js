import React from 'react';
import{View, Text, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Button from '../../component/Button/index.js'

export default function Detail ({navigation}){
    navigation.setOptions({
        headerTitle: 'Deixe seu comentario'
    })

    return (
      <ScrollView style={styles.container}>
        <Image
          source={require("../../assets/1.jpg")}
          style={styles.image}
          resizeMode="center"
        />

        <View>
          <View opacity={0.4}>
            <Text style={[styles.title, { fontSize: 15 }]}>
              Diga sua opnião sobre o livro
            </Text>
          </View>
          <View>
            <Text style={[styles.title, { fontSize: 20 }]}>
              {" "}
              A Regra é não ter regras
            </Text>
          </View>

          <View style={styles.textContent}>
            <Text style={styles.textList}>
              - Autor: Reed Hastings, Erin Meyer
            </Text>
            <Text style={styles.textList}>- Gênero: Biografia</Text>

            <Text style={styles.textComent}> COMENTARIO: 
              Primeiro livro escrito pelo CEO da Netflix conta os bastidores da
              cultura da empresa Nunca houve uma empresa como a Netflix. De um
              serviço de locação de DVDs por correio a uma superpotência de
              streaming, em vinte anos a companhia se tornou um dos principais
              nomes das indústrias de entretenimento do mundo.
            </Text>
          </View>

          <Button />
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF",
  },
  image: {
    width: "50%",
    marginLeft:'25%',
    marginVertical: "-75%",
  },
  title: {
    fontFamily: "Anton_400Regular",
    paddingHorizontal: "2%",
  },
  textContent: {
    fontSize: 15,
    lineHeight: 25,
    marginVertical: "-1%",
    paddingHorizontal: "2%",
  },
  textComent: {
    fontSize: 15,
    lineHeight: 25,
    marginVertical: "2%",
    paddingHorizontal: "2%",
  },
  textTitle: {
    fontSize: 22,
    marginVertical: "2%",
  },
  textList: {
    fontSize: 16,
    lineHeight: 25,
  },
});