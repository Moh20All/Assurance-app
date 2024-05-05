import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Platform, KeyboardAvoidingView, Alert } from "react-native";
import CustomInputText from "../components/CustomInputText";
import NextBtn from "../components/NextBtn";


const Validate = ({ navigation, route }) => {
    const [number, setNumber] = useState(null);
    const { Company } = route.params;

    const[valid,setValid]=useState(true);
    const handleButton=()=>{
        if(number.length!=10)
        {
            setValid(false);
            Alert.alert("Invalide number","wrong insurance number");
        }
        else{
            setValid(true)
            navigation.navigate('CreateAccount')
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
                <View style={styles.container}>
                    <CustomInputText  field={valid} label={'Enter your insurance number'} handlData={setNumber} contentType={'number-pad'} />
                    <NextBtn  handleButton={handleButton} value={'Create Relio Account'}/>
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