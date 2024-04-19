import React,{useEffect, useState} from "react";
import { SafeAreaView,View,KeyboardAvoidingView,Text,Image, StyleSheet, FlatList, } from "react-native";
import axios from "axios";
import Card from "../components/card";


const Home=()=>{
    const [Data,setData] = useState([])
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData = async ()=>{
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    };

    return(
        <SafeAreaView>
<View>
      <FlatList
        data={Data}
        renderItem={({ item }) => <Card user={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
        </SafeAreaView>
    );
};

export default Home;