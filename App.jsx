import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/splashScreen';
import SignIn from './screens/signIn';
import ForgetPasswod from './screens/forgetPassword';
import CreateAccount from './screens/createAccount';
import Companies from './screens/Companies';
import CreateAccount4 from './screens/createAccount4';
import Home from './screens/home';
import FirstUse from './screens/FirstUse'
import Brows from './screens/BrowsOffers';
import CreateAccount2 from './screens/createAccount2';
import DisplayOffers from './screens/DisplayOffers';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={SplashScreen} name='SplashScreen' options={{ headerShown: false }} />
        <Stack.Screen component={SignIn} name='SignIn' options={{ headerShown: false }} />
        <Stack.Screen component={ForgetPasswod} name='ForgetPassword' options={{ headerShown: false }} />
        <Stack.Screen component={CreateAccount} name='CreateAccount' options={{ headerShown: false }} />
        <Stack.Screen component={CreateAccount2} name='Page2' options={{ headerShown: false }} />
        <Stack.Screen component={Companies} name={'Companies'} options={{ headerShown: false }} />
        <Stack.Screen component={Brows} name="Offers" options={{ headerShown: false }} />
        <Stack.Screen component={CreateAccount4} name={'Page4'} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{ isValid: true }}
          options={{ headerShown: false }}
        />
        <Stack.Screen component={FirstUse} name={'Welcome'} options={{ headerShown: false }} />
        <Stack.Screen component={DisplayOffers} name={'OffersDisplay'} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;