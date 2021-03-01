import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../../assets';
import {colors, fonts} from '../../../utils';

const InputPhoto = ({hasPhoto, setHasPhoto, onPress, currentPhoto, label}) => {
  return (
    <View style={styles.profile}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.avatarWrapper} onPress={onPress}>
        <Image style={styles.avatar} source={currentPhoto} />
        {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
        {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
      </TouchableOpacity>
    </View>
  );
};

export default InputPhoto;

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    width: '34%',
    height: '34%',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    flex: 1,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  avatarWrapper: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 90 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addPhoto: {position: 'absolute', bottom: 0, right: 0},
  label: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginBottom: 6,
  },
});
