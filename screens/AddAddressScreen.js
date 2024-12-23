import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserContext, UserType } from '../UserContext';
import axios from 'axios';

const AddAddressScreen = () => {
    const navigation=useNavigation();
    const[addresses,setAddresses]=useState([]);
    const {userId,setUserId}=useContext(UserType);
    useEffect(()=>{   
      fetchAddresses();
    },[]);

    const fetchAddresses=async()=>{
      try{
        const res=await axios.get(`https://ecom-backend-peach.vercel.app/addresses/${userId}`);
        console.log(res.data);
        const {addresses}=res.data;
        setAddresses(addresses);
      }
      catch(error){
        console.log("error",error);
      }
    }
    useFocusEffect(
      useCallback(()=>{
        fetchAddresses();
      },[])
    )
    console.log("addresses in add address screen",addresses);
    console.log("userId inn address",userId);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: '#00CED1',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}>
          <Ionicons
            style={{paddingLeft: 10}}
            name="search-outline"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>

        <Ionicons name="mic" size={24} color="black" />
      </View>

      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Your Addresses</Text>
        <Pressable
        onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}>
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {addresses?.map((address,index)=>(
            <Pressable  style={{
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "column",
              gap: 5,
              marginVertical: 10,
            }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{address?.name}</Text>
                <Ionicons name="location-outline" size={24} color="red" />
              </View>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address?.houseNo}, {address?.landmark}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address?.street}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                India, Bangalore
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {address?.mobieNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                pin code : {address?.postalCode}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                 <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
                </View>
              </Pressable>

          ))}
        </Pressable>

      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;
