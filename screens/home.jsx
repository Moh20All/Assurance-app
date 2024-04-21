import React, { useState } from "react";
import { View, SafeAreaView, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const Home = () => {
    const [firstName, setFirstName] = useState('Riad')
    const [lastName, setLastName] = useState('Kadri')

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={[styles.header, styles.boxShadow]}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18 }}>Welcom {firstName}</Text>
                        <Text style={{ color: '#222222', fontSize: 18, fontWeight: 'bold' }}>Dashboard</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '20%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Image source={require('../assets/icons/phone-call.png')} />
                        <Image source={require('../assets/icons/profileSettings.png')} />
                    </View>
                </View>

                <View style={styles.userData}>
                    <Image source={require('../assets/images/Capture.png')} />
                    <View style={{margin:20}}>
                        <Text style={{color:'#222222',fontSize:20,fontWeight:'bold'}}>Welcom in your Relio</Text>
                        <Text style={{color:'#222222',fontSize:20,fontWeight:'bold'}}>{firstName} {lastName}</Text>
                    </View>
                </View>

                <View style={styles.iconContainer}>
                    <View styles={styles.icons}>
                        <Image source={require('../assets/icons/car.png')}/>
                    </View>
                    <View styles={{height:50,width:'100%',borderwidth:1}}>
                        <Image source={require('../assets/icons/truck.png')}/>
                    </View>
                    <View styles={styles.icons}>
                        <Image source={require('../assets/icons/motorbike.png')}/>
                    </View>
                </View>

                <View>
                    <FlatList

                    />
                </View>

                <View>
                    <TouchableOpacity>
                        <Image />
                        <Text></Text>
                        <Image />
                    </TouchableOpacity>
                </View>

                <View >
                    <View>
                        <Image />
                        <Text ></Text>
                    </View>
                    <View>
                        <Image />
                        <Text ></Text>
                    </View>
                    <View>
                        <Image />
                        <Text ></Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    userData: {
        width: '100%',
        height: 100,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:40
    },
    iconContainer:{
        width:'100%',
        borderwidth:1,
        borderColor:'#222222',
        height:'80',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    icons:{
        borderRightColor:'#222222',
        borderRightWidth:2,
        marginRight:30
    }
})
export default Home;