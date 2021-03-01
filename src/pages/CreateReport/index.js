import React, {useState} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  DatePicker,
  Gap,
  Header,
  Input,
  InputPhoto,
  Loading,
} from '../../components';
import {colors, fonts, useForm} from '../../utils';
import {Picker} from '@react-native-picker/picker';
import {Fire} from '../../config';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {v4 as uuidv4} from 'uuid';
import {ILNullPhoto} from '../../assets';

const CreateReport = ({navigation}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showEndDate, setShowEndDate] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDate(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showStartDateMode = (currentMode) => {
    setShowStartDate(true);
    setMode(currentMode);
  };

  const showEndDateMode = (currentMode) => {
    setShowEndDate(true);
    setMode(currentMode);
  };

  const showStartDatepicker = () => {
    showStartDateMode('date');
  };

  const showEndDatepicker = () => {
    showEndDateMode('date');
  };

  const [kategoriCollection] = useState([
    'Pilih Kategori',
    'Izin Bencana',
    'Izin Anak Sakit',
  ]);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [uriPhoto, setUriPhoto] = useState(ILNullPhoto);

  const [form, setForm] = useForm({
    kategori: '',
    perihal: '',
    keterangan: '',
  });

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

  const onSubmitHandler = () => {
    setLoading(true);
    let data = {
      kategori: form.kategori,
      perihal: form.perihal,
      keterangan: form.keterangan,
      tanggalMulai: startDate.toString(),
      tanggalAkhir: endDate.toString(),
      photo: photo,
      uriPhoto: uriPhoto,
    };

    Fire.database()
      .ref(`reports/${uuidv4()}/`)
      .set(data, (error) => {
        if (error) {
          // The write failed...
          setLoading(false);
          showMessage({
            message: `Failed to create report!  `,
            description: `${error.message}`,
            type: 'danger',
          });
        } else {
          setLoading(false);
          // Data saved successfully!
          showMessage({
            message: `Report Created Successfully!  `,
            description: `View your report on history page`,
            type: 'success',
          });
          navigation.replace('MainApp');
        }
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header
          title="Ijin"
          showIcon="icon-only"
          onPress={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.label}>Kategori</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={form.kategori}
                onValueChange={(itemValue, itemIndex) =>
                  setForm('kategori', itemValue)
                }>
                {kategoriCollection.map((eventCollection, index) => (
                  <Picker.Item
                    key={index}
                    label={eventCollection}
                    value={eventCollection}
                  />
                ))}
              </Picker>
            </View>
            <Gap height={24} />
            <DatePicker
              label="Dari Tanggal"
              date={startDate}
              mode={mode}
              show={showStartDate}
              showDatepicker={showStartDatepicker}
              onChangeDate={onChangeStartDate}
            />
            <Gap height={24} />
            <DatePicker
              label="Sampai Tanggal"
              date={endDate}
              mode={mode}
              show={showEndDate}
              showDatepicker={showEndDatepicker}
              onChangeDate={onChangeEndDate}
            />
            <Gap height={24} />
            <Input
              label="Perihal"
              value={form.perihal}
              onChangeText={(value) => setForm('perihal', value)}
            />
            <Gap height={24} />
            <Input
              label="Keterangan"
              value={form.keterangan}
              onChangeText={(value) => setForm('keterangan', value)}
            />
            <Gap height={24} />
            <View style={{flexDirection: 'row'}}>
              <InputPhoto
                label="Photo 1"
                currentPhoto={uriPhoto}
                hasPhoto={hasPhoto}
                setHasPhoto={setHasPhoto}
                onPress={onUploadPhotoHandler}
              />
              <InputPhoto
                label="Photo 2"
                currentPhoto={uriPhoto}
                hasPhoto={hasPhoto}
                setHasPhoto={setHasPhoto}
                onPress={onUploadPhotoHandler}
              />
              <InputPhoto
                label="Photo 3"
                currentPhoto={uriPhoto}
                hasPhoto={hasPhoto}
                setHasPhoto={setHasPhoto}
                onPress={onUploadPhotoHandler}
              />
            </View>
            <Gap height={40} />
            <Button title="Submit" onPress={onSubmitHandler} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default CreateReport;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  content: {padding: 40, paddingTop: 0},
  label: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginBottom: 6,
  },
  pickerWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});
