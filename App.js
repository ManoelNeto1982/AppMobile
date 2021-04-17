import 'react-native-gesture-handler';
import React, { useEffect } from 'react';  
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerContent} from './src/screens/DrawerContent/DrawerContent'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import EditProfileScreen from './src/screens/EditProfileScreen.js/EditProfileScreen'
import SignInScreen from './src/screens/SignInScreen/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen'
// import RootStackScreen from './src/screens/RootStackScreen/RootStackScreen'




const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const EditProfileStack = createStackNavigator();
const SignInStack = createStackNavigator();
const SignUpStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home"
     component={HomeScreen}
      options={{
        title: '',
        headerLeft: () => (
            <Icon.Button
             name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}>                
              </Icon.Button>
        )
        }} />        
  </HomeStack.Navigator>
);


const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator
   screenOptions={{
    headerStyle:{
      backgroundColor: '#fff',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
  <ProfileStack.Screen 
      name="Profile"
      component={ProfileScreen}
      options={{
        title: '',
      headerLeft: () => (
      <Icon.Button 
        name="ios-menu"
        size={25}
        backgroundColor="#fff"
        color="#000"
        onPress={() => navigation.openDrawer()}
      />
      ),
      }} /> 
  </ProfileStack.Navigator>
);

const EditProfileStackScreen = ({navigation}) => (
  <EditProfileStack.Navigator
   screenOptions={{
    headerStyle:{
      backgroundColor: '#fff',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
  <EditProfileStack.Screen 
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: '',
      headerLeft: () => (
      <Icon.Button 
        name="ios-menu"
        size={25}
        backgroundColor="#fff"
        color="#000"
        onPress={() => navigation.openDrawer()}
      />
      ),
      }} /> 
  </EditProfileStack.Navigator>
);

const App = () =>{
  return (      
    <NavigationContainer>
       {/* <RootStackScreen/>  */}
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="SignInScreen" component={SignInScreen}/>
              <Drawer.Screen name="SignUpScreen" component={SignUpScreen}/>
              <Drawer.Screen name="Home" component={HomeStackScreen} />
              <Drawer.Screen name="Perfil" component={ProfileStackScreen}  />
            <Drawer.Screen name="Editar Perfil" component={EditProfileStackScreen}  />
          </Drawer.Navigator>  
        ) 
      </NavigationContainer>
  
  );
}

export default App

const styles = StyleSheet.create({
  loadingIcon:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})