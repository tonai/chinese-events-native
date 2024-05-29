import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import Events from '../Events';
import {I18nProvider} from '../I18nProvider';
import Header from '../Header';

function App(): React.JSX.Element {
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const isDarkMode = colorScheme === 'dark';

  const backgroundColor = isDarkMode ? '#242424' : '#ffffff';
  const borderColor = isDarkMode ? '#424242' : '#dee2e6';
  const color = isDarkMode ? '#c9c9c9' : '#000000';

  function handleColorSchemeChange() {
    setColorScheme(isDarkMode ? 'light' : 'dark');
  }

  return (
    <I18nProvider>
      <SafeAreaView style={{...styles.container, backgroundColor}}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{backgroundColor}}>
          <View>
            <Header
              borderColor={borderColor}
              color={color}
              isDarkMode={isDarkMode}
              onColorSchemeChange={handleColorSchemeChange}
            />
            <Events borderColor={borderColor} color={color} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
