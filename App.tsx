import React from 'react';
import {
  Text,
  Button
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './components/splashScreen';
import { Image,ImageBackground } from 'react-native';
import SignIn from './components/signIn';



const Stack = createNativeStackNavigator();
const App = ()=>{
  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen component={SplashScreen} name='SplashScreen'  options={{ headerShown: false }}/>
      <Stack.Screen component={SignIn} name='SignIn' options={{ headerShown: false }}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
};

export default App;
