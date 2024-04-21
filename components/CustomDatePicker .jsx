import React, { useState } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import DatePicker from "react-native-date-picker";

const CustomDatePicker = ({ onDateChange }) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const handleDateConfirm = (selectedDate) => {
        setOpen(false);
        setDate(selectedDate);
        onDateChange(selectedDate);
    };

    const handleDateCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={{ color: '#222222', fontSize: 20, fontWeight: 'bold' }}>
                    {date.toLocaleDateString()}
                </Text>
            </TouchableOpacity>
            {open && (
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode='date'
                    title={null}
                    onConfirm={handleDateConfirm}
                    onCancel={handleDateCancel}
                    buttonColor="#E54F2C"
                />
            )}
        </>
    );
};

export default CustomDatePicker;
