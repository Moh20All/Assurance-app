import React, { useState } from "react";
import { View, StyleSheet, Alert, PanResponder } from "react-native";
import PasswordInput from "./PasswordInput";
import NextBtn from "./NextBtn";
import colors from "../assets/Colors";
import axios from "axios";
import CustomInputText from "./CustomInputText";

const ModifyEmail = ({ userId, visible }) => {
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [passField, setPassField] = useState(true);
    const [emailField, setEmailField] = useState(true);

    const handleClick = async () => {
        if (email != '') {
            try {
                const connect = await axios.get(`http://10.0.2.2:3000/verifyEmail/${email}`);
                if (connect.status === 200) {
                    try {
                        const update = await axios.put('http://10.0.2.2:3000/updateEmail', {
                            email: email,
                            userId: userId,
                            password: pass
                        });

                        if (update.status === 200) {
                            Alert.alert("Message", "Email Updated")
                            visible()
                        }
                    } catch (error) {
                        console.error("Error Updating email", error)
                    }


                }
            } catch (error) {
                Alert.alert('Warning', `Email already exist`)
                console.error(error)
            }
        }


    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 50) {
                visible();
            }
        },
    });

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <View style={{ width: '20%', height: 5, backgroundColor: 'grey', borderRadius: 5, position: 'absolute', top: 10 }}></View>
            <View style={{ width: '80%' }}>
                <CustomInputText field={email} value={emailField} label={"New Email"} handlData={setEmail} contentType={"email-address"} />
                <PasswordInput placeholder=" Your password" onPasswordChange={setPass} field={passField} />
            </View>
            <NextBtn value="Change Password" handleButton={handleClick} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: colors.aqua,
        borderRadius: 20,
        width: '100%',
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default ModifyEmail;
