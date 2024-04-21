import React from "react";
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Image, StyleSheet, Platform, ScrollView, Alert } from "react-native";
import { useState } from "react";
import NextBtn from "../components/NextBtn";
import CustomInputText from "../components/CustomInputText";


const ForgetPasswod = () => {
    const [pressed, setPressed] = useState(false);
    const [useMethod, setMethod] = useState(true);
    const [text, setText] = useState(null);

    const handlePressIn = () => {
        setPressed(true);
    };

    const handlePressOut = () => {
        setPressed(false);
    };
    const handleInputChange = (inputText) => {
        setText(inputText);
        if(inputText.length==0) setText(null)
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <ScrollView style={{ backgroundColor: 'white' }}>

                    <View style={styles.container}>
                        <Image source={require('../assets/images/forgetPasswordBG.jpg')} style={styles.imageBG} />


                        <View style={{ width: '80%', alignItems: 'center', flex: 1 }}>
                            <CustomInputText field={text} 
                            label={useMethod ? "Enter your phone number" : 'Enter your Email'}
                            handlData={handleInputChange}
                            
                            contentType={useMethod ? 'phone-pad' : 'email-address'}
                            />
                            <NextBtn  handleButton={()=>Alert.alert("pressed")} value={"Send Code"}/>
                            
                        </View>


                        <TouchableOpacity activeOpacity={1}
                            onPress={() => setMethod(!useMethod)}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            style={{ marginTop: 40 }}>
                            <Text style={[{ color: '#222222', textDecorationLine: 'underline', fontSize: 15, marginBottom: 110 }, pressed && styles.buttonPressed]}>
                                {useMethod ? "Send via Email" : 'send via phone number'}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',

    },
    imageBG: {
        height: 250,
        width: 250,
        marginVertical: 30
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#222222',
        borderRadius: 10,
        height: 50,
        width: '80%',
        marginTop: 30,
        marginBottom: 10,
    },
    sendCodeBtn: {
        height: 50,
        width: '80%',
        backgroundColor: '#222222',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 30
    },
    buttonPressed: {
        backgroundColor: 'lightblue',
    },
})
export default ForgetPasswod;