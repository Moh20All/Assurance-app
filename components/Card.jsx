import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ user }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.userName}>{`${user.first_name} ${user.last_name}`}</Text>
        <Text style={styles.userInfo}>{`Email: ${user.email}`}</Text>
        <Text style={styles.userInfo}>{`Date of Birth: ${user.dateofbirth}`}</Text>
        <Text style={styles.userInfo}>{`Place of Birth: ${user.placeofbirth}`}</Text>
        <Text style={styles.userInfo}>{`Address: ${user.adress}`}</Text>
        <Text style={styles.userInfo}>{`Phone Number: ${user.phone_number}`}</Text>
        <Text style={styles.userInfo}>{`Driving License: ${user.driving_lisence ? 'Yes' : 'No'}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
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
  },
  cardContent: {
    padding: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Card;
