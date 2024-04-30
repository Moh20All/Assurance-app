
import React, { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, Animated } from "react-native";
import colors from "../assets/Colors";

const CustomInputText = ({ field, label, handlData, contentType }) => {
    const [empty, setEmpty] = useState(true)

    const transY = useRef(new Animated.Value(0));
    const transX = transY.current.interpolate({
        inputRange: [-40, 0],
        outputRange: [-10, 0],
        extrapolate: 'clamp'
    })

    const handleFocus = () => {
        Animated.timing(transY.current, {
            toValue: -40,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
    const handleBlur = ({ field }) => {
        if (field == null) {
            Animated.timing(transY.current, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }

    }
    return (
        <View style={[styles.inputTextStyle, styles.boxShadow, { borderBottomColor: field ? 'green' : 'red' }]}>
            <Animated.View style={[styles.textStyle, {
                transform: [
                    { translateY: transY.current },
                    { translateX: transX }
                ]
            }]}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{label}</Text>
            </Animated.View>
            <TextInput keyboardType={contentType} onFocus={handleFocus} onBlur={() => handleBlur({ field: field })} style={{ width: '100%', alignContent: 'center' }} onChangeText={handlData} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputTextStyle: {
        height: 60,
        backgroundColor: 'white',
        borderBottomWidth: 3,
        marginBottom: 25,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center'
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
    textStyle: {
        position: 'absolute',
        marginLeft: 15
    }
})

export default CustomInputText;