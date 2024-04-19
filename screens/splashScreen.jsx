import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to SignIn after 2 seconds
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    }, 2400);

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/splashScreen.png')}
      resizeMode="cover"
      style={styles.container}
    >
      {/* Add any content you want to display on the splash screen */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SplashScreen;
