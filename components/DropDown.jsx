import React from "react";
import { View,  Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import SelectDropdown from "react-native-select-dropdown";


const DropDpwn = ({ data ,label,getValue}) => {
    return (
        <SelectDropdown
            data={data}
            renderButton={(selectedItem , isOpened) => {
                return ( 
                    <View style={[styles.dropdownButtonStyle, styles.boxShadow]}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) || label}
                        </Text>
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={[{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF'}) },styles.boxShadow]}>
                           <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                );
            }
            }
            onSelect={(item)=>getValue(item.title)}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    );
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60, 
        borderColor: '#222222',
        backgroundColor: 'white',
        borderBottomWidth: 3,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width:'100%'
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
  
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 10,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    }, boxShadow: {
        shadowColor: '#222222',
        shadowOffset: {
            width: 6,
            height: 6
        },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 10,
    },
});

export default DropDpwn;