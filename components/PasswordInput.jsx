import React, { useState, useRef } from "react";
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Animated,Text } from "react-native";

const PasswordInput = ({ placeholder, onPasswordChange,field }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [valide, setValid] = useState(false);
    const [empty,setEmpty]=useState(true)

    const transY = useRef(new Animated.Value(0));
    const transX = transY.current.interpolate({
        inputRange: [-40, 0],
        outputRange: [-10, 0],
        extrapolate: 'clamp'
    })


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handlePasswordChange = (text) => {
        onPasswordChange(text);
       if(text.length>=8)
       {
        setValid(true)
       }
       else{
        setValid(false)
       }
       if(text.length>0) setEmpty(false)
       else setEmpty(true)
    };


    const handleFocus = () => {
        Animated.timing(transY.current, {
            toValue: -40,
            duration: 300,
            useNativeDriver: true
        }).start();
    }
    const handleBlur = () => {
        if (empty) {
            Animated.timing(transY.current, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }
    return (
        <View style={[styles.container, styles.boxShadow, { borderColor: field ? 'black' : 'red', }]}>
            <Animated.View  style={[styles.textStyle, {
                transform: [
                    { translateY: transY.current },
                    { translateX: transX }
                ]
            }]}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{placeholder}</Text>
            </Animated.View>
            <TextInput
                secureTextEntry={passwordVisible}
                style={{ width: '95%' }}
                onChangeText={handlePasswordChange}
                onFocus={handleFocus} 
                onBlur={handleBlur}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image source={passwordVisible ? require('../assets/icons/hide.png') : require('../assets/icons/show.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: 'white',
        borderBottomWidth: 3,
        marginBottom: 25,
        paddingHorizontal: 10,
        borderRadius: 5,

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
    }, textStyle: {
        position: 'absolute',
        marginLeft: 15
    }
});

export default PasswordInput;
