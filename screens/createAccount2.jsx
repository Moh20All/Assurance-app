import React, { useState } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, Image, StyleSheet, Platform, TouchableOpacity, Button, Alert } from "react-native";
import DocumentPicker from 'react-native-document-picker';
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";

const CreateAccount2 = ({ navigation }) => {
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [carDocument, setCarDocument] = useState(null);

    const handleDrivingLicenseUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            setDrivingLicense(res);
            console.log(drivingLicense)
        } catch (err) {
            console.error('Error picking driving license:', err);
        }
    };

    const handleCarDocumentUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            setCarDocument(res);
        } catch (err) {
            console.error('Error picking car document:', err);
        }
    };

    const handleNextBtn = () => {
        if (drivingLicense == null || carDocument == null) {
            Alert.alert('Fill the necessary Fields', 'Please upload your driving license and car document');
        } else {
            navigation.navigate('Page3');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <View style={styles.container}>
                    <Image style={{ width: 250, height: 250 }} source={require('../assets/images/upload.jpg')} />
                    <View style={{width:'100%',alignItems:'center'}}>
                        <TouchableOpacity style={[styles.uploadButton, styles.boxShadow]} onPress={handleDrivingLicenseUpload}>
                            <Text style={styles.uploadButtonText}>Upload Driving License</Text>
                        </TouchableOpacity>
                        {drivingLicense && (
                            <Text>{drivingLicense[0].name}</Text>
                        )}
                    </View>
                    <View style={{width:'100%',alignItems:'center'}}>
                        <TouchableOpacity style={[styles.uploadButton, styles.boxShadow]} onPress={handleCarDocumentUpload}>
                            <Text style={styles.uploadButtonText}>Upload Car Document</Text>
                        </TouchableOpacity>
                        {carDocument && (
                            <Text>{carDocument[0].name}</Text>
                        )}
                    </View>


                    <NextBtn handleButton={handleNextBtn} value={"Next"} />
                    <ProgressPoints nbrPage={2} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFF'
    },
    uploadButton: {
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        borderRadius: 10,
        marginBottom: 20,
    },
    uploadButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    boxShadow: {
        shadowColor: '#222222',
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 22,
    },
});

export default CreateAccount2;
