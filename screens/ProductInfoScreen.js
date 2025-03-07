import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartReducer';

const ProductInfoScreen = () => {
  const route = useRoute();
  const [addedToCart, setAddedToCart] = useState(false);

  const cart = useSelector(state => state.cart.cart);
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  console.log(cart);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: '#FF8C42',
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{width, height, marginTop: 25, resizeMode: 'contain'}}
            source={{uri: item}}
            key={index}>
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {/* <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#FF8C42',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 12,
                  }}>
                  20% off
                </Text>
              </View> */}
              {/* <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#FF8C42',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View> */}
            </View>

            {/* <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#FF8C42',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 'auto',
                marginLeft: 20,
                marginBottom: 20,
              }}>
              <AntDesign name="hearto" size={24} color="black" />
            </View> */}
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: '500'}}>
          {route?.params?.title}
        </Text>

        <Text style={{fontSize: 18, fontWeight: '600', marginTop: 6}}>
          ₹{route?.params?.price}
        </Text>
      </View>
      <Text style={{height: 1, borderColor: '#D0D0D0', borderWidth: 1}} />

      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text>Color: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {route?.params?.color}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text>Size: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {route?.params?.size}
        </Text>
      </View>
      <Text style={{height: 1, borderColor: '#D0D0D0', borderWidth: 1}} />

      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginVertical: 5}}>
          Total : ₹{route.params.price}
        </Text>
      </View>

      
      <Pressable
        onPress={() => {
          addItemToCart(route?.params?.item);
        }}
        style={{
          backgroundColor: '#FF8C42',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        {addedToCart ? (
          <View>
            <Text>Added to cart</Text>
          </View>
        ) : (
          <View>
            <Text>Add to cart</Text>
          </View>
        )}
      </Pressable>
      <Pressable
        style={{
          backgroundColor: '#FFB185',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
