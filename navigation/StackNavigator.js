import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: 'red',
            headerShown: false,
            tabBarIcon: ({focussed}) =>
              focussed ? (
                <Ionicons name="home" size={25} color="red" />
              ) : (
                <Ionicons name="home-outline" size={25} color="black" />
              ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: 'red',
          tabBarIcon: ({focussed}) =>
            focussed ? (
              <Ionicons name="person" size={25} color="red" />
            ) : (
              <Ionicons name="person-outline" size={25} color="black" />
            ),
        }}
        />
         <Tab.Screen name="Cart" component={HomeScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: 'red',
          headerShown: false,
          tabBarIcon: ({focussed}) =>
            focussed ? (
              <Ionicons name="cart" size={25} color="red" />
            ) : (
              <Ionicons name="cart-outline" size={25} color="black" />
            ),
        }}
        />
      </Tab.Navigator>
      
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
