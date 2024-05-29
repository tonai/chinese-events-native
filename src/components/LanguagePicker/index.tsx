import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

interface ILanguagePickerProps {
  borderColor: string;
}

function LanguagePicker(props: ILanguagePickerProps) {
  const {borderColor} = props;

  function handleLangChange() {
    //
  }

  return (
    <TouchableHighlight onPress={handleLangChange} underlayColor="transparent">
      <View
        style={{
          ...styles.buttonIcon,
          ...styles.langButton,
          borderColor,
        }}>
        <Text style={styles.lang}>🇺🇸</Text>
      </View>
    </TouchableHighlight>
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
  lang: {
    fontSize: 12,
  },
  langButton: {
    width: 45,
  },
});

export default LanguagePicker;
