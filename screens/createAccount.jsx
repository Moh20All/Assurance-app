import React, { useRef, useState } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, TextInput, Image, StyleSheet, Platform, Animated, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";
import CustomInputText from "../components/CustomInputText";
const CreateAccount = ({ navigation }) => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [userName, setUserName] = useState(null);
    const [valid, setValid] = useState(false);

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
    const handleUserNameInput = (text) => {
        if (text.length >= 3 && /^[a-zA-Z]+$/.test(text)) {
            setUserName(text);
        } else {
            setUserName(null);
        }
    }
    const handleNextBtn = () => {
        if (firstName == null || lastName == null || userName == null) {
            if (firstName == null) Alert.alert('Fill the necessary Fields', "Invalide First Name")
            if (lastName == null) Alert.alert('Fill the necessary Fields', "Invalide Last Name")
            if (userName == null) Alert.alert('Fill the necessary Fields', "Invalide User Name")
        } else {
            navigation.navigate('Page2');
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

                                <CustomInputText field={userName} label={'UserName'} handlData={handleUserNameInput} />
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
    },
});

export default CreateAccount;
