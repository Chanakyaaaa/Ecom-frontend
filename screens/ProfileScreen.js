import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserType} from '../UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState("Your orders");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {backgroundColor: '#FF8C42'},
      headerLeft: () => {
        <Image
          style={{width: 140, height: 50, resizeMode: 'contain'}}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />;
      },
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}>
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://ecom-backend-peach.vercel.app/profile/${userId}`,
        );
        const {user} = response.data;
        setUser(user);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchUserProfile();
  }, []);

  const logout = () => {
    clearAuthToke();
  };

  const clearAuthToke = async () => {
    AsyncStorage.removeItem('authToken');
    console.log('authToken removed');
    navigation.replace('Login');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://ecom-backend-peach.vercel.app/orders/${userId}`,
        );
        const orders = response.data.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchOrders();
  }, []);
  console.log('userId in profile', userId);
  console.log('user', user);
  return (
    <ScrollView style={{padding: 10, flex: 1, backgroundColor: 'white'}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        Welcome {user?.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <Pressable
        onPress={()=>setButtonClicked("Your orders")}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{fontSize:16,textAlign: 'center',color:"#FF8C42",fontWeight:'bold'}}>Your orders</Text>
        </Pressable>
        <Pressable
        onPress={()=>setButtonClicked("Your Account")}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{fontSize:16,textAlign: 'center',color:"#FF8C42",fontWeight:'bold'}}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <Pressable
        onPress={()=>setButtonClicked("Buy Again")}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{fontSize:16,textAlign: 'center',color:"#FF8C42",fontWeight:'bold'}}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{fontSize:16,textAlign: 'center',color:"#FF8C42",fontWeight:'bold'}}>Logout</Text>
        </Pressable>
      </View>
{
  buttonClicked === "Your orders" &&  
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {loading ? (
    <Text>Loading...</Text>
  ) : orders.length > 0 ? (
    orders.map(order => (
      <Pressable
        style={{
          marginTop: 20,
          padding: 15,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#FF8C42',
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={order._id}>
        {/* Render the order information here */}
        {order.products.slice(0, 1)?.map(product => (
          <View style={{marginVertical: 10}} key={product._id}>
            <Image
              source={{uri: product.image}}
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          </View>
        ))}
      </Pressable>
    ))
  ) : (
    <Text>No orders found</Text>
  )}
</ScrollView>
}

{
  buttonClicked === "Your Account" &&
  <View style={{marginTop: 20}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>Account details</Text>
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Name</Text>
        <Text>{user?.name}</Text>
        </View>
        <View style={{marginTop: 10}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Name</Text>
        <Text>{user?.name}</Text>
        </View>
        <View style={{marginTop: 10}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Name</Text>
        <Text>{user?.email}</Text>
        </View>
        <View style={{marginTop: 10}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Name</Text>
        <Text>{user?.password}</Text>
        </View>
        <View style={{marginTop: 10}}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Name</Text>
        <Text>{user?.addresses[0].city}</Text>
        </View>
    </View>
}
   
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
