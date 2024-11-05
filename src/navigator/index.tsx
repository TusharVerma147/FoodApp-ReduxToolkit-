import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import Cart from '../screens/cart';
import Favourite from '../screens/favourite';
import SplashScreen from '../screens/splash';
import { ScreenNames } from './screenNames';








const RootNavigator = () => {

const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}>
      <Stack.Screen
          component={SplashScreen}
            name={ScreenNames.Splash}
          options={{headerShown: false}}
        />   
        <Stack.Screen
          component={Home}
            name={ScreenNames.Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Cart}
            name={ScreenNames.Cart}
          options={{headerShown: false}}
        />
       <Stack.Screen
          component={Favourite}
            name={ScreenNames.Fav}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
