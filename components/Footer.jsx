import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


const Footer = ({navigation}) => {
    return (

        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/icons/hut.png')} style={styles.footerImg} />
                <Text style={styles.footerButtonText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
                <Image source={require('../assets/icons/car-insurance.png')} style={styles.footerImg} />
                <Text style={styles.footerButtonText}>Insurances</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
                <Image source={require('../assets/icons/fender-bender.png')} style={styles.footerImg} />
                <Text style={styles.footerButtonText}>Claims</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        footer: {
            width: '100%',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom:0,
            backgroundColor: '#FFF',
        },
        footerButton: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRightColor: '#222222',
            borderRightWidth: 1,
            width: '33%',
            height: '80%'
        },
        footerButtonText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#222222'
        },
        footerImg: {
            transform: [{ scale: 0.6 }]
        },
    }
);
export default Footer;