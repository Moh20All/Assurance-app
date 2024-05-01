import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Image, Platform,TouchableOpacity, Text, KeyboardAvoidingView, StyleSheet, TextInput, Alert } from "react-native";
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";

const CreateAccount4 = ({ navigation }) => {
    const [code1, setCode1] = useState("");
    const [code2, setCode2] = useState("");
    const [code3, setCode3] = useState("");
    const [code4, setCode4] = useState("");
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [timer, setTimer] = useState(30);
    useEffect(() => {
        let intervalId;
    
        if (isResendEnabled && timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
    
        if (timer === 0) {
            setIsResendEnabled(false);
        }
    
        return () => clearInterval(intervalId);
    }, [isResendEnabled, timer]);
    
    const handleNextBtn = () => {
        const confirmationCode = "1234"; 

        const enteredCode = code1 + code2 + code3 + code4;

        if (enteredCode === confirmationCode) {
            navigation.navigate("SignIn");
        } else {
            Alert.alert("Invalid Confirmation Code", "Please enter the correct confirmation code.");
        }
    };

    const handleResendCode = () => {
        setIsResendEnabled(true);
        setTimer(30);
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled
                behavior={Platform.OS === "ios" ? "padding" : null}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
            >
                <View style={styles.container}>
                    <Image style={{ width: 250, height: 250 }} source={require("../assets/images/confirmEmail.jpg")} />
                    <View style={styles.codeContainer}>
                        <TextInput
                            style={styles.codeInput}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setCode1(text);
                            }}
                        />
                        <TextInput
                            style={styles.codeInput}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setCode2(text);
                            }}
                        />
                        <TextInput
                            style={styles.codeInput}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setCode3(text);
                            }}
                        />
                        <TextInput
                            style={styles.codeInput}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setCode4(text);
                            }}
                        />
                        
                    </View>
                    {isResendEnabled ? (
                        <Text style={{ color: "red" }}>{`Resend code in ${timer} seconds`}</Text>
                    ) : (
                        <TouchableOpacity onPress={handleResendCode}>
                            <Text style={{ color: "blue" }}>Resend Code</Text>
                        </TouchableOpacity>
                    )}
                    <NextBtn handleButton={handleNextBtn} value={"Next"} />
                    <ProgressPoints nbrPage={4} />
                   
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FFF",
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    codeInput: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 5,
        width: 50,
        height: 50,
        textAlign: "center",
        marginHorizontal: 5,
        fontSize: 20,
    },
});

export default CreateAccount4;
