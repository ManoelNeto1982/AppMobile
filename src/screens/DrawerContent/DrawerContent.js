import React, {useRef, useState, useEffect} from 'react';
import { View, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function DrawerContent(props){


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                            <Avatar.Image
                                 source={{
                                    uri:'https://scontent.fssa2-1.fna.fbcdn.net/v/t1.6435-1/p160x160/91588976_3412154335481357_848580981005746176_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=7206a8&_nc_ohc=DpGmMOWcfpkAX_3gYRI&_nc_ht=scontent.fssa2-1.fna&tp=6&oh=460904a6dfce27d1fea41c4f2f0d3af6&oe=60976151',
                                }}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection:'column'}}>
                                <Title style={styles.title}>{global.userName}</Title>
                                <Caption style={styles.caption}>{global.userEmail}</Caption>
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
                                <Icon
                                name="account-check-outline"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Suporte"
                            onPress={() => {}}
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
                        onPress={() => {}}
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
