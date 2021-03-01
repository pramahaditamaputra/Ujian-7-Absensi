import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';

const CardMenu = ({title, image, onPress, check}) => {
  if (check === 'disabled') {
    return (
      <View style={styles.container} onPress={onPress}>
        <View width={75} height={50}>
          <LottieView source={image} autoPlay loop />
        </View>
        <Gap height={20} />
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View width={75} height={50}>
        <LottieView source={image} autoPlay loop />
      </View>
      <Gap height={20} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CardMenu;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
