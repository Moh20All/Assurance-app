import React, { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

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
    justifyContent:'center',
    alignItems:'center'
  },
  imageBackground: {
    width: 400,
    height: 250,
  },
});

export default SplashScreen;