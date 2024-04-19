import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const SignIn = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async () => {
        try {
            // Send a GET request to the server using Axios
            const response = await axios.get('http://10.0.2.2:3000/');
            const userData = response.data;

            // Check if user with provided email and password exists in the response data
            const user = userData.find(user => user.email === username && user.password === password);

            if (user) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Invalid credentials', 'Please check your email and password.');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            Alert.alert('Error', 'An error occurred while signing in. Please try again.');
        }
    };

    const switchView = (nav) => {
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
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ height: 50, borderColor: '#222222', borderBottomWidth: 2, width: '80%' }}>
                            <Text style={styles.textStyle}>Sign in to Your Account</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={[styles.input, styles.boxShadow]}>
                                <TextInput
                                    style={{ width: '100%' }}
                                    placeholder="UserName"
                                    value={username}
                                    onChangeText={text => setUsername(text)}
                                />
                            </View>
                            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, styles.input, styles.boxShadow]}>
                                <TextInput
                                    placeholder="Password"
                                    secureTextEntry={!passwordVisible}
                                    style={{ width: '90%' }}
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    <Image source={passwordVisible ? require('../assets/icons/hide.png') : require('../assets/icons/show.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/loginIcon.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                                <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
                            </View>
                            <Image source={require('../assets/icons/greaterThanWhite.png')} style={{ height: 15, width: 15, marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.createAccountBtn} onPress={() => switchView('CreateAccount')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/icons/user.png')} style={{ height: 30, width: 30, marginRight: 10 }} />
                                <Text style={{ color: '#222222', fontSize: 20 }}>Create New Account</Text>
                            </View>
                            <Image source={require('../assets/icons/greaterThanBlack.png')} style={{ height: 15, width: 15, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => switchView('ForgetPassword')}
                        style={{ marginTop: 40 }}
                    >
                        <Text style={{ color: '#222222', textDecorationLine: 'underline', fontSize: 15 }}>Forget your password?</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#222222', textAlign: 'center' }}>By using this application, {'\n'}you accept to our <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Terms of Use.</Text></Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
