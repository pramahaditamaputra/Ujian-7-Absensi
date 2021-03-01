import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {Button, Gap, Header, InputPhoto, Link, Loading} from '../../components';
import {Fire} from '../../config';
import {colors, fonts} from '../../utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage, hideMessage} from 'react-native-flash-message';
import RNLocation from 'react-native-location';

const UploadPhoto = ({navigation, route}) => {
  const {uid} = route.params;
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState('');
  const [uriPhoto, setUriPhoto] = useState(ILNullPhoto);
  const [hasPhoto, setHasPhoto] = useState(false);
  const optionsImage = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 0.5,
    maxWidth: 200,
    maxHeight: 200,
  };
  const onUploadPhotoHandler = () => {
    launchCamera(optionsImage, (response) => {
      if (response.didCancel) {
        showMessage({
          message: 'cancel',
          type: 'danger',
        });
      } else {
        console.log(response);
        setHasPhoto(true);
        setPhoto(`data:${response.type};base64, ${response.base64}`);
        setUriPhoto({uri: response.uri});
      }
    });
  };
  const getName = () => {
    return Fire.database()
      .ref('/users/' + uid)
      .once('value')
      .then((snapshot) => {
        var username =
          (snapshot.val() && snapshot.val().fullname) || 'Anonymous';
        var verif = snapshot.val() && snapshot.val().isVerif;
        if (verif) {
          setLoading(false);
          navigation.replace('MainApp', {uid: uid});
        } else {
          setName(username);
          setLoading(false);
        }
      });
  };

  const verifiedHandler = () => {
    setLoading(true);
    return Fire.database()
      .ref('/users/' + uid)
      .update({isVerif: true})
      .then(() => {
        showMessage({
          message: `Verify Success!  `,
          description: `Welcome to Dashboard.`,
          type: 'success',
        });
        setLoading(false);
        navigation.replace('MainApp', {uid: uid});
      });
  };

  useEffect(() => {
    console.log(uid);
    console.log('Anjind');
    setLoading(true);
    getName();
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
      // iOS Only
      activityType: 'other',
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    }).then((granted) => {
      if (granted) {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
          (locations) => {
            console.log(locations);
            setLocation(`${locations[0].longitude}, ${locations[0].latitude}`);
            /* Example location returned
        {
          speed: -1,
          longitude: -0.1337,
          latitude: 51.50998,
          accuracy: 5,
          heading: -1,
          altitude: 0,
          altitudeAccuracy: -1
          floor: 0
          timestamp: 1446007304457.029,
          fromMockProvider: false
        }
        */
          },
        );
      }
    });
  }, []);

  return (
    <>
      <View style={styles.page}>
        {/* <Header title="Selfie Verification" /> */}
        <View style={styles.content}>
          <View style={styles.profile}>
            {hasPhoto ? (
              <Text style={styles.name}>Verified!</Text>
            ) : (
              <Text style={styles.name}>Selfie Verification</Text>
            )}
            <Gap height={20} />
            <TouchableOpacity
              onPress={onUploadPhotoHandler}
              style={styles.avatarWrapper}>
              <Image source={uriPhoto} style={styles.avatar} />
              {hasPhoto ? (
                <IconRemovePhoto style={styles.addPhoto} />
              ) : (
                <IconAddPhoto style={styles.addPhoto} />
              )}
            </TouchableOpacity>
            <Gap height={20} />
            {hasPhoto && <Text style={styles.name}>{name}</Text>}
            {hasPhoto && <Text style={styles.profession}>{location}</Text>}
          </View>
          {hasPhoto && (
            <View>
              <Button title="Login and Continue" onPress={verifiedHandler} />
              <Gap height={30} />
              {/* <Link title="Skip for this" align="center" size={16} /> */}
            </View>
          )}
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  avatar: {
    width: 135,
    height: 135,
    borderRadius: 135 / 2,
  },
  avatarWrapper: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 150 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {position: 'absolute', bottom: 0, right: 0},
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
  },
});
