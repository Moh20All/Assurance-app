import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, Image, Alert, FlatList, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "../assets/Colors";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UploadDocuments from "../components/UploadDocuments";
import NextBtn from "../components/NextBtn";
import Notification from "../components/notificationModel";
import axios from "axios";
import DocumentPicker from 'react-native-document-picker';
import Sinistre from "./sinistre";



const Home = ({ route, navigation }) => {
    const { isValid } = route.params;
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const { userId } = route.params;
    const [insurance, setInsurance] = useState(null);
    const [documentPicker, setDocumentPicker] = useState(false);
    const [drivingLicense, setDrivingLicense] = useState(null);
    const [carDocument, setCarDocument] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [cardata, setCarData] = useState([])
    const [truckdata, setTruckData] = useState([])
    const [motordata, setMotorCarData] = useState([])
    const [data, setData] = useState(cardata);
    const [activeIndicator, setIndicator] = useState(true);
    const [renewId,setRenewId]=useState();


    useEffect(() => {
        const fetchUserDetails = async (userId) => {
            try {
                Alert.alert('userid',`${userId}`)
                const response = await axios.get(`http://10.0.2.2:3000/user-details/${userId}`);
                const data = response.data;
                console.log('User details:', data);
                setFirstName(data.userInfo.nom_ass)
                setLastName(data.userInfo.prenom_ass)
                const cars = data.userContracts.filter(contract => contract.libelle_type_contrat === "1");
                const trucks = data.userContracts.filter(contract => contract.libelle_type_contrat === "2");
                const motors = data.userContracts.filter(contract => contract.libelle_type_contrat === "3");

                // Set the filtered data to state
                setCarData(cars);
                setTruckData(trucks)
                setMotorCarData(motors)
            } catch (error) {
                console.error('Error fetching user information:', error);
                throw error;
            }
        };

        const storUserId = async () => {
            try {
                const val = String(userId);
                await AsyncStorage.setItem('userId', val);
            } catch (e) {
                console.log('Error storing userId in AsyncStorage:', e);
            }
        };

        fetchUserDetails(userId);
        storUserId();

    }, [userId]);


    useEffect(() => {
        setData(cardata);
        setIndicator(false);
    }, [cardata])


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
        // Ensure date_fin is a Date object
        const dateFin = new Date(item.date_fin);

        const timeLeft = calculateTimeLeft(dateFin);
        const isExpired = timeLeft.days <= 0;
        const daysLeft = isExpired ? 'Insurance Expired' : `Time Left: ${timeLeft.days} days`;
        const backgroundColor = item === insurance ? 'lightgrey' : '#FFF';
        const dateColor = calculateDateColor(dateFin);
        const formattedDate = dateFin.toLocaleDateString();
        const renewButtonColor = timeLeft.days <= 7 ? colors.lightBlue : '#D0E0E3';
        const renewButtonDisabled = timeLeft.days > 7;

        return (
            <TouchableOpacity
                style={[styles.itemContainer, styles.boxShadow, { backgroundColor }]}
                disabled={isExpired}
                onPress={() => {
                    if (insurance === item) setInsurance(null);
                    else setInsurance(item);
                }}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.itemId}>{item.contrat_id}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: dateColor }}>
                        {isExpired ? `Insurance Expired\n${formattedDate}` : daysLeft}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => { setDocumentPicker(true); setRenewId(item.contrat_id)}}
                        style={[styles.renewButton, { backgroundColor: renewButtonColor }]}
                        disabled={renewButtonDisabled}
                    >
                        <Text style={styles.renewButtonText}>Renew</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };



    const senistre = () => {
        if (insurance === null) {
            Alert.alert('Warning', `Select a valid insurance`)
        }else{
            navigation.navigate("Sinistre", { contractId: insurance.contrat_id, userId: userId })
        }
    }



    const handlRenewBtn = async () => {
        if (carDocument && drivingLicense) {
            try {
                const response = await axios.put(`http://10.0.2.2:3000/updateInsurance/${renewId}`);
                if (response.status === 200) {
                    Alert.alert('Success', 'You will resive an email when your documents are verified.');
                    setDocumentPicker(false);
                } else {
                    Alert.alert('Failed', 'Failed to renew insurance. Please try again later.');
                }
            } catch (error) {
                console.error('Error renewing insurance:', error);
                Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
        } else {
            Alert.alert('Error', 'Please upload valid documents.');
        }
    }
    



    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Header pageName={"Dashboard"} notification={() => setShowNotification(!showNotification)} profile={() => { navigation.navigate('Profile', { firstName: firstName, lastName: lastName, userId: userId }) }} />

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
                    {activeIndicator ? <ActivityIndicator size={"large"} /> :
                        data.length === 0 ? <Image style={{ width: '100%', height: '100%' }} source={require('../assets/images/noData.jpg')} /> :
                            <FlatList
                                data={data}
                                keyExtractor={item => item.ass_id}
                                renderItem={renderItem}
                            />
                    }
                </View>
                <TouchableOpacity style={[styles.bottomButton, styles.boxShadow]} onPress={() => navigation.navigate('Offers', { idcmp: 1, signed: true, userId: userId })}>
                    <Image source={require('../assets/icons/add.png')} style={styles.addicon} />
                    <Text style={styles.bottomButtonText}>Buy New Insurance</Text>
                    <Image source={require("../assets/icons/greaterThanWhite.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomButton, styles.boxShadow, { backgroundColor: colors.peach, borderWidth: 0.3 }]} onPress={senistre}>
                    <Image source={require('../assets/icons/car-crash.png')} style={styles.addicon} />
                    <Text style={[styles.bottomButtonText, { color: '#000' }]}>Declare claims</Text>
                    <Image source={require("../assets/icons/greaterThanBlack.png")} style={styles.addicon} />
                </TouchableOpacity>


                <Modal visible={documentPicker} animationType='fade' transparent={true}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
                            <TouchableOpacity style={[{
                                backgroundColor: colors.peach, width: '80%', alignItems: 'center',
                                justifyContent: 'space-between', flexDirection: 'row', height: 60, marginVertical: 10, paddingHorizontal: 15,
                                borderRadius: 10
                            }, styles.boxShadow]} onPress={() => setDocumentPicker(false)}>
                                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Close</Text>
                                <Image source={require('../assets/icons/greaterThanBlack.png')} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal visible={showNotification} animationType='fade' transparent={true}>
                    <View style={styles.notificationModel}>
                        <Header pageName={"Dashboard"} notification={() => setShowNotification(!showNotification)} profile={() => { navigation.navigate('Profile') }} />
                        <Notification />
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
    notificationModel: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',

    }
});
export default Home;
