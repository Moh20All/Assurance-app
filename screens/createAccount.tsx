import React, { useState } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, TextInput, Image, StyleSheet, Platform, TouchableOpacity, } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'

const CreateAccount = ({navigation}) => {
    const dropDownData = [{ title: 'Male' },
    { title: 'Female' },
    ];
    const currentPage = 1; // Assuming starting page is 1
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
            >
                <View style={styles.container}>
                    <Image source={require('../assets/images/3d_character_206.png')} />
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>

                        <View style={[styles.inputTextStyle, styles.boxShadow]}>
                            <Text></Text>
                            <TextInput placeholder="First Name" style={{ width: '100%', alignContent: 'center' }} />
                        </View>
                        <View style={[styles.inputTextStyle, styles.boxShadow]}>
                            <Text></Text>
                            <TextInput placeholder="First Name" style={{ width: '100%', alignContent: 'center' }} />
                        </View>
                        <View style={[{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 40, alignItems: 'center' }, styles.boxShadow]}>
                            <SelectDropdown
                                data={dropDownData}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={[styles.dropdownButtonStyle, styles.boxShadow]}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Select your gender'}
                                            </Text>
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={[{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }]}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>

                                    );
                                }
                                }
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>

                    </View>
                    <View style={styles.boxShadow}>
                        <TouchableOpacity style={[styles.btnStyle, styles.boxShadow]} onPress={()=>{navigation.navigate('Page2')}}>
                            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>
                                Next
                            </Text>
                            <Image source={require('../assets/icons/greaterThanWhite.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.progressIndicator]}>
                        <TouchableOpacity>
                            <View style={[styles.progressPoint, currentPage >= 1 && styles.activePoint]} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.progressPoint, currentPage >= 2 && styles.activePoint]} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.progressPoint, currentPage >= 3 && styles.activePoint]} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={[styles.progressPoint, currentPage >= 4 && styles.activePoint]} />
                        </TouchableOpacity>


                    </View>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E54F2C',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF',
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 10,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    inputTextStyle: {
        height: 60,
        borderColor: '#222222',
        backgroundColor: 'white',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '80%',
        justifyContent: 'center'
    },
    btnStyle: {
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: '#222222',
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
        backgroundColor: '#E54F2C',
        marginHorizontal: 5
    },

})
export default CreateAccount;