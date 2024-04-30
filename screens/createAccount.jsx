import React, { useRef, useState } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, TextInput, Image, StyleSheet, Platform, Animated, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";
import CustomInputText from "../components/CustomInputText";
import CustomDatePicker from "../components/CustomDatePicker ";
const CreateAccount = ({ route, navigation }) => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const idcmp = route.params;
    const offerid = route.params;

    const handleFirstNameInput = (text) => {
        if (text.length >= 3 && /^[a-zA-Z]+$/.test(text)) {
            setFirstName(text);
        } else {
            setFirstName(null);
        }
    }
    const handleLastNameInput = (text) => {
        if (text.length >= 3 && /^[a-zA-Z]+$/.test(text)) {
            setLastName(text);
        } else {
            setLastName(null);
        }
    }
    const handleNextBtn = () => {
        if (firstName == null || lastName == null || selectedDate == null) {
            if (firstName == null) Alert.alert('Fill the necessary Fields', "Invalide First Name")
            if (lastName == null) Alert.alert('Fill the necessary Fields', "Invalide Last Name")
            if (selectedDate == null) Alert.alert('Fill the necessary Fields', "Please select your Date of Birth")
        } else {
            const currentDate = new Date();
            const birthDate = new Date(selectedDate);
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                Alert.alert('Age Restriction', 'You must be at least 18 years old to proceed.');
            } else {
                navigation.navigate('Page2');
            }

        }
    }

    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    }
    return (
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
                >
                    <View style={styles.container}>
                        <Image source={require('../assets/images/3d_character_206.png')} />
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>

                            <View style={{ width: '80%' }}>
                                <CustomInputText field={firstName} label={'First Name'} handlData={handleFirstNameInput} />

                                <CustomInputText field={lastName} label={'Last Name'} handlData={handleLastNameInput} />

                                <View style={[styles.dateSelector, styles.boxShadow, { marginBottom: 20 }]}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date of Birth</Text>
                                    <CustomDatePicker onDateChange={setSelectedDate} />
                                </View>
                            </View>

                        </View>
                        <NextBtn handleButton={handleNextBtn} value={"Next"} />
                        <ProgressPoints nbrPage={1} />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor:'#FFF'
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
        width: '100%'
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

export default CreateAccount;
