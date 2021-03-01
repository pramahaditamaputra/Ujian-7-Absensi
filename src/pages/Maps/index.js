import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../components';
import {colors} from '../../utils';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Maps = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="TKP" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <MapView
          style={styles.mapWrapper}
          provider={PROVIDER_GOOGLE}
          showsUserLocation>
          <Marker coordinate={{latitude: 51.5078788, longitude: -0.0877321}} />
        </MapView>
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  content: {flex: 1, backgroundColor: colors.white},
  mapWrapper: {flex: 1},
});
