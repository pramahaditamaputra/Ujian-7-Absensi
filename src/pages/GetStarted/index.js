import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILHomeSecurity} from '../../assets';
import {Button, Gap} from '../../components';
import {colors, fonts} from '../../utils';
import LottieView from 'lottie-react-native';

const GetStarted = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <View height={100} width={100}>
          <LottieView source={ILHomeSecurity} autoPlay loop />
        </View>
        <Text style={styles.title}>Sistem Keamanan Lingkungan</Text>
      </View>
      <View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Register')}
        />
        <Gap height={15} />
        <Button
          title="Sign In"
          type="secondary"
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    color: colors.text.primary,
    marginTop: 91,
    fontFamily: fonts.primary[600],
  },
});
