import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from '../assets/Colors';

const Profile = ({ route, navigation }) => {
    userId = route.params;
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        insuranceNumber: '000754587456',
        statu: true
    };
    // Convert userData object to a JSON string
    const userDataString = JSON.stringify(userData);

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{
                name: 'SignIn'
            }],
        });
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <QRCode
                    value={userDataString}
                    size={200} // Adjust the size as needed
                />
            </View>
            <View style={styles.profileContainer}>
                <Text style={styles.profileName}>{userData.name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>InsuranceNumber</Text>
                <Text style={styles.infoValue}>{userData.insuranceNumber}</Text> 
               <View style={[styles.activeIndicator, { backgroundColor:userData.statu? 'lightgreen':'red' }]} />

            </View>

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.linkText}>Modify Password</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity>
                    <Text style={styles.linkText}>Modify E-mail</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogout} style={{ marginHorizontal: '25%', backgroundColor: colors.lightBlue, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, width: '40%', borderRadius: 10, elevation: 10 }}>
                <Image style={{ width: 30, height: 30, marginHorizontal: 10 }} source={require('../assets/icons/logout.png')} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222222' }}>LogOut</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222222',
        fontSize: 30
    },
    button: {
        marginHorizontal: 20,
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#e1e1e1',
    },
    infoLabel: {
        fontSize: 16,
    },
    infoValue: {
        fontSize: 16,
    },
    activeIndicator: {
        height: 10,
        width: 10,
        borderRadius: 30,
    },
    linkContainer: {
        padding: 20,
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
    },
    qrContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    qrCode: {
        width: 200,
        height: 200,
    },
});

export default Profile;