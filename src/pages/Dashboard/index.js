import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  ILCreateReport,
  ILHistoryReport,
  ILMap,
  ILLogout,
  ILPulse,
  ILCheckIn,
  ILGoodBye,
  ILDisabled,
} from '../../assets';
import {CardMenu, Gap} from '../../components';
import {Fire} from '../../config';
import {colors, fonts} from '../../utils';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Dashboard = ({navigation}) => {
  // const {uid} = route.params;
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [countSOS, setCountSOS] = useState(0);
  const [loading, setLoading] = useState(false);

  const getCheckIn = () => {
    if (!isCheckIn) {
      showMessage({
        message: `Check In Success!`,
        description: `Dont Forget to Check out!`,
        type: 'success',
      });
    } else {
      showMessage({
        message: `Check Out Success!`,
        description: `Dont Forget to Check In Tomorrow!`,
        type: 'success',
      });
    }
    setIsCheckIn(!isCheckIn);
  };

  const onSignOutHandler = () => {
    setLoading(true);
    Fire.auth()
      .signOut()
      .then((success) => {
        showMessage({
          message: `Logout Success!`,
          description: `Please login back to use the app.`,
          type: 'success',
        });
        setLoading(false);
        navigation.replace('Login');
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`errorCode : ${errorCode} errorMessage: ${errorMessage}`);
        setLoading(false);
        showMessage({
          message: `Logout Failed!  `,
          description: `${errorMessage}.`,
          type: 'danger',
        });
      });
  };
  const handlerSOS = () => {
    if (countSOS !== 2) {
      setCountSOS(countSOS + 1);
    } else {
      setCountSOS(0);
      navigation.navigate('Maps');
    }
  };

  // useEffect(() => {
  //   getCheckIn();
  // }, []);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Dashboard</Text>
        <Gap height={50} />
        <View style={styles.cardWrapper}>
          {isCheckIn ? (
            <CardMenu
              title="Disabled"
              image={ILDisabled}
              check="disabled"
              onPress={getCheckIn}
            />
          ) : (
            <CardMenu title="Check In" image={ILCheckIn} onPress={getCheckIn} />
          )}
          <Gap width={10} />
          {!isCheckIn ? (
            <CardMenu
              title="Disabled"
              check="disabled"
              image={ILDisabled}
              onPress={getCheckIn}
            />
          ) : (
            <CardMenu
              title="Check Out"
              image={ILGoodBye}
              onPress={getCheckIn}
            />
          )}
          <Gap height={160} />
          <CardMenu
            title="Ijin"
            image={ILCreateReport}
            onPress={() => navigation.navigate('CreateReport')}
          />
          <Gap width={10} />
          <CardMenu
            title="Histori Absen"
            image={ILHistoryReport}
            onPress={() => navigation.navigate('HistoryReport')}
          />
        </View>
        <Gap height={50} />
        <CardMenu title="Log Out" image={ILLogout} onPress={onSignOutHandler} />
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.secondary},
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 25,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
