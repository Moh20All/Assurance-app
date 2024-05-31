import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, PanResponder } from "react-native";
import PasswordInput from "./PasswordInput";
import NextBtn from "./NextBtn";
import colors from "../assets/Colors";
import axios from "axios";

const ChangePassword = ({ userId, visible }) => {
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const [passField, setPassField] = useState(true);
    const [newpassField, setNewPassField] = useState(true);
    const [confpassField, setConfPassField] = useState(true);

    const handleClick = async () => {
        if (pass != '' && newPass != '' && confPass != '') {
            if (newPass !== confPass) {
                Alert.alert("Warning", "New password and confirmation do not match.");
                setConfPassField(false);
                setNewPassField(false);
            } else {
                try {
                    const connect = await axios.put(`http://10.0.2.2:3000/updatePass?password=${pass}&newpass=${newPass}&userId=${userId}`);
                    if (connect.status === 403) {
                        setPassField(false);
                        setConfPassField(true);
                        setNewPassField(true);
                        setPass('');
                        setNewPass('');
                        setConfPass('');
                        Alert.alert("Failed", "Wrong password try again.")
                    } else if (connect.status === 200) {
                        visible();
                        Alert.alert("Password Updated")
                    }
                } catch (error) {
                    console.error("Updating password error"+error);
                }
                
            }
        }
        else {
            if (pass === '') {
                setPassField(false);
            }
            if (newPass === '') { setNewPassField(false) }
            if (confpassField === '') { setConfPassField(false) }
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
                <PasswordInput placeholder="Your Password" onPasswordChange={setPass} field={passField} />
                <PasswordInput placeholder="New Password" onPasswordChange={setNewPass} field={newpassField} />
                <PasswordInput placeholder="Confirm New Password" onPasswordChange={setConfPass} field={confpassField} />
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

export default ChangePassword;
