import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CardChoice = ({navigation}) => {
    const handleconfirm = ()=>{
        navigation.navigate('Home');
    };
    const handlecancel= ()=>{
        navigation.navigate('Companies');
    };
  return (
    <View style={styles.cardContainer}>
        <Text style={styles.question}>si vous êtes déjà inscrit dans une compagnie d'assurance, cliquez sur confirmer pour remplir votre numéro d'assurance</Text>
      <TouchableOpacity style={styles.cardContent} onPress={handleconfirm}>
        <Text style={styles.text}>Confirm!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardcancel} onPress={handlecancel}>
        <Text style={styles.textcancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width:'90%',
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
    marginTop:10,
    backgroundColor:'#2B4BF2',
    borderRadius:10
  },
  cardcancel: {
    padding: 20,
    marginTop:10,
    backgroundColor:'#ffffff',
    borderRadius:10,
    borderColor:'rgba(21, 25, 32,0.4)',
    borderWidth:3
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
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    fontSize: 18, // Adjust the font size as needed
    fontFamily: 'InterDisplay-Regular', // Specify your custom font family here
  },
  textcancel: {
    color:'rgba(21,25,32,0.5)',
    fontWeight:'bold',
    textAlign:'center',
    fontSize: 18, // Adjust the font size as needed
    fontFamily: 'InterDisplay-Regular', // Specify your custom font family here
  },
  question:{
    color:'black',
    textAlign:'center',
    fontSize:19,
    paddingBottom:8
  },
});

export default CardChoice;
