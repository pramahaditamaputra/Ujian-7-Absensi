/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILHomeSecurity} from '../../assets';
import {colors, fonts} from '../../utils';
import LottieView from 'lottie-react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <View height={200} width={200}>
        <LottieView source={ILHomeSecurity} autoPlay loop />
      </View>
      <View>
        <Text style={styles.title}>Sistem Keamanan Lingkungan</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.text.primary,
    fontSize: 24,
    fontFamily: fonts.primary[600],
  },
});
