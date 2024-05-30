import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import Logo from '../Logo';
import Moon from '../Moon';
import Sun from '../Sun';
import LanguagePicker from '../LanguagePicker';
import {fontFamily} from '../../constants/style';
import {useI18n} from '../../hooks/useI18n';

interface IHeaderProps {
  backgroundColor: string;
  borderColor: string;
  color: string;
  isDarkMode: boolean;
  onColorSchemeChange: () => void;
}

function Header(props: IHeaderProps) {
  const {backgroundColor, borderColor, color, isDarkMode, onColorSchemeChange} =
    props;
  const {translate} = useI18n();

  return (
    <View style={{...styles.header, borderBottomColor: borderColor}}>
      <Logo height={35} width={35} />
      <View style={styles.mainTitleView}>
        <Text style={{...styles.mainTitle, color}}>
          {translate('Chinese Festivals')}
        </Text>
      </View>
      <TouchableHighlight
        onPress={onColorSchemeChange}
        underlayColor="transparent">
        <View style={{...styles.buttonIcon, borderColor}}>
          {isDarkMode ? (
            <Sun height={24} width={24} style={{...styles.title, color}} />
          ) : (
            <Moon height={24} width={24} style={{...styles.title, color}} />
          )}
        </View>
      </TouchableHighlight>
      <LanguagePicker
        backgroundColor={backgroundColor}
        borderColor={borderColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonIcon: {
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    height: 28,
    justifyContent: 'center',
    minWidth: 28,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 16,
  },
  mainTitle: {
    fontFamily,
    fontSize: 26,
    fontWeight: 'bold',
  },
  mainTitleView: {
    marginRight: 'auto',
  },
  title: {
    fontFamily,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
