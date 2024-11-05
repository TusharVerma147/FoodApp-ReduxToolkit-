import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductsAction} from '../../redux/config/configAction';
import {Icons} from '../../assets';
import { toggleLikeItem, addIncrease, removefrombag, decrease  } from '../../redux/config/configSlice';


const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
 

  

  
  const likedItems = useSelector((state: any) => state.mainapi.likedItems);

  const cartItems = useSelector((state: any) => state.mainapi.cartItems);


  

 const addToBag =(item) =>{
  dispatch(addIncrease(item))
 }
 

 const remove = (item) =>{
  dispatch(removefrombag(item))
 }

 const decreaseitem =(item) =>{
  dispatch (decrease(item))
 }

  



  const renderItem = ({item, index}: {item: any; index: any}) => {
    const productsInCart = cartItems.find(product => product.id === item.id);
    
    return (
      <View style={styles.listinside}>
        <View style={styles.list}>
     
            <Image style={styles.img} source={{uri: item.image}} />
         
        </View>
        <Text style={styles.titletext} numberOfLines={5}>
          {item.title}
        </Text>
        <Text style={styles.pricetext}>₹{item.price}</Text>
        <View style={styles.ratingview}>
          <Text style={styles.ratetext}>{item.rating.rate} ★</Text>
          <Text style={styles.counttext}>[{item.rating.count} Reviews]</Text>
        </View>
        <Text style={styles.textdescription} numberOfLines={12}>
          {item.description}
        </Text>
        
      <View style={styles.remove}>
           <TouchableOpacity onPress={() => decreaseitem(item)}>
           <Text style={styles.touchabletext}>-</Text>
         </TouchableOpacity>
         <Text style={styles.touchabletext}>{productsInCart.quantity}</Text>
         <TouchableOpacity onPress={()=> addToBag(item)}>
           <Text style={styles.touchabletext}>+</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => remove(item)}>
             <Text style={styles.touchabletext}>Remove From Cart</Text>
           </TouchableOpacity>
           </View>
           
     
        
  
        
      </View>
    );
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.tata} source={Icons.tata} />
          <View>
            <Text style={styles.fliptext}>TATA</Text>
            <Text style={styles.subtext}>CLIQ</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Fav')}>
            <Image style={styles.wishlist} source={Icons.wishlist} />
            {likedItems.length > 0 && (
      <Text style={styles.likeditems}>{likedItems.length}</Text>
    )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.empty}>
     
         
     {cartItems.length === 0 ? (
          <>
           <Image style={styles.emptylist} source={Icons.trolley} />
           <Text style={styles.emptytext}> Your shopping cart is empty!</Text>
           <TouchableOpacity style={styles.continuebutton} onPress={()=> navigation.navigate('Home')}>
            <Text style={styles.continuetext}>Continue Shopping</Text>
           </TouchableOpacity>
           </>
        ):(
<FlatList
         data={cartItems}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
           keyExtractor={item => item.id.toString()} 
        />
        )}
        
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {flexDirection: 'row'},
  favview: {
    flex: 1,
    alignItems: 'flex-end',
  },
  fav: {
    height: 30,
    width: 30,
  },
  imgview: {
    flex: 9,
    alignItems: 'center',
    paddingLeft: '10%',
  },
  img: {
    height: 250,
    width: 200,
    resizeMode: 'contain',
    flex: 1,
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
    color: 'white',
    backgroundColor: '#de3163',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  fliptext: {
    fontSize: 17,
    fontWeight: '700',
    color: '#de3163',
  },
  subtext: {
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
  },
  tata: {
    height: 50,
    width: 50,
  },
  wishlist: {
    height: 40,
    width: 40,
    marginHorizontal: 10,
  },
  loader: {  
    justifyContent: 'center', 
    alignItems: 'center' ,
    flex:1
  },
  touchabletext: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#de3163',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginTop:10
  },
  remove:{
    flexDirection:'row',
  },
  likeditems:{
    position:'absolute',
    fontSize:20,
    marginLeft:35,
    borderRadius:20,
    backgroundColor:'#de3163',
    paddingHorizontal:6,
    textAlign:'center',
    color:'white'
   },
   emptylist:{
    height:200,
    width:200,
    resizeMode:'contain'
},
empty:{
  justifyContent:'center',
  alignItems:'center',
  flex:1,
},
emptytext:{
  fontSize:18,
  margin:20,
  color:'#800020',
},
continuebutton:{
  borderColor:'#de3163',
  borderWidth:1,
  padding:10,
  borderRadius:10,
},
continuetext:{
  color:'#de3163',
  fontWeight:'700'
}
});
