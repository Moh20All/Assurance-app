import React, { useState } from "react";
import { SafeAreaView, View, KeyboardAvoidingView, Text, Image, StyleSheet, Platform, TouchableOpacity, Button, Alert, ScrollView, FlatList } from "react-native";
import CompanyCard from "../components/CompanyCard";
import insuranceData from '../insuranceData.json';

const Companies  = ({ navigation ,route}) => {
    const haveAccount=route.params;
    const HandleClick = (idcmp) => {
        if(haveAccount)
        {
            navigation.navigate("Validate",{Company:idcmp});
        }
        else{
            //Alert.alert('here',`${idcmp }`);
            navigation.navigate("Offers",{idcmp:idcmp ,signed:false});
        }
    };

    const renderItem = ({item}) => {
        return (
            <View style={{marginVertical:10}}>
                <CompanyCard logo={item.id} title={item.name} onPress={()=>HandleClick(item.id)} />
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{flex:1,width:'100%',alignItems:'center'}}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>il faut choisir une compagnie d'assurance</Text>
                </View>
                <View style={{width:'100%'}}>
                    <FlatList
                    data={insuranceData.insuranceCompanies}
                    renderItem={renderItem}
                    keyExtractor={(item) => {item.id.toString()}}
                />
                </View>
               
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 28,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 2
    },
    titlecontainer: {
        marginTop: 80
    },
    scrollViewContent: {
        flex: 1,
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

});

export default Companies ;
