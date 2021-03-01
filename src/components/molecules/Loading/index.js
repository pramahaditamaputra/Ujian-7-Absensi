import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import LottieView from 'lottie-react-native';
import {ILLoading} from '../../../assets';

const Loading = () => {
  return (
    <View style={styles.container}>
      <View height={200} width={200}>
        <LottieView source={ILLoading} autoPlay loop />
      </View>
      <Text style={styles.text}>Loading ... </Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    marginTop: -50,
  },
});
