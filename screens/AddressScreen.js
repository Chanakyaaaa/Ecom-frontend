import { StyleSheet, Text, View ,ScrollView, TextInput,Pressable, Alert,ActivityIndicator} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";
import { UserType } from '../UserContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../config';

const AddressScreen = () => {
    const [name, setName] = useState("");
    const [mobieNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
  const {userId,setUserId}=useContext(UserType);
  const navigation = useNavigation();
  const [loading,setLoading]=useState(false);

    useEffect(() => {
      const fetchUser=async()=>{
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const userId=decodedToken.userId;
        setUserId(userId);
      }
      fetchUser();
    },[]);

    const handleAddAddress = () => {
      setLoading(true);
      const address={
        name,
        mobieNo,
        houseNo,
        street,
        landmark,
        postalCode
      }
      axios.post(`${BASE_URL}/addresses`,{userId,address})
      .then((response)=>{
        console.log(response.data);
        Alert.alert("Address added successfully");
        setLoading(false);
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(()=>{
          navigation.goBack();
        },500);
      })
      .catch((error)=>{
        console.log("error",error);
        Alert.alert("Something went wrong");
      })
    }

    console.log(userId);
  return (
    <ScrollView>
      <View style={{ height: 50, backgroundColor: "#FF8C42" }} />
      <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Address
        </Text>
        <TextInput
          placeholderTextColor={"black"}
          placeholder="India"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
            color:'black'
          }}
        />
         <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Full name (First and last name)
          </Text>

          <TextInput
           value={name}
           onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="enter your name"
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile numebr
          </Text>

          <TextInput
            value={mobieNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile No"
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat,House No,Building,Company
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area,Street,sector,village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Eg near wall street"
          />
        </View>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter Pincode"
          />
        </View>

        <Pressable
        onPress={handleAddAddress}
          style={{
            backgroundColor: "#FF8C42",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Add Address</Text>
        </Pressable>
        {loading && <ActivityIndicator size="large" color="blue" />}


    </View>
    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})