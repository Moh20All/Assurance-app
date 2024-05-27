import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [firstUse, setFirstUse] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();

    const timer = setTimeout(() => {
      
      console.log(userId+" "+firstUse);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  const getData = async () => {
    try {
      const val1 = await AsyncStorage.getItem('userId');
      const val2 = await AsyncStorage.getItem('firstUse');
      console.log("first use "+ val2 +" user Id "+val1)
      setUserId(val1 !== null ? JSON.parse(val1) : null);
      setFirstUse(val2 !== null ? JSON.parse(val2) : true);
    } catch (e) {
      console.log('failed to read async storage data')
    }
  };
  return (

    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/splashScreen.png')}
        resizeMode="cover"
        style={styles.imageBackground}
      >
      </ImageBackground>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackground: {
    width: 400,
    height: 250,
  },
});

export default SplashScreen;