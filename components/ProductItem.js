import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({item}) => {
  const [addedToCart, setaddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setaddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setaddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable style={{marginHorizontal: 15, marginVertical: 25}}>
      <Image
        style={{width: 150, height: 150, resizeMode: 'contain'}}
        source={{uri: item?.image}}
      />
      <Text numberOfLines={1} style={{width: 150, marginTop: 10}}>
        {item?.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>₹{item?.price}</Text>
        <Text style={{color: '#FF8C42', fontWeight: 'bold'}}>
          {item?.rating?.rate} ratings
        </Text>
      </View>

      <Pressable
      onPress={()=>addItemToCart(item)}
        style={{
          backgroundColor: '#FF8C42',
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
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
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
