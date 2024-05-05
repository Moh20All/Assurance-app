import React, { useState, useEffect } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, Image, StyleSheet, Platform, TouchableOpacity, Button, Alert } from "react-native";
import DocumentPicker from 'react-native-document-picker';
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";
import UploadDocuments from "../components/UploadDocuments";
const CreateAccount2 = ({ navigation, route }) => {
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [carDocument, setCarDocument] = useState(null);
    const { firstName, lastName, selectedDate, idcmp, offerid } = route.params;


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
            navigation.navigate('Page3', { firstName, lastName, selectedDate, idcmp, offerid, drivingLicense, carDocument });

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
                    <UploadDocuments handleDrivingLicenseUpload={handleDrivingLicenseUpload}
                     handleCarDocumentUpload={handleCarDocumentUpload}
                     drivingLicense={drivingLicense}
                     carDocument={carDocument}
                     />
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
