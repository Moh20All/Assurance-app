import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CompanyCard = ({ logo, title, onPress }) => {

  const imgUrl = () => {
    switch (logo) {
      case 1: return require('../assets/images/saa.jpg')
      case 2: return require('../assets/images/caat.png')
      case 3: return require('../assets/images/trust.png')
      case 5: return require('../assets/images/alliance.jpg')
      default: return require('../assets/icons/error.png')

    }
  }
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={()=>onPress(logo)}>
      <View style={styles.contentContainer}>
        <Image source={imgUrl()} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Image source={require('../assets/icons/greaterThanBlack.png')} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
  arrowContainer: {
    marginLeft: 10, // Adjust as needed
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 4,
    padding: 5,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default CompanyCard;
