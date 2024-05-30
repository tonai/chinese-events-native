import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useI18n} from '../../hooks/useI18n';

interface ILanguagePickerProps {
  backgroundColor: string;
  borderColor: string;
}

function LanguagePicker(props: ILanguagePickerProps) {
  const {backgroundColor, borderColor} = props;
  const {language, languages, setLanguage} = useI18n();
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(x => !x);
  }

  function handleLangChange(key: string) {
    setLanguage(key);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <TouchableHighlight onPress={handleOpen} underlayColor="transparent">
        <View
          style={{
            ...styles.buttonIcon,
            borderColor,
          }}>
          <Text style={styles.lang}>{languages[language]?.flag || '🇺🇸'}</Text>
        </View>
      </TouchableHighlight>
      <Modal
        animationType="fade"
        onRequestClose={handleClose}
        transparent
        visible={open}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleClose}
          style={styles.backDrop}>
          <View style={{...styles.dialog, backgroundColor, borderColor}}>
            {Object.entries(languages).map(([key, value]) => (
              <TouchableHighlight
                key={key}
                onPress={() => handleLangChange(key)}
                underlayColor="transparent">
                <View style={styles.option}>
                  <Text style={styles.label}>
                    {value.flag} {value.label}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backDrop: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  buttonIcon: {
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    height: 28,
    justifyContent: 'center',
    width: 45,
  },
  dialog: {
    borderRadius: 4,
    borderWidth: 1,
    padding: 4,
    position: 'absolute',
    right: 16,
    top: 56,
  },
  label: {
    fontSize: 14,
  },
  lang: {
    fontSize: 12,
  },
  option: {
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
  },
});

export default LanguagePicker;
