import React from 'react';
import { View, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';


// import Sample from './screens/Sample';
import BoxScore from './screens/BoxScore';
import store from './config/redux';
import Header from './components/Header';


const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
    //    backgroundColor: '#00ffff',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flex: 1,
  },
});

EStyleSheet.build({
  //  outline: 1,
});


export default () => (
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff0000" barStyle="default" />
      <Header />
      <BoxScore />
    </View>
  </Provider>
);

