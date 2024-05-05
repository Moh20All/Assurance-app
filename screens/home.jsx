import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Image, Alert, FlatList, StyleSheet, Modal, TouchableOpacity } from "react-native";
import colors from "../assets/Colors";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UploadDocuments from "../components/UploadDocuments";
import NextBtn from "../components/NextBtn";

const Home = ({ route, navigation }) => {
    const { isValid } = route.params;
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const { userId } = route.params;
    const [insurance, setInsurance] = useState(null);
    const [documentPicker, setDocumentPicker] = useState(false);
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [carDocument, setCarDocument] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://10.0.2.2:3000/user-details?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFirstName(data.FirstName);
                setLastName(data.LastName);
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const cardata = [
        { id: 'Gdd-98DFD', expired: true, dateExp: new Date(2023, 3, 23) },
        { id: 'Gdd-BD-776X8', expired: false, dateExp: new Date(2024, 4, 1) },
        { id: 'Gdd-90DFD', expired: false, dateExp: new Date(2025, 3, 23) },
        { id: 'Gdd-CD-776X8', expired: false, dateExp: new Date(2024, 4, 9) },
        { id: 'Gdd-978DFD', expired: false, dateExp: new Date(2025, 3, 23) }
    ];
    const truckdata = [
        { id: 'Gdd-90DFD', expired: false, dateExp: new Date(2025, 3, 23) }
    ];
    const motordata = [
        { id: 'Gdd-98DFD', expired: true, dateExp: new Date(2023, 3, 23) },
        { id: 'Gdd-90DFD', expired: false, dateExp: new Date(2025, 3, 23) }
    ];
    const [data, setData] = useState(cardata);

    const handleData = (x) => {
        if (x == 1) {
            setData(cardata);
        }
        else if (x == 2) {
            setData(truckdata);
        }
        else if (x == 3) {
            setData(motordata);
        }
    }
    const calculateDateColor = (expirationDate) => {
        const today = new Date();
        const differenceInDays = Math.floor((expirationDate - today) / (1000 * 60 * 60 * 24));

        if (differenceInDays < 0) {
            return 'red'; // Expired
        } else if (differenceInDays <= 7) {
            return 'gold'; // Expiring within 7 days
        } else {
            return 'green'; // More than 7 days remaining
        }
    };

    const calculateTimeLeft = (expDate) => {
        const today = new Date();
        const differenceInMilliseconds = expDate - today;
        const daysLeft = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        return {
            days: daysLeft,
        };
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
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.itemContainer, styles.boxShadow, { backgroundColor: item === insurance ? 'lightgrey' : '#FFF' }]}
                disabled={calculateTimeLeft(item.dateExp).days > 0 ? false : true}
                onPress={() => {
                    if (insurance === item) setInsurance(null)
                    else setInsurance(item)
                }}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemId}>{item.id}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: calculateDateColor(item.dateExp) }}>
                        {calculateTimeLeft(item.dateExp).days <= 0 ? `Insurance Expired\n${item.dateExp.toLocaleDateString()}` : `Time Left: ${calculateTimeLeft(item.dateExp).days} days`}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { setDocumentPicker(true) }} style={[styles.renewButton, { backgroundColor: calculateTimeLeft(item.dateExp).days <= 7 ? colors.lightBlue : '#D0E0E3' }]} disabled={calculateTimeLeft(item.dateExp).days <= 7 ? false : true}>
                        <Text style={styles.renewButtonText}>Renew</Text>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        )
    };
    const senistre = () => {
        if (insurance === null) {
            Alert.alert('Warning', `Select a valid insurance`)
        }
    }
    const handlRenewBtn = () => {
        if (carDocument != null && drivingLicense != null) {
            Alert.alert('Notice', 'You will resive an email when your documents are verified');
            setDocumentPicker(false);
        }
        else{
            Alert.alert('Error','Upload a valid documents please');
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Header pageName={"Dashboard"} profile={()=>{navigation.navigate('Profile')}}/>

                <View style={styles.userData}>
                    <Image style={{ width: 50, height: 70 }} resizeMethod='resize' resizeMode='contain' source={require('../assets/images/large-removebg.png')} />
                    <View style={styles.userDataTextContainer}>
                        <Text style={styles.userDataText}>Welcome to Relio<Text style={{ color: colors.blue, fontSize: 25 }}> {firstName}</Text> </Text>
                    </View>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity style={[styles.icon, { borderRightWidth: 1, }]} onPress={() => handleData(1)}>
                        <View style={styles.iconBadge}>
                            <Text style={styles.iconBadgeText}>{cardata.length}</Text>
                        </View>
                        <Image style={styles.iconImage} source={require('../assets/icons/car.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.icon, { borderRightWidth: 1, }]} onPress={() => handleData(2)}>
                        <View style={styles.iconBadge}>
                            <Text style={styles.iconBadgeText}>{truckdata.length}</Text>
                        </View>
                        <Image style={styles.iconImage} source={require('../assets/icons/truck.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.icon]} onPress={() => handleData(3)}>
                        <View style={styles.iconBadge}>
                            <Text style={styles.iconBadgeText}>{motordata.length}</Text>
                        </View>
                        <Image style={styles.iconImage} source={require('../assets/icons/motorbike.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.flatListContainer}>
                    {data == null ? <Image style={{ width: '100%', height: '100%' }} source={require('../assets/images/noData.jpg')} /> : <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />}
                </View>
                <TouchableOpacity style={[styles.bottomButton, styles.boxShadow]} onPress={() => navigation.navigate('Offers', 1, true)}>
                    <Image source={require('../assets/icons/add.png')} style={styles.addicon} />
                    <Text style={styles.bottomButtonText}>Buy New Insurance</Text>
                    <Image source={require("../assets/icons/greaterThanWhite.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButton, styles.boxShadow, { backgroundColor: colors.peach, borderWidth: 0.3 }]} onPress={senistre}>
                    <Image source={require('../assets/icons/car-crash.png')} style={styles.addicon} />
                    <Text style={[styles.bottomButtonText, { color: '#000' }]}>Declarer un sinistre</Text>
                    <Image source={require("../assets/icons/greaterThanBlack.png")} style={styles.addicon} />
                </TouchableOpacity>


                <Modal visible={documentPicker} animationType='fade' transparent={true}>
                    <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={[styles.modalContent, styles.boxShadow]}>
                            <Image style={{ width: 250, height: 250 }} source={require('../assets/images/splashScreen.png')} />
                            <View style={{ width: '100%', marginVertical: 20 }}>
                                <UploadDocuments handleDrivingLicenseUpload={handleDrivingLicenseUpload}
                                    handleCarDocumentUpload={handleCarDocumentUpload}
                                    drivingLicense={drivingLicense}
                                    carDocument={carDocument}
                                />
                            </View>
                            <NextBtn value={'Demand Renew'} handleButton={handlRenewBtn} />
                            <TouchableOpacity style={[{backgroundColor:colors.peach,width:'80%',alignItems:'center',
                            justifyContent:'space-between',flexDirection:'row',height:60,marginVertical:10,paddingHorizontal:15,
                            borderRadius:10},styles.boxShadow]} onPress={()=>setDocumentPicker(false)}>
                                <Text style={{color:'black',fontSize:18,fontWeight:'bold'}}>Close</Text>
                                <Image source={require('../assets/icons/greaterThanBlack.png') }style={{width:30,height:30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        fontFamily: 'InterDisplay-Regular'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
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
    userData: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 40
    },
    userDataTextContainer: {
        margin: 20,
    },
    userDataText: {
        color: '#222222',
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconContainer: {
        width: '80%',
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20
    },
    icon: {
        borderRightColor: '#222222',
        paddingRight: 10,
        margin: 10,
        paddingHorizontal: 10,
    },
    iconBadge: {
        backgroundColor: 'red',
        width: 25,
        borderRadius: 100,
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 35
    },
    iconBadgeText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFF'
    },
    iconImage: {
        zIndex: -1
    },
    flatListContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        width: '95%',
        backgroundColor: 'white',
        height: 80,
        flexDirection: 'row',
        marginVertical: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: 10
    },
    textContainer: {
        height: '100%',
        justifyContent: 'space-evenly'
    },
    itemId: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222'
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '20%',
        justifyContent: 'space-evenly'
    },
    settingsButton: {
        borderRadius: 50,
        padding: 3,
        borderWidth: 1
    },
    renewButton: {
        borderRadius: 10,
        height: 40,
        width: 80,
        backgroundColor: colors.aqua,
        alignItems: 'center',
        justifyContent: 'center'
    },
    renewButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000'
    },
    bottomButton: {
        width: '90%',
        height: 50,
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 15,
    },

    addicon: {
        width: 28,
        height: 28,

    },
    bottomButtonText: {
        color: '#FFF',
        fontSize: 20
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
export default Home;
