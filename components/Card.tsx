import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ user }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userInfo}>{user.username}</Text>
        <Text style={styles.userInfo}>{user.email}</Text>
        <Text style={styles.userInfo}>{user.phone}</Text>
        <Text style={styles.userInfo}>{user.website}</Text>
        <Text style={styles.address}>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</Text>
        <Text style={styles.company}>{`${user.company.name}: ${user.company.catchPhrase}`}</Text>
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
  address: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
  },
  company: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Card;
