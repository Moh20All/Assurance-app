import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const NextBtn = ({ handleButton,value }) => {
    return (
        <View style={styles.boxShadow}>
            <TouchableOpacity style={[styles.btnStyle, styles.boxShadow]} onPress={() => { handleButton() }}>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>
                    {value}
                </Text>
                <Image source={require('../assets/icons/greaterThanWhite.png')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    btnStyle: {
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: '#E54F2C',
        borderRadius: 10,
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
});

export default NextBtn;
