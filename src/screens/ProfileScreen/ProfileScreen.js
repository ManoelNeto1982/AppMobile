import React, { useState, useEffect } from 'react';
import { View,  SafeAreaView, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {Avatar, Title, Caption, Text, TouchableRipple} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {

    const removeAccount = async () => {
        try {
            await AsyncStorage.removeItem(global.userEmail);
            global.userEmail = "";
            global.userName = "";
            alert('Conta apagada com sucesso');
        } catch (e) {
            return alert('Problema na remoção');
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                        source={{
                            uri:'https://scontent.fssa2-1.fna.fbcdn.net/v/t1.6435-1/p160x160/91588976_3412154335481357_848580981005746176_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=7206a8&_nc_ohc=DpGmMOWcfpkAX_3gYRI&_nc_ht=scontent.fssa2-1.fna&tp=6&oh=460904a6dfce27d1fea41c4f2f0d3af6&oe=60976151'
                        }}
                        size={80}
                        marginTop={20}
                    />
                    <View style={{marginLeft: 10, marginTop:30}}>
                        <Title style={styles.title}>{global.userName}</Title>
                    </View>
                </View>
            </View>
                            
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Entypo name='map' color='#777777' size={20}/>
                    <Text style={{color:'#777777', marginLeft: 20}}>comming soon</Text>
                </View>
                <View style={styles.row}>
                    <Entypo name='phone' color='#777777' size={20}/>
                    <Text style={{color:'#777777', marginLeft: 20}}>comming soon</Text>
                </View>
                <View style={styles.row}>
                    <Entypo name='email' color='#777777' size={20}/>
                    <Text style={{color:'#777777', marginLeft: 20}}>{global.userEmail}</Text>
                </View>                
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Trocas realizadas</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {navigation.navigate("Editar Perfil")}}>
                    <View style={styles.menuItem}>
                        <MaterialCommunityIcons name="account-edit-outline" color='#FF6347' size={25}/>
                        <Text style={styles.menuItemText}>Editar Perfil</Text>
                    </View>
                </TouchableRipple>                         
                <TouchableRipple onPress={() => { 
                        removeAccount();
                        navigation.navigate('SignInScreen');
                    }
                    }>
                    <View style={styles.menuItem}>
                        <AntDesign name="delete" color='#FF6347' size={25}/>
                        <Text style={styles.menuItemText}>Excluir Conta</Text>
                    </View>
                </TouchableRipple>
              
            </View>

        </SafeAreaView>

    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1 
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    },
})
