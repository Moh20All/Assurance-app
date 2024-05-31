import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from '../assets/Colors';
import axios from 'axios';
import ChangePassword from '../components/modifyPassword';
import ModifyEmail from '../components/modifyEmail';
const Profile = ({ route, navigation }) => {
    const { userId = 'defaultUserId', firstName = 'FirstName', lastName = 'LastName' } = route.params || {};
    const [visible,setVisible]=useState(false);
    const [visible2,setVisible2]=useState(false);
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        insuranceNumber: '000754587456',
        statu: true
    };
    const userDataString = JSON.stringify(userId);

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{
                name: 'SignIn'
            }],
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const connect = await axios.get('your-api-endpoint');
                // Handle the response
            } catch (error) {
                // Handle the error
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <QRCode
                    value={userDataString}
                    size={200}
                />
            </View>
            <View style={styles.profileContainer}>
                <Text style={styles.profileName}>{firstName} {lastName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Insurance Number</Text>
                <Text style={styles.infoValue}>{userId}</Text> 
                <View style={[styles.activeIndicator, { backgroundColor: userData.statu ? 'lightgreen' : 'red' }]} />
            </View>

            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <Text style={styles.linkText}>Modify Password</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => setVisible2(true)}>
                    <Text style={styles.linkText}>Modify E-mail</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Image style={styles.logoutIcon} source={require('../assets/icons/logout.png')} />
                <Text style={styles.logoutText}>LogOut</Text>
            </TouchableOpacity>

            <Modal visible={visible} transparent={true} animationType='slide'>
                <ChangePassword visible={()=>setVisible(false)} userId={userId}/>
            </Modal>
            <Modal visible={visible2} transparent={true} animationType='slide'>
                <ModifyEmail visible={()=>setVisible2(false)} userId={userId}/>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#222222',
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
    logoutButton: {
        marginHorizontal: '25%',
        backgroundColor: colors.lightBlue,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '40%',
        borderRadius: 10,
        elevation: 10,
    },
    logoutIcon: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
    logoutText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222',
    },
});

export default Profile;
