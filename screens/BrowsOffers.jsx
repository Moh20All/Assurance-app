import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, FlatList, Text,Alert, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import insuranceData from '../insuranceData.json'; // Import JSON data
import colors from "../assets/Colors";
import { PanResponder } from "react-native";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import UploadDocuments from "../components/UploadDocuments";
import NextBtn from "../components/NextBtn";

const Brows = ({navigation, route}) => {
    const { idcmp, signed } = route.params;
    const [visibleModal, setVisible] = useState(false);
    const [offer, setOffer] = useState([]);
    const [documentPicker, setDocumentPicker] = useState(false);
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [carDocument, setCarDocument] = useState(null);
    const filteredInsuranceCompanies = insuranceData.insuranceCompanies.filter(company => company.id === idcmp);

    useEffect(()=>{
        console.log(route);
    },[idcmp])
    const imgUrl = () => {
        switch (idcmp) {
            case 1: return require('../assets/images/saa.jpg')
            case 2: return require('../assets/images/caat.png')
            case 3: return require('../assets/images/trust.png')
            case 5: return require('../assets/images/alliance.jpg')
            default: return require('../assets/icons/error.png')
        }
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 50) {
                setVisible(false);
            }
        },
    });
    const handleOfferSelection = () => {
        if (!signed) {
            navigation.navigate('CreateAccount', { idcmp: idcmp, offerid: offer.id })
        } else {
            setDocumentPicker(true)
        }
    }

    const handleDrivingLicenseUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            setDrivingLicense(res);
        } catch (err) {
            console.error('Error picking driving license:', err);
        }
    };

    const handleCarDocumentUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
            });
            setCarDocument(res);
        } catch (err) {
            console.error('Error picking car document:', err);
        }
    };
    const OfferModal = ({ offer, visible, onClose }) => {
        return (
            <Modal visible={visible} animationType='slide' transparent={true}>
                <View style={[styles.modalContainer, styles.boxShadow]} {...panResponder.panHandlers} >
                    <Text>Riad</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.textColor }}>{offer.type}</Text>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        {(offer.guarantees || []).map((guarantee, index) => (
                            <Text key={index} style={{ fontSize: 16, color: colors.textColor, margin: 10 }}>- {guarantee}</Text>
                        ))}
                    </ScrollView>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'red' }}>{offer.amount} DA</Text>
                </View>
            </Modal>
        );
    };
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={imgUrl()} resizeMode='cover' style={{ width: '100%', height: 200 }} />
            <FlatList
                data={item.offers}
                renderItem={({ item: offer }) => (
                    <TouchableOpacity
                        style={[{
                            alignItems: 'center', marginHorizontal: 10,
                            marginVertical: 10, borderRadius: 10, backgroundColor: colors.peach,
                            paddingHorizontal: 20, height: 70, alignItems: 'center', flexDirection: 'row',
                            justifyContent: 'space-between'
                        }, styles.boxShadow]}
                        onPress={handleOfferSelection}
                    >
                        <View style={{ width: '80%' }} >
                            <Text style={{ color: colors.textColor, fontSize: 16, fontWeight: 'bold' }}>{offer.type}</Text>
                            <Text style={{ color: colors.blue, fontSize: 16, fontWeight: 'bold' }}>{offer.amount} DA</Text>
                        </View>
                        <TouchableOpacity onPress={() => { setOffer(offer); setVisible(!visibleModal) }}>
                            <Image source={require('../assets/icons/info.png')} style={{ height: 50, width: 50 }} resizeMode="cover" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                keyExtractor={(offer, index) => index.toString()}
            />
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    data={filteredInsuranceCompanies}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ width: '100%' }}
                />
                <OfferModal offer={offer} visible={visibleModal} onClose={() => setVisible(false)} />

                <Modal visible={documentPicker} animationType='fade' transparent={true}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={[styles.modalContent, styles.boxShadow]}>
                            <Image style={{ width: 250, height: 250 }} source={require('../assets/images/splashScreen.png')} />

                            <View style={{width:'100%',marginVertical:20}}>
                                <UploadDocuments handleDrivingLicenseUpload={handleDrivingLicenseUpload}
                                    handleCarDocumentUpload={handleCarDocumentUpload}
                                    drivingLicense={drivingLicense}
                                    carDocument={carDocument}
                                />
                            </View>
                            <NextBtn handleButton={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }]
                                })
                            }} value={"Demand"} />
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 30,
    },
    item: {
        flex: 1,
        width: '100%',
    },
    modalContainer: {
        position: 'absolute',
        alignItems: 'center',
        height: '40%',
        bottom: 10, right: 10, left: 10,
        backgroundColor: colors.aqua,
        borderRadius: 10,
        padding: 15
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
    modalContent: {
        width: '80%',
        paddingVertical: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
});

export default Brows;
