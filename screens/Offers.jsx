import React from "react";
import {View, SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet, Text } from "react-native";

const Offers = ({ navigation }) => {
const company = "trust";
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>

            </KeyboardAvoidingView>
            <View >
            <View style={styles.titlecontainer}>
                    <Text style={styles.title}>Les offers de {company}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'space-around',
    },
    title: {
        fontSize: 28,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 2
    },
    titlecontainer: {
        marginTop: 80
    },
})

export default Offers;