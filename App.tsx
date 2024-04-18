import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './components/splashScreen';
import SignIn from './components/signIn';
import ForgetPasswod from './components/forgetPassword';
import CreateAccount from './components/createAccount';
import CreateAccount2 from './components/createAccount2';




const Stack = createNativeStackNavigator();
const App = ()=>{
  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen component={SplashScreen} name='SplashScreen'  options={{ headerShown: false }}/>
      <Stack.Screen component={SignIn} name='SignIn' options={{ headerShown: false }}/>
      <Stack.Screen component={ForgetPasswod} name='ForgetPassword'options={{ headerShown: false }} />
      <Stack.Screen component={CreateAccount} name='CreateAccount' options={{headerShown:false}}  />
      <Stack.Screen component={CreateAccount2} name={'Page2'} options={{headerShown:false}} />
    </Stack.Navigator>
   </NavigationContainer>
  );
};

export default App;
