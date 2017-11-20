import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $androidHeaderRowHeight: StatusBar.currentHeight + 72,
  $androidWidth: StatusBar.currentWidth,
  headerRow: {
    // needs to be set for elevation to work: https://github.com/facebook/react-native/issues/10411
    backgroundColor: '#eeeeee',
    '@media ios': {
      paddingTop: 20,
      height: 92,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      shadowColor: '#ddd',
      shadowOffset: { height: 0, width: 0 },
    },
    '@media android': {
      paddingTop: StatusBar.currentHeight,
      height: '$androidHeaderRowHeight',
      width: StatusBar.currentWidth,
      elevation: 10,
    },
  },
  bannerImage: {
    //    display: 'flex',
    flexDirection: 'row',
    // needs to be set for elevation to work: https://github.com/facebook/react-native/issues/10411
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flex: 1,
    '@media android': {
      width: StatusBar.currentWidth,
    },
  },
  hamburgerButton: {
    flex: 1,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ee0000',
  },
  logoImage: {
    flex: 5,
    width: 128,
    height: 72,
  },
});

const Header = ({ onPress }) => (
  <View style={styles.headerRow}>
    <Image resizeMode="stretch" style={styles.bannerImage} source={require('../assets/banner.png')}>
      <TouchableOpacity onPress={onPress} style={styles.hamburgerButton}>
        <Image resizeMode="contain" source={require('../assets/hamburger_48.png')} />
      </TouchableOpacity>
      <Image
        resizeMode="contain"
        style={styles.logoImage}
        source={require('../assets/yffl_128.png')}
      />
    </Image>
  </View>
);

Header.propTypes = {
  onPress: PropTypes.func,
};

export default Header;