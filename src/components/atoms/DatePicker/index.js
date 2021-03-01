import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors, fonts} from '../../../utils';

const DatePicker = ({
  showDatepicker,
  show,
  mode,
  onChangeDate,
  date,
  label,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.input}>
        <Text>
          {`${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 18,
    paddingLeft: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginBottom: 6,
  },
});
