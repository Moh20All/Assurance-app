import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView ,Image} from 'react-native';
import colors from '../assets/Colors';
const CardChoice = ({ navigation }) => {
    const [yes,setYes]=useState(false);
    const handleconfirm = () => {
       {yes?navigation.navigate('SignIn'):setYes(true) ;}
    };
    const handlecancel = () => {
        {yes?navigation.navigate('Validate'):navigation.navigate('Companies') ;}
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image source={require('../assets/images/firstUse.jpg')} style={{width:'100%',height:'40%'}}/>
                <View style={styles.cardContainer}>
                   {yes? <Text style={styles.question}>Do you have Relio account ?</Text> : 
                  <Text style={styles.question}>Do you have a valide insurance number Do you have Relio account ?</Text>}
                    <View>
                    <TouchableOpacity style={styles.cardContent} onPress={handleconfirm}>
                            <Text style={styles.text}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardcancel} onPress={handlecancel}>
                            <Text style={styles.textcancel}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#FFF',
        justifyContent:'center'
    },
    cardContainer: {
        width: '90%',
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,

    },
    cardContent: {
        padding: 20,
        marginTop: 10,
        backgroundColor: colors.blue,
        borderRadius: 10
    },
    cardcancel: {
        padding: 20,
        marginTop: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: 'rgba(21, 25, 32,0.4)',
        borderWidth: 3
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userInfo: {
        fontSize: 16,
        marginVertical: 5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18, // Adjust the font size as needed
        fontFamily: 'InterDisplay-Regular', // Specify your custom font family here
    },
    textcancel: {
        color: colors.textColor,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18, // Adjust the font size as needed
        fontFamily: 'InterDisplay-Regular', // Specify your custom font family here
    },
    question: {
        color: colors.textColor,
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 8
    },
});

export default CardChoice;
