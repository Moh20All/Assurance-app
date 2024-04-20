import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Image,TouchableWithoutFeedback, TouchableOpacity, Keyboard } from "react-native";
import PasswordInput from "../components/PasswordInput";
import CustomInputText from "../components/CustomInputText";
const SignIn = ({ navigation }) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState("");
    const handleUsernameChange = (text) => {
        if(text.length==0)
        {
            setUsername(null)
        }
        else{
            setUsername(text);

        }
        
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleSignIn = () => {
        // Perform sign-in logic with username and password
        console.log("Username:", username);
        console.log("Password:", password);
    };

    const handleKeyboardDismiss = () => {
        Keyboard.dismiss()
    }
    return (
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <View style={styles.container}>
                    <Image source={require('../assets/images/logo.png')} />

                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ height: 50, borderColor: '#222222', borderBottomWidth: 2, width: '80%' }}>
                            <Text style={styles.textStyle}>Sign in to Your Account</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <CustomInputText label={'User Name'} field={username} handlData={handleUsernameChange} />
                            <PasswordInput
                                placeholder="Password"
                                onPasswordChange={handlePasswordChange}
                                field={password}
                            />
                        </View>

                        <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/loginIcon.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                                <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
                            </View>
                            <Image source={require('../assets/icons/greaterThanWhite.png')} style={{ height: 15, width: 15, marginRight: 10 }} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.createAccountBtn} onPress={() => navigation.navigate('CreateAccount')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/user.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                                <Text style={{ color: '#222222', fontSize: 20 }}>Create New Account</Text>
                            </View>
                            <Image source={require('../assets/icons/greaterThanBlack.png')} style={{ height: 15, width: 15, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate('ForgetPassword')}
                        style={{ marginTop: 40 }}
                    >
                        <Text style={[{ color: '#222222', textDecorationLine: 'underline', fontSize: 15 }]}>Forget your password?</Text>
                    </TouchableOpacity>

                    <Text style={[{ color: '#222222', textAlign: 'center' }]}>By using this application, {'\n'}you accept to our <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Terms of Use.</Text></Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    buttonPressed: {
        backgroundColor: 'lightblue',
    },
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
    },
    textStyle: {
        color: '#222222',
        fontWeight: 'bold',
        fontSize: 20,
    },
    inputContainer: {
        width: '80%',
        marginTop: 20,
    },
    input: {
        height: 60,
        borderColor: '#222222',
        backgroundColor: 'white',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: 'center'
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
    loginBtn: {
        height: 70,
        width: '80%',
        backgroundColor: '#222222',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        borderRadius: 50,
        padding: 20
    },
    createAccountBtn: {
        height: 70,
        width: '80%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        borderRadius: 50,
        padding: 20
    }
});

export default SignIn;
