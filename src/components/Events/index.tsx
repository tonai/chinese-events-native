import {Picker} from '@react-native-picker/picker';
import {CalendarChinese, IChineseDate} from 'date-chinese';
import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {fontFamily} from '../../constants/style';
import {useI18n} from '../../hooks/useI18n';

const cal = new CalendarChinese();

const now = new Date().getFullYear();
const years = new Array(11).fill(null).map((_, i) => String(now - 5 + i));

interface IEventsProps {
  borderColor: string;
  color: string;
}

function Events(props: IEventsProps): React.JSX.Element {
  const {borderColor, color} = props;
  const [year, setYear] = useState(now);
  const {formatDate, translate} = useI18n();

  const [chineseYear, newYear] = useMemo(() => {
    const newYear = cal.newYear(year);
    cal.fromJDE(newYear);
    return [cal.get(), cal.toGregorian()];
  }, [year]);
  const lanternFestival = useMemo(() => {
    const cDate = chineseYear.slice() as IChineseDate;
    cDate[2] = 1;
    cDate[4] = 15;
    cal.set(cDate);
    return cal.toGregorian();
  }, [chineseYear]);
  const dragonBoatFestival = useMemo(() => {
    const cDate = chineseYear.slice() as IChineseDate;
    cDate[2] = 5;
    cDate[4] = 5;
    cal.set(cDate);
    return cal.toGregorian();
  }, [chineseYear]);
  const qixiFestival = useMemo(() => {
    const cDate = chineseYear.slice() as IChineseDate;
    cDate[2] = 7;
    cDate[4] = 7;
    cal.set(cDate);
    return cal.toGregorian();
  }, [chineseYear]);
  const midAutumnFestival = useMemo(() => {
    const cDate = chineseYear.slice() as IChineseDate;
    cDate[2] = 8;
    cDate[4] = 15;
    cal.set(cDate);
    return cal.toGregorian();
  }, [chineseYear]);
  const chongyangFestival = useMemo(() => {
    const cDate = chineseYear.slice() as IChineseDate;
    cDate[2] = 9;
    cDate[4] = 9;
    cal.set(cDate);
    return cal.toGregorian();
  }, [chineseYear]);

  const events = [
    {title: translate('Chinese New Year'), date: newYear},
    {title: translate('Lantern Festival'), date: lanternFestival},
    {title: translate('DragonBoat Festival'), date: dragonBoatFestival},
    {title: translate('Qixi'), date: qixiFestival},
    {title: translate('Mid Autumn Festival'), date: midAutumnFestival},
    {title: translate('Double Ninth Festival'), date: chongyangFestival},
  ];

  function handleYearChange(itemValue: string) {
    setYear(Number(itemValue));
  }

  return (
    <View style={styles.content}>
      <View style={styles.contentHeader}>
        <View style={styles.headerTitle}>
          <Text style={{...styles.contentTitle, color}}>
            {year === now
              ? translate('This year events')
              : translate('$year events', {year})}
          </Text>
        </View>
        <View style={styles.headerYear}>
          <Picker selectedValue={String(year)} onValueChange={handleYearChange}>
            {years.map(year => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
        {/* <Button onPress={handleYearChange} title={translate('Change')} /> */}
      </View>
      <View style={{...styles.row, borderBottomColor: borderColor}}>
        <View style={styles.td}>
          <Text style={{...styles.thText, color}}>{translate('Events')}</Text>
        </View>
        <View style={styles.td}>
          <Text style={{...styles.thText, color}}>{translate('Date')}</Text>
        </View>
      </View>
      {events.map(({title, date}, i) => (
        <View key={i} style={{...styles.row, borderBottomColor: borderColor}}>
          <View style={styles.td}>
            <Text style={{...styles.tdText, color}}>{title}</Text>
          </View>
          <View style={styles.td}>
            <Text style={{...styles.tdText, color}}>{formatDate(date)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  contentHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  contentTitle: {
    fontFamily,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 2,
  },
  headerYear: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
  },
  td: {
    flex: 1,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
  },
  tdText: {
    fontFamily,
    fontSize: 14,
  },
  thText: {
    fontFamily,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Events;
