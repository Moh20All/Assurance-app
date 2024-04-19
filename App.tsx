import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/splashScreen';
import SignIn from './screens/signIn';
import ForgetPasswod from './screens/forgetPassword';
import CreateAccount from './screens/createAccount';
import CreateAccount2 from './screens/createAccount2';
import Home from './screens/Home'



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
      <Stack.Screen component={Home} name={'Home'} options={{headerShown:false}} />
    </Stack.Navigator>
   </NavigationContainer>
  );
};

export default App;
