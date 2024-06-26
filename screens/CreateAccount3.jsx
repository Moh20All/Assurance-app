import React, { useState, useEffect } from "react";
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Image, Platform, StyleSheet, Alert } from "react-native";
import ProgressPoints from "../components/ProgressIndicator";
import NextBtn from "../components/NextBtn";
import CustomInputText from "../components/CustomInputText";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";
const Page3 = ({ navigation, route }) => {

    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)
    const [confirmPass, setConfPass] = useState(null)
    const [validemail, setvalidEmail] = useState(true)
    const [validpass, setvalidPass] = useState(true)
    const [validconfirmPass, setvalidConfPass] = useState(true)
    const { firstName, lastName, selectedDate, idcmp, offerid, drivingLicense, carDocument } = route.params;

    const handlNextBtn = async () => {
        if (email == null) {
            setvalidEmail(false)
            Alert.alert("Invalid Email", "Please enter a valide email")
        }
        else if (pass != confirmPass) {
            setvalidEmail(true)
            setvalidConfPass(false)
            Alert.alert("Invalid Password", "Please confirm your password again")
        }
        else if (pass == null || pass.length < 8) {
            setvalidEmail(true)
            setvalidConfPass(true)
            setvalidPass(false)
            Alert.alert("Invalid Password", "Password should be length 8 at least")
        }
        else {
            try {
                const connect = await axios.get(`http://10.0.2.2:3000/verifyEmail/${email}`);
                if (connect.status === 200) {
                    navigation.navigate('CreateAccount4', { firstName, lastName, selectedDate, idcmp, offerid, drivingLicense, carDocument, email, pass });
                }
                else {
                    if(connect.status === 200){
                        Alert.alert('Warning',`Email already exist`)
                    }
                    
                }
            } catch (error) {
                Alert.alert('Warning',`Email already exist`)

                console.error(error)
            }

        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>

                <View style={styles.container}>

                    <Image style={{ width: 250, height: 250 }} source={require('../assets/images/emailPage.jpg')} />


                    <View style={styles.inputBox}>
                        <CustomInputText field={validemail} label={"Email"} handlData={setEmail} contentType={"email-address"} />
                        <PasswordInput field={validpass} placeholder="Password" onPasswordChange={setPass} />
                        <PasswordInput field={validconfirmPass} placeholder="Confirm Password" onPasswordChange={setConfPass} />
                    </View>

                    <NextBtn handleButton={handlNextBtn} page={"Page4"} value={"Next"} />

                    <ProgressPoints nbrPage={3} />

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
        backgroundColor: '#FFF'
    },
    inputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        borderColor: '#222222',
        backgroundColor: 'white',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '80%'
    },
    inputBox: {
        width: '80%',
        alignItems: 'center',
    }
})

export default Page3;