import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {BottomModal} from 'react-native-modals';
import {SlideAnimation, ModalContent} from 'react-native-modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";
import { UserType } from '../UserContext';
import BASE_URL from '../config';


const HomeScreen = () => {
  const {width} = Dimensions.get('window');
  const IMAGE_HEIGHT = 200;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide: {
      flex: 1,
      height: '50%',
      // justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    image: {
      width: width - 20,
      height: IMAGE_HEIGHT,
      borderRadius: 10,
    },
    pagination: {
      bottom: -15, // Position dots below the image
    },
    placeholderStyles:{
      color: '#FF8C42',
      fontSize: 14,
      fontWeight: 'bold',
    }
  });

  const list = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg',
      name: 'Home',
    },
    {
      id: '1',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg',
      name: 'Deals',
    },
    {
      id: '3',
      image:
        'https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg',
      name: 'Electronics',
    },
    {
      id: '4',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg',
      name: 'Mobiles',
    },
    {
      id: '5',
      image:
        'https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg',
      name: 'Music',
    },
    {
      id: '6',
      image: 'https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg',
      name: 'Fashion',
    },
  ];
  const images = [
    // 'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    // 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
  ];

  const deals = [
    {
      id: '20',
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
      oldPrice: 25000,
      price: 19000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
      ],
      color: 'Stellar Green',
      size: '6 GB RAM 128GB Storage',
    },
    {
      id: '30',
      title:
        'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
      oldPrice: 74000,
      price: 26000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      ],
      color: 'Cloud Navy',
      size: '8 GB RAM 128GB Storage',
    },
    {
      id: '40',
      title:
        'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
      oldPrice: 16000,
      price: 14000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
      ],
      color: 'Icy Silver',
      size: '6 GB RAM 64GB Storage',
    },
    {
      id: '40',
      title:
        'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
      oldPrice: 12999,
      price: 10999,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
      ],
    },
  ];

  const offers = [
    {
      id: '0',
      title:
        'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
      offer: '72% off',
      oldPrice: 7500,
      price: 4500,
      image:
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
      ],
      color: 'Green',
      size: 'Normal',
    },
    {
      id: '1',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
      ],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '2',
      title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
      carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '3',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 24999,
      price: 19999,
      image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
      ],
      color: 'Norway Blue',
      size: '8GB RAM, 128GB Storage',
    },
  ];
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses,setAddresses]=useState([]);
  const [category, setCategory] = useState('jewelery');
  const {userId,setUserId}=useContext(UserType);
  const [selectedAddress,setSelectedAddress]=useState("");
  console.log("selected address",selectedAddress);

  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);

  const onGenderOpen = useCallback(() => {
    setOpen(false);
  });

  const [products, setproducts] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setproducts(response.data);
      } catch (err) {
        console.log('error messsage', err);
      }
    };

    fecthData();
  }, []);
  const cart = useSelector(state => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const fetchUser=async()=>{
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId=decodedToken.userId;
      setUserId(userId);
    }
    fetchUser();
  },[]);


  useEffect(() => {
    if(userId){
      fetchAddresses();
    }
  },[userId,modalVisible])

  const fetchAddresses=async()=>{
    try{
      const res=await axios.get(`${BASE_URL}/addresses/${userId}`);
      // console.log(res.data);
      const {addresses}=res.data;
      setAddresses(addresses);
    }
    catch(error){
      console.log("error",error);
    }
  }

  return (
    <>
      <SafeAreaView
        style={{
          paddinTop: Platform.OS === 'android' ? 40 : 0,
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ScrollView>
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
              <TextInput style={{color:"black"}} placeholder="Search Amazon.in" />
            </Pressable>

            <Ionicons name="mic" size={24} color="black" />
          </View>

          <Pressable
          onPress={() => setModalVisible(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              padding: 10,
              backgroundColor: '#FFC4A7',
            }}>
            <Ionicons name="location-outline" size={24} color="black" />
            <Pressable>
             {selectedAddress ? (
               <Text style={{fontSize: 13, fontWeight: 500}}>
               Deliver to {selectedAddress?.name} - {selectedAddress?.street}
             </Text>
              ):(
                <Text style={{fontSize: 13, fontWeight: 500}}>
                Add an address
              </Text>
              )}
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                  source={{uri: item.image}}
                />

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 5,
                  }}>
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView> */}

          {/* carousel */}

          <Swiper
            paginationStyle={styles.pagination}
            style={{height: IMAGE_HEIGHT + 20,}}
            autoplay={true}
            showsPagination={true}
            loop={true}>
            {images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image
                  source={{uri: image}}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            ))}
          </Swiper>

          <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold',color:"#FF8C42"}}>
            Trending Deals of the week
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('Info', {
                    id: item?.id,
                    title: item?.title,
                    price: item?.price,
                    carouselImages: item?.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 180, height: 180, resizeMode: 'contain'}}
                  source={{uri: item?.image}}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: '#D0D0D0',
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{padding: 10, fontSize: 18, fontWeight: 'bold',color:"#FF8C42"}}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('Info', {
                    id: item?.id,
                    title: item?.title,
                    price: item?.price,
                    carouselImages: item?.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{width: 150, height: 150, resizeMode: 'contain'}}
                  source={{uri: item?.image}}
                />

                <View
                  style={{
                    backgroundColor: '#FF8C42',
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{
              height: 1,
              borderColor: '#D0D0D0',
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: '45%',
              marginBottom: open ? 50 : 15,
            }}>
            <DropDownPicker
              style={{
                borderColor: '#FF8C42',
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              // onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {products
              ?.filter(item => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
  onBackdropPress={() => setModalVisible(!modalVisible)}
  swipeObject={['up', 'down']}
  swipeThreshold={200}
  modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}
  onHardwareBackPress={() => setModalVisible(!modalVisible)}
  visible={modalVisible}
  onTouchOutside={() => setModalVisible(!modalVisible)}>
  <ModalContent
    style={{
      width: '100%',
      height: 400,
      backgroundColor: 'white',
      borderRadius: 0,
      overflow: 'hidden',
    }}>
    {/* Gradient Background */}
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FF8C42',
        borderRadius: 20,
      }}>
      <LinearGradient
        colors={['#FF8C42', '#FFC4A7']}
        style={{
          flex: 1,
          opacity: 0.8,
        }}
      />
    </View>

    <View style={{marginBottom: 8, padding: 10}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFF'}}>
        Choose your location
      </Text>
      <Text style={{marginTop: 5, fontSize: 16, color: '#F5F5F5'}}>
        Select a delivery location to see product availability and delivery options
      </Text>
    </View>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {/* Already added addresses */}
      {addresses?.map((address, index) => (
        <Pressable
          key={index}
          onPress={() => setSelectedAddress(address)}
          style={{
            width: 140,
            height: '100%',
            borderColor: '#FFFFFF',
            borderWidth: 1,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            marginRight: 15,
            marginTop: 10,
            backgroundColor: selectedAddress === address ? '#FF9E63' : '#FFF',
            borderRadius: 10,
            elevation: 4,
            shadowColor: '#000',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: '#333'}}>
              {address?.name}
            </Text>
            <Ionicons name="location-outline" size={24} color="red" />
          </View>
          <Text numberOfLines={1} style={{width: 130, fontSize: 13, textAlign: 'center'}}>
            {address?.houseNo}, {address?.landmark}
          </Text>
          <Text numberOfLines={1} style={{width: 130, fontSize: 13, textAlign: 'center'}}>
            {address?.street}
          </Text>
          <Text numberOfLines={1} style={{width: 130, fontSize: 13, textAlign: 'center'}}>
            India, Bangalore
          </Text>
        </Pressable>
      ))}

      {/* Add Address Button */}
      <Pressable
        onPress={() => {
          setModalVisible(false);
          navigation.navigate('Address');
        }}
        style={{
          width: 140,
          height: 140,
          borderColor: '#FFFFFF',
          borderWidth: 1,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          marginRight: 15,
          marginTop: 10,
          backgroundColor: '#FFB185',
          borderRadius: 10,
          elevation: 4,
          shadowColor: '#000',
        }}>
        <Text style={{textAlign: 'center', color: '#0066b2', fontWeight: '500'}}>
          Add an address or pick up point
        </Text>
      </Pressable>
    </ScrollView>

    {/* Location Options */}
    <View style={{flexDirection: 'column', gap: 7, marginBottom: 30, padding: 10}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <Ionicons name="location" size={22} color="white" />
        <Text style={{color: 'white', fontWeight: '400'}}>Enter an Indian Pincode</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'flex-start', gap: 5}}>
        <Ionicons name="locate-sharp" size={22} color="white" />
        <Text style={{color: 'white', fontWeight: '400'}}>Use my current location</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
        <Ionicons name="earth" size={22} color="white" />
        <Text style={{color: 'white', fontWeight: '400'}}>Deliver outside India</Text>
      </View>
    </View>
  </ModalContent>
</BottomModal>

    </>
  );
};

export default HomeScreen;
