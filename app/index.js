import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  // eslint-disable-next-line no-unused-vars
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';

import { log, LOG_LEVEL_ERROR } from './lib/util';
import AppNavigator from './config/AppNavigator';
// eslint-disable-next-line no-unused-vars
import Header from './components/Header';
import store from './config/redux';

if (__DEV__) {
  // eslint-disable-next-line no-console
  import('./config/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}


async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      // eslint-disable-next-line global-require
      require('./assets/images/banner.png'),
      // eslint-disable-next-line global-require
      require('./assets/images/yffl_128.png'),
      //      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      // eslint-disable-next-line global-require
      // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  log(error, LOG_LEVEL_ERROR);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    flex: 1,
  },
});

EStyleSheet.build({
  //  outline: 1,
});

const AppContainer = createAppContainer(AppNavigator);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);


  // TODO: Replace header

  // eslint-disable-next-line react/destructuring-assignment, react/prop-types
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }
  return (

    <Provider store={store}>
      <View style={styles.container}>
        {
          // android header requires status bar
          // Platform.OS === 'ios' && <StatusBar barStyle="default" />
        }
        <StatusBar backgroundColor="#ff0000" barStyle="default" />
        <Header />
        <AppContainer />
      </View>
    </Provider>
  );
}
