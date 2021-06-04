import React from 'react';
import { 
    View,    
    StyleSheet
} from 'react-native';
import { 
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {    
    Title,
    Caption,  
    Drawer,
    Divider
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { useGlobal } from "../../components/GlobalContext";

export function DrawerContent(props){

    const Context = useGlobal();

    const setContext = () => {
      Context.setUserId("");
      Context.setBookId("");
      Context.setUserName("");
      Context.setUserEmail("");
    }

  const dispatch = (screen) => {
      props.navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: screen }], 
      }));
  }

    const signOut = () => {
        setContext();
        dispatch('SignInScreen');
    }

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                           <View style={{ flexDirection:'column'}}>
                                <Title style={styles.title}>{Context.userName}</Title>
                                <Caption style={styles.caption}>{Context.userEmail}</Caption>
                            </View>
                        </View>
                        <Divider/>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <
// @ts-ignore
                        DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                name="home-outline"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('HomeScreen')}}
                            >
                        </DrawerItem>   
                        <
// @ts-ignore
                        DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                name="account-outline"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Perfil"
                            onPress={() => {dispatch('Perfil')}}
                            >
                        </DrawerItem>                
                        <
// @ts-ignore
                        DrawerItem 
                            icon={({color, size}) => (
                                <Icon
                                name="book-outline"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Cadastrar Livro"
                            onPress={() => {dispatch('RegisterProductScreen')}}
                            >
                        </DrawerItem>
                        <
// @ts-ignore
                        DrawerItem 
                            icon={({color, size}) => (
                                <Feather
                                name="bookmark"
                                color={color}
                                size={size}
                                />                        
                            )}
                            label="Meus Marcadores "
                            onPress={() => {dispatch('BookMarkScreen')}}
                            >
                        </DrawerItem>
                </Drawer.Section>


                </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <
// @ts-ignore
                    DrawerItem 
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
