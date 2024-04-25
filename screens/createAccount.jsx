import React, { useRef, useState } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, TextInput, Image, StyleSheet, Platform, Animated, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";
import CustomInputText from "../components/CustomInputText";
import CardChoice from "../components/CardChoice"
const CreateAccount = ({ navigation }) => {


    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    }
    return (
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    enabled
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
                >
                    <View style={styles.container}>
                        <Image source={require('../assets/images/3d_character_206.png')} />
                        <CardChoice navigation={navigation}/>
                        <ProgressPoints nbrPage={1} />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default CreateAccount;
