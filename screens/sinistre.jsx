import React, { useState } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert, Modal, Image } from "react-native";
import NextBtn from "../components/NextBtn";
import ClientInformation from "../components/ClientInformationModal";
import DescriptionModal from "../components/DescriptionModal";
import colors from "../assets/Colors";

const Sinistre = ({ route, navigation }) => {
    const { contractId } = route.params;
    const { userId } = route.params;

    const [clientModel, setClientModel] = useState(false);
    const [descriptionModel, setDescriptionModel] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedContract, setSelectedContract] = useState(contractId);
    const [city,setCity]=useState();
    const [description,setDescriptio]=useState();
    const [drivingLicense,setDrivingLicense]=useState();
    const [carDocument,setcarDocument]=useState();
    const [contract,setContract]=useState();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image style={{ width: '80%', height: 250 }} source={require('../assets/images/crash.jpg')} />
                <View style={{width:'100%',alignItems:'center'}}>
                    <TouchableOpacity style={[styles.btn, styles.boxShadow]} onPress={() => { setClientModel(true); }}>
                        <Text style={styles.btnText}>Client Information</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, styles.boxShadow]} onPress={() => { setDescriptionModel(true); }}>
                        <Text style={styles.btnText}>Claims Description</Text>
                    </TouchableOpacity>

                </View>

                <NextBtn
                    value={'Submit'}
                    handleButton={() => {
                        Alert.alert("Claims Received", "You will receive a notification for your appointment time");
                        navigation.navigate("Home");
                    }}
                />
            </View>
            <Modal visible={clientModel} transparent={true} animationType='slide'>
                <ClientInformation
                    userId={userId}
                    selectedContract={selectedContract}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setEmail={setEmail}
                    visible={() => setClientModel(false)}
                />
            </Modal>
            <Modal visible={descriptionModel} transparent={true} animationType='slide'>
                <DescriptionModal
                    /**city, description, drivingLicense, carDocument, contract, Visible */
                    city={setCity}
                    description={setDescriptio}
                    drivingLicense={setDrivingLicense}
                    carDocument={setcarDocument}
                    contract={setContract}
                    visible={() => setDescriptionModel(false)}
                    navigation={navigation}
                />
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: "#FFF"
    },
    btn: {
        width: '80%',
        backgroundColor: colors.aqua,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 30
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: colors.textColor
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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default Sinistre;
