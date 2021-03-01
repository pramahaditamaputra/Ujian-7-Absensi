import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ILHomeSecurity} from '../../assets';
import {Button, Gap, Input, Link, Loading} from '../../components';
import {colors, fonts, useForm} from '../../utils';
import LottieView from 'lottie-react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Fire} from '../../config';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const onSubmitHandler = () => {
    setLoading(true);
    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        showMessage({
          message: `Login Success!`,
          description: `Welcome to Dashboard.`,
          type: 'success',
        });
        setLoading(false);
        console.log(success);
        navigation.replace('UploadPhoto', {uid: success.user.uid});
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`errorCode : ${errorCode} errorMessage: ${errorMessage}`);
        setLoading(false);
        showMessage({
          message: `Login Failed!  `,
          description: `${errorMessage}.`,
          type: 'danger',
        });
      });
  };
  return (
    <>
      <View style={styles.page}>
        <View height={100} width={100}>
          <LottieView source={ILHomeSecurity} autoPlay loop />
        </View>
        <Text style={styles.title}>Login</Text>
        <Input
          label="Email Address"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
        />
        <Gap height={10} />
        <Link title="Forgot Password" size={12} />
        <Gap height={40} />
        <Button title="Sign In" onPress={onSubmitHandler} />
        <Gap height={30} />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Link title="Create New Account" size={16} align="center" />
        </TouchableOpacity>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});
