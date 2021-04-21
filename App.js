import 'react-native-gesture-handler';
import React, { useState } from 'react';  
import { StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerContent} from './src/screens/DrawerContent/DrawerContent'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen.js/EditProfileScreen'
import SignInScreen from './src/screens/SignInScreen/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen'
import EditProductScreen from './src/screens/EditBookScreen/EditBookScreen'
import Home from './src/screens/Home/index';
import RegisterProductScreen from './src/screens/RegisterProductScreen/RegisterProductScreen';
import AppContext from './components/GlobalContext';


const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const EditProfileStack = createStackNavigator();
const RegisterProductStack = createStackNavigator();
const EditProductStack = createStackNavigator();

const Drawer = createDrawerNavigator();


const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: '#53a7fd',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home"
     component={Home}
      options={{
        title: '',
        headerLeft: () => (
            <Icon.Button
             name="ios-menu"
              size={25}
              backgroundColor="#53a7fd"
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
      backgroundColor: '#53a7fd',
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
        backgroundColor="#53a7fd"
        color="#fff"
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
      backgroundColor: '#53a7fd',
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
        backgroundColor="#53a7fd"
        color="#fff"
        onPress={() => navigation.openDrawer()}
      />
      ),
      }} /> 
  </EditProfileStack.Navigator>
);
const EditProductStackScreen = ({navigation}) => (
  <EditProductStack.Navigator
   screenOptions={{
    headerStyle:{
      backgroundColor: '#53a7fd',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
  <EditProductStack.Screen 
      name="EditProductScreen"
      component={EditProductScreen}
      options={{
        title: '',
      headerLeft: () => (
      <Icon.Button 
        name="ios-menu"
        size={25}
        backgroundColor="#53a7fd"
        color="#fff"
        onPress={() => navigation.openDrawer()}
      />
      ),
      }} /> 
  </EditProductStack.Navigator>
);



const RegisterProductStackScreen = ({navigation}) => (
  <RegisterProductStack.Navigator
   screenOptions={{
    headerStyle:{
      backgroundColor: '#53a7fd',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
  <RegisterProductStack.Screen 
      name="RegisterProduct"
      component={RegisterProductScreen}
      options={{
        title: '',
      headerLeft: () => (
      <Icon.Button 
        name="ios-menu"
        size={25}
        backgroundColor="#53a7fd"
        color="#fff"
        onPress={() => navigation.openDrawer()}
      />
      ),
      }} /> 
  </RegisterProductStack.Navigator>
);

const App = () => {

  const [email, setUserEmail] = useState("");
  const [name, setUserName] = useState("");

  const anotherUserData = {
    userEmail: email,
    userName: name,
    setUserEmail,
    setUserName,
  }

  return (      
    <>
      <AppContext.Provider value={anotherUserData}>
    <>
      <NavigationContainer>
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="SignInScreen" component={SignInScreen}/>
              <Drawer.Screen name="SignUpScreen" component={SignUpScreen}/>
              <Drawer.Screen name="Editar Perfil" component={EditProfileStackScreen}  />
              <Drawer.Screen name="HomeScreen" component={HomeStackScreen}/>
              <Drawer.Screen name="RegisterProductScreen" component={RegisterProductStackScreen}/>
              <Drawer.Screen name="EditProductScreen" component={EditProductStackScreen}/>
              {/* <Drawer.Screen name="Detail" component={Detail}/> */}
              <Drawer.Screen name="Perfil" component={ProfileStackScreen}  />
          </Drawer.Navigator>                                         
      </NavigationContainer>    
    </>
      </AppContext.Provider>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  loadingIcon:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
