import React, { useState } from "react";
import { View, SafeAreaView, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const Home = () => {
    const [firstName, setFirstName] = useState('Riad')
    const [lastName, setLastName] = useState('Kadri')
    const cardata = [
        { id: 'Gdd-98DFD', expired: true, dateExp: new Date(2023, 3, 23) },
        { id: 'Gdd-BD-776X8', expired: false, dateExp: new Date(2024, 4, 1) },
        { id: 'Gdd-90DFD', expired: false, dateExp: new Date(2025, 3, 23) },
        { id: 'Gdd-CD-776X8', expired: false, dateExp: new Date(2024, 4, 1) },
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
    const renderItem = ({ item }) => {
        return (
            <View style={[styles.itemContainer]}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemId}>{item.id}</Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: calculateDateColor(item.dateExp) }}>
                        {item.expired ? `Insurance Expired\n${item.dateExp.toLocaleDateString()}` : `Time Left: ${calculateTimeLeft(item.dateExp).days} days`}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.settingsButton}>
                        <Image source={require('../assets/icons/settings.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.renewButton}>
                        <Text style={styles.renewButtonText}>Renew</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={[styles.header, styles.boxShadow]}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>Welcome {firstName}</Text>
                        <Text style={styles.headerTextBold}>Dashboard</Text>
                    </View>
    
                    <View style={styles.headerIconsContainer}>
                        <Image source={require('../assets/icons/phone-call.png')} />
                        <Image source={require('../assets/icons/profileSettings.png')} style={styles.headerIcons} />
                    </View>
                </View>
    
                <View style={styles.userData}>
                    <Image source={require('../assets/images/Capture.png')} />
                    <View style={styles.userDataTextContainer}>
                        <Text style={styles.userDataText}>Welcome to your Relio</Text>
                        <Text style={styles.userDataText}>{firstName} {lastName}</Text>
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
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />

                <TouchableOpacity style={styles.bottomButton}>
                    <Image source={require('../assets/icons/add.png')} style={styles.addicon} />
                    <Text style={styles.bottomButtonText}>Buy New Insurance</Text>
                    <Image source={require("../assets/icons/greaterThanWhite.png")} />
                </TouchableOpacity>
                </View>
    
    
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.footerButton}>
                        <Image source={require('../assets/icons/hut.png')} style={styles.footerImg} />
                        <Text style={styles.footerButtonText}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton}>
                        <Image source={require('../assets/icons/car-insurance.png')} style={styles.footerImg} />
                        <Text style={styles.footerButtonText}>Insurances</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.footerButton}>
                        <Image source={require('../assets/icons/fender-bender.png')} style={styles.footerImg} />
                        <Text style={styles.footerButtonText}>Claims</Text>
                    </TouchableOpacity>
                </View>
    
            </View>
        </SafeAreaView>
    );
    
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFF',
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
    headerTextContainer: {
        flexDirection: 'column',
    },
    headerText: {
        fontSize: 18,
    },
    headerTextBold: {
        color: '#222222',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIconsContainer: {
        flexDirection: 'row',
        width: '20%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap:5
    },
    headerIcons:{
        width:30,
        height:30
    },
    userData: {
        width: '100%',
        height: 100,
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        width: '80%',
        height: 50,
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
        width: '88%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 140
    },
    itemContainer: {
        width: '100%',
        backgroundColor: 'white',
        height: 120,
        flexDirection: 'row',
        marginVertical: 20,
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
        fontSize: 25,
        fontWeight: 'bold',
        color: '#222222'
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-evenly'
    },
    settingsButton: {
        borderRadius: 50,
        padding: 3,
    },
    renewButton: {
        borderRadius: 10,
        height: 40,
        width: 80,
        backgroundColor: "#41B06E",
        alignItems: 'center',
        justifyContent: 'center'
    },
    renewButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    bottomButton: {
        width: '100%',
        height: 60,
        backgroundColor: '#222222',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: -50, // Adjust this value as needed
        borderRadius: 10,
        gap: 5,
        marginTop: 10 // Adjust this value as needed
    },
    
    addicon:{
        width:25,
        height:25,
        
    },
    bottomButtonText: {
        color: '#FFF',
        fontSize: 20
    },
    footer: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#FFF',
    },
    footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#222222',
        borderRightWidth: 1,
        width: '33%',
        height: '80%'
    },
    footerButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222222'
    },
    footerImg:{
        transform: [{ scale: 0.85 }]
    },
});
export default Home;
