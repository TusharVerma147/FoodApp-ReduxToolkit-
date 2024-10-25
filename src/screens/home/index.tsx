import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsAction} from '../../redux/config/configAction';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Home = () => {
  const dispatch = useDispatch();
  const apidata = useSelector((state: any) => {
    return state.mainapi.products;
  });

  const renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <View style={styles.listinside}>
        <Image style={styles.img} source={{uri: item.image}} />
        <Text style={styles.titletext} numberOfLines={5}>
          {item.title}
        </Text>
        <Text style={styles.pricetext}>₹{item.price}</Text>
        <View style={styles.ratingview}>
          <Text style={styles.ratetext}>{item.rating.rate} ★</Text>
          <Text style={styles.counttext}>{item.rating.count} Reviews</Text>
        </View>
        <Text style={styles.textdescription} numberOfLines={12}>
          {item.description}
        </Text>
        <TouchableOpacity>
            <Text style={styles.cartbutton}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    dispatch(getProductsAction());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.fliptext}>Amazon</Text>
            <Text style={styles.subtext}>Your all in one Shopping App</Text>
        </View>
      <View style={styles.listcard}>
        <FlatList
          data={apidata}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listcard: {},
  listinside: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    //   width: 350,
    //   height: 550,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  titletext: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  ratetext: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  pricetext: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
  textdescription: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  ratingview: {
    flexDirection: 'row',
  },
  counttext: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'grey',
    margin: 10,
  },
  cartbutton: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'orange',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal:30,
    margin: 10,
  },
  header:{
    backgroundColor:'orange',
    paddingVertical:17,
    marginBottom:10
  },
  fliptext:{
     fontSize:30,
     textAlign:'center',
     fontWeight:'500',
     color:'black'
  },
  subtext:{
    fontSize:20,
     textAlign:'center',
     fontWeight:'500',
     color:'black'
  }
});
