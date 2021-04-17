import 'react-native-gesture-handler';
import React, { useEffect } from 'react';  
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
//import { createStackNavigator } from '@react-navigation/Stack';
import Icon from 'react-native-vector-icons/Ionicons';
//import {StackContent} from './src/screens/StackContent/StackContent'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
//import HomeScreen from './src/screens/Home/HomeScreen';
import EditProfileScreen from './src/screens/EditProfileScreen.js/EditProfileScreen'
import SignInScreen from './src/screens/SignInScreen/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen'
// import RootStackScreen from './src/screens/RootStackScreen/RootStackScreen'

import Home from './src/pages/Home/index';
import Detail from './src/pages/Detail/index';


const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const EditProfileStack = createStackNavigator();
const SignInStack = createStackNavigator();
const SignUpStack = createStackNavigator();
const Stack = createStackNavigator();

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
              onPress={() => navigation.openStack()}>                
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
        onPress={() => navigation.openStack()}
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
        onPress={() => navigation.openStack()}
      />
      ),
      }} /> 
  </EditProfileStack.Navigator>
);

const App = () =>{
  return (      
    <NavigationContainer>
              <Stack.Navigator StackContent={props => <StackContent {...props} />}>
              <Stack.Screen name="SignInScreen" component={SignInScreen}/>
              <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
              <Stack.Screen name="Perfil" component={ProfileStackScreen}  />
            <Stack.Screen name="Editar Perfil" component={EditProfileStackScreen}  />
            <Stack.Screen
                name="HomeScreen"
                component={Home}
            />
                <Stack.Screen
                name="Detail"
                component={Detail}
            />
          </Stack.Navigator>  
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
