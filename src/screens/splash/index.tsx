import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { Icons } from '../../assets';

const SplashScreen = ({ navigation }) => {
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.landingpage} source={Icons.tatacliq} />
    </View>
  );
};

export default SplashScreen;
