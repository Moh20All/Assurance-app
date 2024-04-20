import React, { useState } from "react";
import { View, SafeAreaView, KeyboardAvoidingView, TextInput, Image, Platform, StyleSheet, Alert } from "react-native";
import ProgressPoints from "../components/ProgressIndicator";
import NextBtn from "../components/NextBtn";
import CustomInputText from "../components/CustomInputText";

const Page3 = ({ navigation }) => {

    const [email,setEmail]=useState(null)
    const [phoneNumber,setPhoneNumber]=useState(null)

    const handlNextBtn=()=>{
        if(email==null)
        {
            Alert.alert("Invalid Email","Please enter a valide email")
        }
        else if(phoneNumber == null || phoneNumber.length !=10)
        {
            Alert.alert("Invalid Phone Number","Please enter a valide Phone Number")
        }
        else{
            navigation.navigate('Page4');
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>

                <View style={styles.container}>

                    <Image source={require('../assets/images/page3BG.png')} />


                    <View style={styles.inputBox}>
                            <CustomInputText  field={email} label={"Email"} handlData={setEmail} contentType={"email-address"}/>
                            <CustomInputText  field={phoneNumber} label={"Phone Number"} handlData={setPhoneNumber} contentType={"phone-pad"}/>
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
        alignItems:'center',
        justifyContent:'space-around',
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
        width:'80%'
    },
    inputBox:{
        width:'80%',
        alignItems:'center',
    }
})

export default Page3;