import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert, Modal, Image } from "react-native";
import NextBtn from "../components/NextBtn";
import ClientInformation from "../components/ClientInformationModal";
import DescriptionModal from "../components/DescriptionModal";
import colors from "../assets/Colors";
import axios from "axios";
import CustomDatePicker from "../components/CustomDatePicker ";

const Sinistre = ({ route, navigation }) => {
    const { contractId } = route.params;
    const { userId } = route.params;

    const [clientModel, setClientModel] = useState(false);
    const [descriptionModel, setDescriptionModel] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedContract, setSelectedContract] = useState(contractId);
    const [city, setCity] = useState();
    const [description, setDescriptio] = useState();
    const [date, setDate] = useState(new Date());
    const [drivingLicense, setDrivingLicense] = useState();
    const [carDocument, setcarDocument] = useState();
    const [contract, setContract] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:3000/assureData', {
                    params: { userId }  // Pass userId as query parameter
                });

                if (response.status === 500) {
                    Alert.alert("Error", "Failed to connect");
                    return;
                }

                setFirstName(response.data.nom_ass);
                setLastName(response.data.prenom_ass);
                setEmail(response.data.email);
                console.log(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "An error occurred while fetching data");
            }
        };
        fetchData();
    }, [userId])

    const handleSubmit = async () => {
        try {
            const sinistreData = {
                contractId: contractId,
                city: city,
                description: description,
                date: date
            };
            const connect = await axios.post('http://10.0.2.2:3000/sinistre', sinistreData)
            if (connect.status === 200) {
                console.log("sinistre response"+connect.data);
                Alert.alert("Claims Received", "You will receive a notification for your appointment time");
                navigation.navigate("Home",{userId:userId});
            }
            else{
                Alert.alert("Failed", "Failed to submit claims try again later")
            }
        } catch (error) {
                console.log(error)
            }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image style={{ width: '80%', height: 250 }} source={require('../assets/images/crash.jpg')} />
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.btn, styles.boxShadow]} onPress={() => { setClientModel(true); }}>
                        <Text style={styles.btnText}>Client Information</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, styles.boxShadow]} onPress={() => { setDescriptionModel(true); }}>
                        <Text style={styles.btnText}>Claims Description</Text>
                    </TouchableOpacity>
                    <View style={[styles.dateSelector, styles.boxShadow, { marginBottom: 20 }]}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#222222" }}>Accident date</Text>
                        <CustomDatePicker onDateChange={setDate} />
                    </View>

                </View>

                <NextBtn
                    value={'Submit'}
                    handleButton={handleSubmit}
                />
            </View>
            <Modal visible={clientModel} transparent={true} animationType='slide'>
                <ClientInformation
                    ass_name={firstName}
                    ass_prenom={lastName}
                    Email={email}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setEmail={setEmail}
                    visible={() => setClientModel(false)}
                />
            </Modal>
            <Modal visible={descriptionModel} transparent={true} animationType='slide'>
                <DescriptionModal
                    /**city, description, drivingLicense, carDocument, contract, Visible */
                    city={city}
                    description={description}
                    setCity={setCity}
                    setDescr={setDescriptio}
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
    dateSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
        borderColor: '#222222',
        backgroundColor: 'white',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '80%'
    }, boxShadow: {
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

export default Sinistre;
