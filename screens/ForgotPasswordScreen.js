import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();
  const {userId,setUserId}=useContext(UserType);
 

  const handleChangePassword = () => {
    const updateduser = {
      email:email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    console.log(updateduser);
    fetch("https://ecom-backend-peach.vercel.app/updatePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateduser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "password updated successfully") {
          Alert.alert("Password Updated Successfully", "You have successfully updated your password");
          navigation.navigate("Login");
        } else if (data.message === "Invalid password") {
          Alert.alert("Invalid password", "Please enter correct old password");
        }
        else if (data.message === "Invalid user") {
          Alert.alert("Invalid User", "User not found");
        }
      })
      .catch((error) => {
        Alert.alert("Registration Error", "An error occurred, please try again");
        console.error("Registration failed:", error.message);
      });
  };

  console.log(userId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{ uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "#FF8C42" }}>
            Change Your Password
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#FFE5D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <Ionicons name="person" size={24} color="#FF8C42" style={{ marginLeft: 8 }} />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: "#FF8C42", marginVertical: 10, width: 300, fontSize: 16 }}
              placeholder="Enter Email"
              placeholderTextColor="#FF8C42"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#FFE5D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialCommunityIcons style={{ marginLeft: 8 }} name="email" size={24} color="#FF8C42" />
            <TextInput
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              style={{ color: "#FF8C42", marginVertical: 10, width: 300, fontSize: 16 }}
              placeholder="Enter Old Password"
              placeholderTextColor="#FF8C42"
            />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#FFE5D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialCommunityIcons name="lock-outline" size={24} color="#FF8C42" style={{ marginLeft: 8 }} />
            <TextInput
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={true}
              style={{ color: "#FF8C42", marginVertical: 10, width: 300, fontSize: 16 }}
              placeholder="Enter New Password"
              placeholderTextColor="#FF8C42"
            />
          </View>
        </View>

       
        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleChangePassword}
          style={{
            width: 200,
            backgroundColor: "#FF8C42",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>
            Change Password
          </Text>
        </Pressable>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});