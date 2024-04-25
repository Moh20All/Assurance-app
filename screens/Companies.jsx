import React, { useState } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, Image, StyleSheet, Platform, TouchableOpacity, Button, Alert, ScrollView } from "react-native";
import CompanyCard from "../components/CompanyCard";

const CreateAccount2 = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [gender, setGender] = useState(null);
    const HandleClick = ()=>{
        navigation.navigate("Offers")
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>il faut choisir une compagnie d'assurance</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <CompanyCard
                        logo={require('../assets/images/saa.jpg')}
                        title="Saa"
                        description="Saa description"
                        onPress={(e) => HandleClick()}
                    />
                    <CompanyCard
                        logo={require('../assets/images/caat.png')}
                        title="Caat"
                        description="Caat description"
                        onPress={(e) => HandleClick()}
                    />
                    <CompanyCard
                        logo={require('../assets/images/trust.png')}
                        title="Trust"
                        description="Trust description"
                        onPress={(e) => HandleClick()}
                    />
                    <CompanyCard
                        logo={require('../assets/images/salama.png')}
                        title="Salama"
                        description="Salama description"
                        onPress={(e) => HandleClick()}
                    />
                    <CompanyCard
                        logo={require('../assets/images/alliance.jpg')}
                        title="Alliance"
                        description="Alliance description"
                        onPress={(e) => HandleClick()}
                    />
                </ScrollView>
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
    scrollViewContent: {
        flex: 1,
        gap:20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

});

export default CreateAccount2;
