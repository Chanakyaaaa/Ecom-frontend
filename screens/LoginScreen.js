import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../config';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          navigation.replace("Main");
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setLoading(true);
    fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "login successful") {
          setLoading(false);
          Alert.alert("Login Success", "You have successfully logged in");
          AsyncStorage.setItem('authToken', data.token);
          navigation.replace("Main");
        } else if (data.message === "Invalid email or password") {
          setLoading(false);
          Alert.alert("Login Error", "Invalid email or password");
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Login Error", "An error occurred, please try again");
        console.error("Login failed:", error.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <View>
        <Image
         style={{ width: 50, height: 50 ,marginTop:20}}
         source={require("../assets/logo.webp")}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Login to your Account</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email" size={24} color={'#FF8C42'} style={{ marginLeft: 8 }} />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder='Enter your email'
              placeholderTextColor={'#FF8C42'}
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={'#FF8C42'} style={{ marginLeft: 8 }} />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={'#FF8C42'}
            />
          </View>
        </View>

        <Pressable style={styles.keepMeLoggedInContainer} onPress={() => navigation.navigate("Forgot")}>
          <Text style={{ color: '#FF8C42', fontWeight: '500' }}>Forgot Password</Text>
        </Pressable>

        <View style={{ marginTop: 80 }} />

        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>
            Login {loading && <ActivityIndicator color="white" />}
          </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
          <Text style={{ textAlign: "center", color: '#FF8C42', fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#FF8C42',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFE5D0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  input: {
    color: '#FF8C42',
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  keepMeLoggedInContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  loginButton: {
    alignSelf: 'center',
    width: 200,
    backgroundColor: '#FF8C42',
    borderRadius: 6,
    padding: 15,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
