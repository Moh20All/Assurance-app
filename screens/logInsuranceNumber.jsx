import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Platform, KeyboardAvoidingView, Alert } from "react-native";
import CustomInputText from "../components/CustomInputText";
import NextBtn from "../components/NextBtn";


const Validate = ({navigation }) => {
    const [number,setNumber]=useState(null)

    const handleButton=()=>{
        if(number.length!=10)
        {
            Alert.alert("Invalide number","wrong insurance number");
        }
        else{
            navigation.navigate('CreateAccount')
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
                <View style={styles.container}>
                    <CustomInputText  field={number} label={'Enter your insurance number'} handlData={setNumber} contentType={'number-pad'} />
                    <NextBtn  handleButton={handleButton} value={'Next'}/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        padding:20
    }
});
export default Validate;