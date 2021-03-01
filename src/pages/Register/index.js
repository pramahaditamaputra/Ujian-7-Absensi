import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Gap,
  Header,
  Input,
  InputPhoto,
  Loading,
} from '../../components';
import {Fire} from '../../config';
import {colors, getData, storeData, useForm} from '../../utils';
import {showMessage, hideMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    fullname: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
  });

  const onSubmitHandler = () => {
    const data = {
      fullname: form.fullname,
      email: form.email,
      address: form.address,
      phoneNumber: form.phoneNumber,
      isVerif: false,
      isCheckIn: false,
    };
    // getData().then((res) => {
    //   console.log(`Data : ${res.phoneNumber}`);
    // });

    setLoading(true);
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((success) => {
        // Signed in
        // console.log(success);
        // setForm('reset');
        Fire.database().ref(`users/${success.user.uid}/`).set(data);
        storeData(data);
        showMessage({
          message: `Registration Success!  `,
          description: `Please Login to use our App.`,
          type: 'success',
        });
        setLoading(false);
        navigation.replace('UploadPhoto', {uid: success.user.uid});
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`errorCode : ${errorCode} errorMessage: ${errorMessage}`);
        setLoading(false);
        showMessage({
          message: `Registration Failed!  `,
          description: `${errorMessage}.`,
          type: 'danger',
        });
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header title="Register" onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label="Full Name"
              value={form.fullname}
              onChangeText={(value) => setForm('fullname', value)}
            />
            <Gap height={24} />
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
            <Gap height={24} />
            <Input
              label="Address"
              value={form.address}
              onChangeText={(value) => setForm('address', value)}
            />
            <Gap height={24} />
            <Input
              label="Phone Number"
              value={form.phoneNumber}
              onChangeText={(value) => setForm('phoneNumber', value)}
            />
            <Gap height={40} />
            <Button title="Submit" onPress={onSubmitHandler} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  content: {padding: 40, paddingTop: 0},
});
