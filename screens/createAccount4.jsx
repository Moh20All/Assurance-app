import React, { useState } from "react";
import { View, SafeAreaView, Image, Platform, Text, KeyboardAvoidingView, StyleSheet, TextInput, Alert } from "react-native";
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";
import PasswordInput from "../components/PasswordInput";

const CreateAccount4 = ({ navigation }) => {
    const [pass, setPass] = useState(null)
    const [confirmPass, setConfPass] = useState(null)


    const handleNextBtn = () => {
        if (pass.length>=8 && confirmPass.length >=8 && pass == confirmPass) { Alert.alert("Welcome") }
        else { Alert.alert("Week Password","The Password should be at least of length 8") }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <View style={styles.container}>
                    <Image source={require('../assets/images/page4BG.png')} />
                    <View style={{ width: '80%' }}>
                        <PasswordInput placeholder="Password" onPasswordChange={setPass} />
                        <PasswordInput placeholder="Confirm Password" onPasswordChange={setConfPass} />
                    </View>
                    <NextBtn handleButton={handleNextBtn} value={"Next"} />
                    <ProgressPoints nbrPage={4} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

})
export default CreateAccount4;
