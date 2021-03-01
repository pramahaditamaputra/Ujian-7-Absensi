import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Header, ListReport, Loading} from '../../components';
import {colors} from '../../utils';
import {Fire} from '../../config/';

const HistoryReport = ({navigation}) => {
  const [reports, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Fire.database()
      .ref('/reports/')
      .once('value')
      .then((snapshot) => {
        let tutorials = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var data = childSnapshot.val();
          tutorials.push({
            key: key,
            tanggalMulai: data.tanggalMulai,
            tanggalAkhir: data.tanggalAkhir,
            description: data.description,
            event: data.event,
            fullname: data.fullname,
            photo: data.photo,
          });
        });
        console.log(tutorials);
        setReport(tutorials);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <View style={styles.page}>
        <Header
          title="Absen Report"
          showIcon="icon-only"
          onPress={() => navigation.goBack()}
        />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {reports && console.log(reports)}
          {reports &&
            reports.map((report) => (
              <ListReport
                event={report.tanggalMulai}
                description={report.tanggalAkhir}
                currentPhoto={report.photo}
              />
            ))}
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default HistoryReport;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
