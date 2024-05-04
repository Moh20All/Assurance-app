import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, FlatList, Modal, TouchableOpacity, Text, PanResponder } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import insuranceData from '../insuranceData.json';
import colors from "../assets/Colors";


const DisplayOffers = ({ navigation }) => {

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 50) {
                setOpen(false);
            }
        },
    });
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Header pageName={"Claims"} />
                
                <Footer navigation={navigation} />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create(
    {
        safeAreaView: {
            flex: 1,
            fontFamily: 'InterDisplay-Regular'
        },
        container: {
            flex: 1,
            alignItems: 'center',
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
        filterBtn: {
            width: 200,
            backgroundColor: colors.blue,
            height: 50,
            borderRadius: 10,
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        modalContainer: {
            position: 'absolute',
            alignItems: 'center',
            height: '70%',
            bottom: 10, right: 10, left: 10,
            backgroundColor: colors.aqua,
            borderRadius: 10,
            padding: 15
        },
    }
);
export default DisplayOffers;