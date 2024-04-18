import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useState } from "react";
const SignIn = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(true)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [pressed, setPressed] = useState(false);

    const handlePressIn = () => {
        setPressed(true);
    };

    const handlePressOut = () => {
        setPressed(false);
    };
    const switchView=(nav)=>{
        navigation.navigate(nav);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <View style={styles.container}>
                    <Image source={require('../assets/images/logo.png')} />

                    <View style={{width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                        <View style={{ height: 50, borderColor: '#222222', borderBottomWidth: 2, width: '80%' }}>
                            <Text style={styles.textStyle}>Sign in to Your Account</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={[styles.input, styles.boxShadow]}>
                                <TextInput style={{ width: '100%' }} placeholder="UserName" />
                            </View>
                            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, styles.input, styles.boxShadow]}>
                                <TextInput
                                    placeholder="Password"
                                    secureTextEntry={!passwordVisible}
                                    style={{ width: '90%' }}
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    <Image source={passwordVisible ? require('../assets/icons/hide.png') : require('../assets/icons/show.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <TouchableOpacity style={styles.loginBtn} >

                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/loginIcon.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                                <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
                            </View>

                            <Image source={require('../assets/icons/greaterThanWhite.png')} style={{ height: 15, width: 15, marginRight: 10 }} />

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.createAccountBtn} onPress={() =>switchView('CreateAccount')}>

                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/user.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                                <Text style={{ color: '#222222', fontSize: 20 }}>Create New Account</Text>
                            </View>

                            <Image source={require('../assets/icons/greaterThanBlack.png')} style={{ height: 15, width: 15, marginRight: 10 }} />
                        </TouchableOpacity>


                    </View>


                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>switchView('ForgetPassword')}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={{ marginTop: 40 }}
                    >
                        <Text style={[{ color: '#222222', textDecorationLine: 'underline', fontSize: 15 }, pressed && styles.buttonPressed]}>Forget your password?</Text>

                    </TouchableOpacity>

                    <Text style={[{ color: '#222222', textAlign: 'center' }]}>By using this application, {'\n'}you accept to our <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Terms of Use.</Text></Text>
                
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
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
        justifyContent:'center'
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
