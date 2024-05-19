import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Image } from "react-native";
import colors from "../assets/Colors";
/**
 * Notification types:
 * - Renewal Reminders
 * - Payment Reminders
 * - Claim Status Updates
 * - Claim Submission Confirmation
 * - Claim Resolution
 */
const Notification = (user) => {
    const userId = user;
    const [dataSelected, setDataSelected] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Renewal Reminder",
            description: "Your [Insurance Type] policy is set to expire. Renew now.",
            seen: false,
            selected: false,
        },
        {
            id: 2,
            title: "Payment Reminder",
            description: "Payment due on [Due Date]. Pay now.",
            seen: false,
            selected: false,
        },
        {
            id: 3,
            title: "Claim Status Updates",
            description: "Your claim status is updated. Check now.",
            seen: false,
            selected: false,
        }
    ]);

    const handleLongPress = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    };
    const handleDataSelect = () => {
        setDataSelected(!dataSelected)
    }
    const handlePress = (id) => {
        if (dataSelected) {
            handleLongPress(id);
        } else {
            console.log(`${id} is pressed`);
            setNotifications(prevSeen =>
                prevSeen.map(item =>
                    item.id === id ? { ...item, seen: true } : item
                )
            );
        }
    };
    const selectAll = () => {
        setDataSelected(true);
        setNotifications(prevNotifications =>
            prevNotifications.map(notification => ({
                ...notification,
                selected: true
            }))
        );
    }
    const markRead = () => {
        setDataSelected(true);
        setNotifications(prevNotifications =>
            prevNotifications.map(notification => ({
                ...notification,
                seen: notification.selected? true :notification.seen
            }))
        );
    }
    const displayData = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => handlePress(item.id)}
                onLongPress={() => { handleLongPress(item.id); handleDataSelect() }}
                style={styles.notificationContainer}
            >
                {dataSelected &&
                    <TouchableOpacity style={{ height: 40, width: 40, borderRadius: 20, borderWidth: 1 }} onPress={() => handleLongPress(item.id)}>
                        {item.selected && (<Image style={{ width: 40, height: 40 }} source={require('../assets/icons/ok.png')} />)}
                    </TouchableOpacity>
                }
                <View style={styles.dataContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={[styles.statu, { backgroundColor: item.seen ? '#CCCCCC' : 'green', position: 'absolute', right: 10 }]} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {dataSelected && <TouchableOpacity onPress={markRead} style={{ marginRight: 10 }}><Text style={{marginVertical:10,color:colors.textColor,}}>Mark as Read</Text></TouchableOpacity>}
                <TouchableOpacity onPress={selectAll}><Text style={{marginVertical:10,color:colors.textColor,}}>Select All</Text></TouchableOpacity>
            </View>
            <FlatList
                data={notifications}
                renderItem={displayData}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    dataContainer: {
        padding: 16,
    },
    notificationContainer: {
        width: '100%',
        height: 100,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color:colors.textColor,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    selected: {
        fontSize: 12,
        color: 'green',
    },
    statu: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5
    }
});

export default Notification;
