import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './screens/splashScreen';
import SignIn from './screens/signIn';
import ForgetPasswod from './screens/forgetPassword';
import CreateAccount from './screens/createAccount';
import CreateAccount2 from './screens/createAccount2';
import CreateAccount4 from './screens/createAccount4';
import Page3 from './screens/createAccount3';


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
      <Stack.Screen component={Page3} name="Page3" options={{headerShown:false}} />
      <Stack.Screen component={CreateAccount4} name={'Page4'} options={{headerShown:false}} />
    </Stack.Navigator>
   </NavigationContainer>
  );
};

export default App;
