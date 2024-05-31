import React, { useState } from "react";
import { View, StyleSheet ,PanResponder} from "react-native";
import CustomInputText from "./CustomInputText";
import NextBtn from "./NextBtn";

const ClientInformation = ({ass_name,ass_prenom,Email, setFirstName, setLastName, setEmail, visible }) => {
   
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 50) {
                visible(false);
            }
        },
    });
    return (
        <View style={[styles.container, styles.boxShadow]}  {...panResponder.panHandlers}>
            <View style={{ width: '20%', height: 5, backgroundColor: 'grey',borderRadius:5,position:'absolute',top:10 }}></View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <CustomInputText
                    field={ass_name}
                    label={"First Name"}
                    value={ass_name}
                    handlData={setFirstName}
                    contentType={'default'}
                />
                <CustomInputText
                    field={ass_prenom}
                    label={"Last Name"}
                    value={ass_prenom}
                    handlData={setLastName}
                    contentType={'default'}
                />
                <CustomInputText
                    field={Email}
                    label={"Email"}
                    value={Email}
                    handlData={setEmail}
                    contentType={'default'}
                />
            </View>

            <NextBtn
                value={'Save Changes'}
                handleButton={() => {
                    visible(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        height: '80%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0
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
});

export default ClientInformation;
