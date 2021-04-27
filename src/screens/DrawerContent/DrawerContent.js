import React, {useRef, useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../../components/GlobalContext';
import { Feather } from '@expo/vector-icons';
import { useGlobal } from "../../../components/GlobalContext";

export function DrawerContent(props){

    const myContext = useGlobal();

    const signOut = () => {
        myContext.setUserName("");
        myContext.setUserEmail("");
        props.navigation.navigate('SignInScreen');
    }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                           <View style={{ flexDirection:'column'}}>
                                <Title style={styles.title}>{`Usuário: ${myContext.userName}`}</Title>
                                <Caption style={styles.caption}>{`Email: ${myContext.userEmail}`}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={styles.paragraph, styles.section}>80</Paragraph>
                                <Caption style={styles.caption}>Seguindo</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={styles.paragraph, styles.section}>100</Paragraph>
                                <Caption style={styles.caption}>Seguidores</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                name="home-outline"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                            >
                        </DrawerItem>   
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                name="account-outline"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Perfil"
                            onPress={() => {props.navigation.navigate('Perfil')}}
                            >
                        </DrawerItem>                
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                name="book-outline"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Cadastrar Livro"
                            onPress={() => {props.navigation.navigate('RegisterProductScreen')}}
                            >
                        </DrawerItem>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Feather
                                name="bookmark"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Meus Marcadores "
                            onPress={() => {props.navigation.navigate('BookMarkScreen')}}
                            >
                        </DrawerItem>
                </Drawer.Section>


                </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                            />                        
                        )}
                        label="Sign-out"
                        onPress={() => { signOut() }}
                        >
                    </DrawerItem>

                </Drawer.Section>            
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3, 
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
