import React, { useState, useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity, PanResponder, Image } from "react-native";
import CustomInputText from "./CustomInputText";
import CheckBox from '@react-native-community/checkbox';
import RadioGroup from 'react-native-radio-buttons-group';
import NextBtn from "./NextBtn";
import UploadDocuments from "./UploadDocuments";
import colors from "../assets/Colors";

const DescriptionModal = ({ city, description,setCity,setDescr, drivingLicense, carDocument, contract, visible,navigation }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [selectedId, setSelectedId] = useState('1');
    
    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Scan QR code',
            value: 'ScanQrCode'
        },
        {
            id: '2',
            label: 'Upload Document',
            value: 'UploadDocument'
        }
    ]), []);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 50) {
                visible(false);
            }
        },
    });

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <View style={styles.dragIndicator} />
            <View style={styles.contentContainer}>
                <CustomInputText
                    field={city}
                    label={"City"}
                    value={city}
                    handlData={setCity}
                    contentType={'default'}
                />
                <CustomInputText
                    field={description}
                    value={description}
                    label={"Damage Details"}
                    handlData={setDescr}
                    contentType={'default'}
                />
                <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>Upload Documents</Text>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
                    />
                </View>
                {toggleCheckBox &&
                    <View style={styles.radioGroupContainer}>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setSelectedId}
                            selectedId={selectedId}
                            layout='row'
                            color={colors.blue}
                        />
                        {selectedId === '1' ? (
                            <TouchableOpacity style={[styles.boxShadow,styles.qrBtn]} onPress={()=>navigation.navigate('ScanScreen')}>
                                <Image source={require('../assets/icons/qr-code.png')} style={{width:40,height:40}} />
                                <Text style={{fontSize:18,fontWeight:'bold',color:colors.textColor}}>Scan QR Code</Text>
                            </TouchableOpacity>
                        ) : (
                            <UploadDocuments
                                handleDrivingLicenseUpload={drivingLicense}
                                handleCarDocumentUpload={carDocument}
                                handleContact={contract}
                                sinistre={true}
                            />
                        )}
                    </View>
                }
            </View>
            <NextBtn
                value={'Save Changes'}
                handleButton={() => { visible(false); }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        height: '90%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    dragIndicator: {
        width: '20%',
        height: 5,
        backgroundColor: 'grey',
        borderRadius: 5,
        position: 'absolute',
        top: 10,
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
    contentContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkboxLabel: {
        fontWeight: 'bold',
        fontSize: 15,
        color: colors.textColor,
    },
    radioGroupContainer: {
        width: '100%',
        marginTop: 10,
    },
    qrBtn:{
        width:'100%',
        height:60,
        backgroundColor:colors.aqua,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
});

export default DescriptionModal;
