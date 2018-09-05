// https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import {
  View,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

const IOS_BLUE = '#007AFF';
const MATERIAL_BLUE = '#2196F3';

const styles = EStyleSheet.create({
  button: {
    padding: 20,
    margin: 10,
    width: 200,
  },
  buttonRaised: {
    borderRadius: 2,
    '@media ios': {
      backgroundColor: IOS_BLUE,
    },
    '@media android': {
      backgroundColor: MATERIAL_BLUE,
      elevation: 3,
    },
  },
  buttonFlat: {},
  buttonLabel: {
    textAlign: 'center',
    '@media android': {
      fontWeight: 'bold',
    },
  },
  buttonLabelRaised: {
    color: '#FFFFFF',
  },
  buttonLabelFlat: {
    '@media ios': {
      color: IOS_BLUE,
    },
    '@media android': {
      color: MATERIAL_BLUE,
    },
  },
});

const XPlatformTouchable = ({
  raised, onPress, children, style,
}) => {
  // All Android Buttons should have the ripple effect
  if (Platform.OS === 'android') {
    // Raised Android buttons need a white ripple
    if (raised) {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#FFF')}
        >
          <View style={[styles.button, styles.buttonRaised, style]}>
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }

    // Normal Android buttons get a gray ripple
    return (
      <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple()}>
        <View style={style}>
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }

  // iOS raised buttons use TouchableHighlight
  if (raised) {
    return (
      <TouchableHighlight
        style={[styles.button, styles.buttonRaised, style]}
        underlayColor="#0052AC"
        onPress={onPress}
      >
        {children}
      </TouchableHighlight>
    );
  }

  // Normal iOS buttons use TouchableOpacity
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

XPlatformTouchable.propTypes = {
  raised: PropTypes.bool,
  style: PropTypes.object,
  onPress: PropTypes.func,
  children: PropTypes.object,
};

XPlatformTouchable.defaultProps = {
  raised: false,
  style: {},
  onPress: PropTypes.func,
  children: PropTypes.object,
};

export default XPlatformTouchable;
