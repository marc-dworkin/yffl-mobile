import React from 'react';
import PropTypes from 'prop-types';
import {
  // eslint-disable-next-line no-unused-vars
  View, Image, ImageBackground, TouchableOpacity, StatusBar,
} from 'react-native';
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

/*
      <TouchableOpacity onPress={onPress} style={styles.hamburgerButton}>
        <Image resizeMode="contain" source={require('../assets/hamburger_48.png')} />
      </TouchableOpacity>
*/

// eslint-disable-next-line no-unused-vars
const Header = ({ onPress }) => (
  <View style={styles.headerRow}>
    <ImageBackground
      resizeMode="stretch"
      style={styles.bannerImage}
      source={
        // eslint-disable-next-line global-require
        require('../assets/images/banner.png')
      }
    >
      <Image
        resizeMode="contain"
        style={styles.logoImage}
        // eslint-disable-next-line global-require
        source={require('../assets/images/yffl_128.png')}
      />
    </ImageBackground>
  </View>
);

Header.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onPress: PropTypes.func,
};

export default Header;
