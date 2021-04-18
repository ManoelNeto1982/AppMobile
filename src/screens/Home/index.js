import React from 'react';
import{ View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import{ useNavigation } from '@react-navigation/native';

import Books from '../../component/Books/index.js';

const HomeScreen = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                source={require('../../assets/blah.jpg')}
                style={styles.image}
                />

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Meus Comentarios</Text>
                    <Text style={styles.text}> - </Text>
                    <Text style={styles.text}>Perfil</Text>
                    <Text style={styles.text}> - </Text>
                    <Text style={styles.text}>Sair</Text>                    
               </View>

            </View>

          <View style={styles.line}/>
     

            <ScrollView>
                <Text style={[styles.text], {marginTop: 20, marginLeft:"25%", marginBottom: 10}}>Participe das discussões on-line</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Books img={require('../../assets/1.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        A Regra é não ter regras
                    </Books>

                    <Books img={require('../../assets/2.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        The Walking Dead - busca e destruição
                    </Books>

                     <Books img={require('../../assets/3.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        Clinica Medica
                    </Books>
                </View>

                 <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Books img={require('../../assets/4.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        The Walking Dead - o caminho para woodbury
                    </Books>

                    <Books img={require('../../assets/5.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        Salmos
                    </Books>

                     <Books img={require('../../assets/6.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        Linux Bible
                    </Books>
                </View>

                 <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Books img={require('../../assets/7.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        BlackHack Linux
                    </Books>

                    <Books img={require('../../assets/8.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        Os Sermões de Charles Spurgeon
                    </Books>

                     <Books img={require('../../assets/9.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        Louco Amor
                    </Books>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Books img={require('../../assets/10.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        BlackBook
                    </Books>

                    <Books img={require('../../assets/11.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        O cristão Em Uma Sociedade não Cristã
                    </Books>

                     <Books img={require('../../assets/12.jpg')} onClick={()=> navigation.navigate('Detail')}>
                        Linux Redes e Servidores
                    </Books>
                </View>                

            </ScrollView>
        </View>
        
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex :1,
        width: '100%',
        backgroundColor: '#FFF'
    },
    header: {
        marginBottom: -90
        
    },
    image: {
        width: '100%',
        height: '50%',        
    },
    textContainer: {
        flexDirection: 'row',
        marginVertical: '4%',
        marginHorizontal: '12%',
    },
    text: {
        // fontFamily: 'Anton_400Regular',
        fontSize: 20,
        marginHorizontal: '1%',
        marginVertical: '1%'
    },
    line:{
        borderBottomColor: '#D8d8d8',
        borderBottomWidth: 15,
        marginTop: -15
        
   }
});