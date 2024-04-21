import React, { useState } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, Image, StyleSheet, Platform, TouchableOpacity, Button, Alert } from "react-native";
import CustomDatePicker from "../components/CustomDatePicker ";
import DropDpwn from "../components/DropDown";
import NextBtn from "../components/NextBtn";
import ProgressPoints from "../components/ProgressIndicator";
const CreateAccount2 = ({ navigation }) => {


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [gender, setGender] = useState(null);


    const dropDownData = [{ title: 'Male' }, { title: 'Female' }];
    const handleNextBtn = () => {
        if (gender == null || selectedDate == null) {
            if (selectedDate == null) Alert.alert('Fill the necessary Fields', "Please select your Date of Birth")
            if (gender == null) Alert.alert('Fill the necessary Fields', "Please select your Gender")
        } else {
            const currentDate = new Date();
            const birthDate = new Date(selectedDate);
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age < 18) {
                Alert.alert('Age Restriction', 'You must be at least 18 years old to proceed.');
            } else {
                navigation.navigate('Page3');
            }
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <View style={styles.container}>
                    <Image source={require('../assets/images/page2BG.png')} />

                    <View style={[styles.inputBox]}>
                        <View style={[styles.dateSelector, styles.boxShadow,{marginBottom:20}]}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date of Birth</Text>
                            <CustomDatePicker onDateChange={setSelectedDate} />
                        </View>

                        <View style={[{ width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, styles.boxShadow]}>
                            <DropDpwn data={dropDownData} label={"Select your gender"} getValue={setGender} />
                        </View>
                    </View>
                    <NextBtn handleButton={handleNextBtn} value={"Next"} />

                    <ProgressPoints nbrPage={2} />

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    dateSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
        borderColor: '#222222',
        backgroundColor: 'white',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '90%'
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
    inputBox: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
});

export default CreateAccount2;
