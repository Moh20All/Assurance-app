import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


const Header = ({ pageName , profile,notification}) => {
    return (
        <View style={[styles.header, styles.boxShadow]}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerTextBold}>{pageName}</Text>
            </View>

            <View style={styles.headerIconsContainer}>
                <TouchableOpacity onPress={notification}>
                    <Image source={require('../assets/icons/notification.png')} style={styles.headerIcons} />
                </TouchableOpacity>
                <TouchableOpacity onPress={profile}>
                    <Image source={require('../assets/icons/profileSettings.png')} style={styles.headerIcons} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        header: {
            width: '100%',
            height: 50,
            flexDirection: 'row',
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFF',
        },
        boxShadow: {
            shadowColor: '#222222',
            shadowOffset: {
                width: 6,
                height: 6
            },
            shadowOpacity: 0.6,
            shadowRadius: 6,
            elevation: 10,
        },
        headerTextContainer: {
            flexDirection: 'column',
        },
        headerText: {
            fontSize: 16,
        },
        headerTextBold: {
            color: '#222222',
            fontSize: 16,
            fontWeight: 'bold',
        },
        headerIconsContainer: {
            flexDirection: 'row',
            width: '15%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5
        },
        headerIcons: {
            width: 25,
            height: 25
        },
    }
);
export default Header