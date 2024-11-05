import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icons } from '../../assets';
import {  toggleLikeItem, addIncrease, removefrombag, decrease  } from '../../redux/config/configSlice';

const Favourite = ({ navigation }) => {

  const dispatch = useDispatch();
  const likedItems = useSelector((state: any) => state.mainapi.likedItems);

  const cartItems = useSelector((state: any) => state.mainapi.cartItems);

  const handleToggleLike = (item) => {
    dispatch(toggleLikeItem(item));
  };


  const renderItem = ({item, index}: {item: any; index: any}) => {

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
          <Text style={styles.ratetext}>{item.rating.rate}★</Text>
          <Text style={styles.counttext}>[{item.rating.count} Reviews]</Text>
        </View>
        <Text style={styles.textdescription} numberOfLines={12}>
          {item.description}
        </Text>
        <TouchableOpacity onPress={() => handleToggleLike(item)}>
          <Text style={styles.cartbutton}>Remove from Wishlist</Text>
        </TouchableOpacity>
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
          <Text style={styles.subtextwish}>Wish List</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
     
          <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
            <Image style={styles.wishlist} source={Icons.trolley} />
            {cartItems.length > 0 && (
      <Text style={styles.likeditems}>{cartItems.length}</Text>
    )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.empty}>
        {likedItems.length === 0 ? (
          <>
           <Image style={styles.emptylist} source={Icons.emptylist} />
           <Text style={styles.emptytext}> You have not added any product to your wishlist</Text>
           <TouchableOpacity style={styles.continuebutton} onPress={()=> navigation.navigate('Home')}>
            <Text style={styles.continuetext}>Continue Shopping</Text>
           </TouchableOpacity>
           </>
        ):(
<FlatList
         data={likedItems}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
           keyExtractor={item => item.id.toString()} 
        />
        )}
        
      </View>
    </SafeAreaView>
  );
};



export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
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
    margin: 10,
  },
  header: {
    paddingVertical: 5,
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
  subtextwish: {
    fontSize: 35,
    fontWeight: '500',
    color: 'black',
    marginHorizontal:20,
    marginTop:10
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

