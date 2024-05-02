import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {//<MaterialIcons name="arrow-back" size={24} color="black" />
}
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
            <View style={styles.profileContainer}>
                <Text style={styles.profileName}>Adam Richmond</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>InsuranceNumber</Text>
                <Text style={styles.infoValue}>000754587456</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>state</Text>
                <View style={styles.activeIndicator} />
            </View>
            <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Modify Password</Text>
            </View>
            <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Modify E-mail</Text>
            </View>
            <TouchableOpacity style={styles.qrContainer}>
                {//<Image source={{ uri: 'your-qr-code-image-uri' }} style={styles.qrCode} />
                }
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
        backgroundColor: 'green',
        borderRadius: 5,
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
