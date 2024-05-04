import React, { useState } from "react";
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Image, Platform, StyleSheet, Alert } from "react-native";
import ProgressPoints from "../components/ProgressIndicator";
import NextBtn from "../components/NextBtn";
import CustomInputText from "../components/CustomInputText";
import PasswordInput from "../components/PasswordInput";
const Page3 = ({ navigation }) => {

    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)
    const [confirmPass, setConfPass] = useState(null)
    const handlNextBtn = () => {
        if (email == null) {
            Alert.alert("Invalid Email", "Please enter a valide email")
        }
        else if (pass != confirmPass) {
            Alert.alert("Invalid Password", "Please confirm your password again")
        }
        else if (pass == null || pass.length < 8) {
            Alert.alert("Invalid Password", "Password should be length 8 at least")
        }
        else {
            navigation.navigate('Page4');
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
                        
                <View style={styles.container}>

                    <Image style={{width:250,height:250}} source={require('../assets/images/emailPage.jpg')} />


                    <View style={styles.inputBox}>
                        <CustomInputText field={email} label={"Email"} handlData={setEmail} contentType={"email-address"} />
                        <PasswordInput placeholder="Password" onPasswordChange={setPass} />
                        <PasswordInput placeholder="Confirm Password" onPasswordChange={setConfPass} />
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
        backgroundColor:'#FFF'
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