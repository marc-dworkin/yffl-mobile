import React from 'react';
import { View, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

// import Sample from './screens/Sample';
import { BoxScoreNavigator } from './containers/BoxScore';
import store from './config/redux';
import Header from './components/Header';
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

/*
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff0000" barStyle="default" />
      <Header />
      <ScoreBoard />
    </View>
  </Provider>
*/
export default () => (
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff0000" barStyle="default" />
      <Header />
      <BoxScoreNavigator />
    </View>
  </Provider>
);
