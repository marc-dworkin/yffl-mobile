import React from 'react';
import { View, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
// import Sample from './screens/Sample';
// eslint-disable-next-line no-unused-vars
import { BoxScoreNavigator } from './containers/BoxScore';
import { ScoreBoardNavigator } from './containers/ScoreBoard';
import store from './config/redux';
import Header from './components/Header';

import { log, LOG_LEVEL_INFO } from './lib/util';

// import ScoreBoard from './containers/ScoreBoard';

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


if (__DEV__) {
  // eslint-disable-next-line no-console
  import('./config/ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

/*
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff0000" barStyle="default" />
      <Header />
      <ScoreBoard />
    </View>
  </Provider>
*/

// const AppContainer = createAppContainer(BoxScoreNavigator);

const AppContainer = createAppContainer(ScoreBoardNavigator);
// log(BoxScoreNavigator, LOG_LEVEL_INFO);
// log(ScoreBoardNavigator, LOG_LEVEL_INFO);

// export default App;

export default () => (
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff0000" barStyle="default" />
      <Header />
      <AppContainer />
    </View>
  </Provider>
);
