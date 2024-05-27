import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
const UploadDocuments = ({ handleDrivingLicenseUpload, handleCarDocumentUpload, handleContact,drivingLicense, carDocument,sinistre }) => {
    return (
        <View style={{ width: '100%' }}>
            <View style={{ width: '100%', alignItems: 'center', marginVertical: 30 }}>
                <TouchableOpacity style={[styles.uploadButton, styles.boxShadow]} onPress={handleDrivingLicenseUpload}>
                    <Text style={styles.uploadButtonText}>Upload Driving License</Text>
                </TouchableOpacity>
                {drivingLicense && (
                    <Text>{drivingLicense[0].name}</Text>
                )}
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity style={[styles.uploadButton, styles.boxShadow]} onPress={handleCarDocumentUpload}>
                    <Text style={styles.uploadButtonText}>Upload Car Document</Text>
                </TouchableOpacity>
                {carDocument && (
                    <Text>{carDocument[0].name}</Text>
                )}
            </View>
            {sinistre && <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity style={[styles.uploadButton, styles.boxShadow]} onPress={handleContact}>
                    <Text style={styles.uploadButtonText}>Upload Contract</Text>
                </TouchableOpacity>
                {carDocument && (
                    <Text>{carDocument[0].name}</Text>
                )}
            </View>}
        </View>
    );
};
const styles = StyleSheet.create(
    {
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
    }
)
export default UploadDocuments;
