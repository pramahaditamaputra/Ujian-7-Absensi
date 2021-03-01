import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';
import {fonts} from '../../../utils/fonts/index';

const ListReport = ({fullname, address, event, description, currentPhoto}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperChat}>
        <Text style={styles.name}>Check In : {event}</Text>
        <Text style={styles.name}>Check Out : {description} </Text>
        <Image
          style={{height: 100, width: 100, borderRadius: 10}}
          source={{
            uri: currentPhoto,
          }}
        />
      </View>
    </View>
  );
};

export default ListReport;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  avatar: {width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12},
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
});
