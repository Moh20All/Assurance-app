import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import colors from '../assets/Colors';

const ProgressPoints = ({ nbrPage }) => {
    return (
        <View style={[styles.progressIndicator]}>


            <TouchableOpacity>
                <View style={[styles.progressPoint, nbrPage == 1 && styles.activePoint]} />
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.progressPoint, nbrPage == 2 && styles.activePoint]} />
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.progressPoint, nbrPage == 3 && styles.activePoint]} />
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.progressPoint, nbrPage == 4 && styles.activePoint]} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    progressIndicator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    progressPoint: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 5
    },
    activePoint: {
        backgroundColor: colors.blue,
        marginHorizontal: 5
    },
});

export default ProgressPoints;