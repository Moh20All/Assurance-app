import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Image, Platform, TouchableOpacity, Text, KeyboardAvoidingView, StyleSheet, TextInput, Alert, Modal } from "react-native";
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";
import colors from "../assets/Colors";

const CreateAccount4 = ({ navigation, route }) => {
    const [code1, setCode1] = useState("");
    const [code2, setCode2] = useState("");
    const [code3, setCode3] = useState("");
    const [code4, setCode4] = useState("");
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [timer, setTimer] = useState(30);
    const [showModel, setShowModel] = useState(false);
    const { firstName, lastName, selectedDate, idcmp, offerid, drivingLicense, carDocument, email, pass } = route.params;

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

        if (true) {
            // Prepare data for the POST request
            company = idcmp;
            const requestData = {
                firstName,
                lastName,
                email,
                pass,
                company
            };
            console.log(requestData)
            // Send POST request to server
            fetch('http://10.0.2.2:3000/insert-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigation.navigate("SignIn");
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error message to the user
                Alert.alert("Error", "Failed to create account. Please try again later.");
            });
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
                    <Modal visible={showModel} animationType='fade' transparent={true}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={[styles.modalContent, styles.boxShadow]}>
                                <Image style={{ width: 250, height: 250 }} source={require('../assets/images/hand.jpg')} />
                                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Welcome to Relio <Text style={{ color: colors.blue }}>{firstName} {lastName}</Text></Text>
                                <Text style={{ textAlign: 'center', color: 'black', marginVertical: 20 }}>An email will be sent to you once your document is verified</Text>
                                <NextBtn handleButton={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'SignIn' }]
                                    })
                                }} value={"Sign In"} />
                            </View>
                        </View>
                    </Modal>
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
    boxShadow: {
        shadowColor: '#222222',
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 22,
    },
    modalContent: {
        width: '80%',
        paddingVertical: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});

export default CreateAccount4;
