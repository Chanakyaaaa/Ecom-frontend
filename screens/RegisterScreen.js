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
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    console.log(user);

    fetch("https://ecom-backend-peach.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "user registered successfully,check your email and verify") {
          Alert.alert("Registration Success", "Check your email to verify your account.");
          navigation.navigate("Login");
        } else if (data.message === "email already registered") {
          Alert.alert("Registration Error", "User already exists.");
        }
      })
      .catch((error) => {
        Alert.alert("Registration Error", "An error occurred, please try again");
        console.error("Registration failed:", error.message);
      });
  };

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
            Register to your Account
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
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ color: "#FF8C42", marginVertical: 10, width: 300, fontSize: 16 }}
              placeholder="Enter your name"
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
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: "#FF8C42", marginVertical: 10, width: 300, fontSize: 16 }}
              placeholder="Enter your email"
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
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{ color: "#FF8C42", marginVertical: 10, width: 300, fontSize: 16 }}
              placeholder="Enter your password"
              placeholderTextColor="#FF8C42"
            />
          </View>
        </View>

       
        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleRegister}
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
            Register
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
          <Text style={{ textAlign: "center", color: "#FF8C42", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
