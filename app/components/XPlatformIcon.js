// https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import { Platform } from 'react-native';

// https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
const XPlatformIcon = ({ name, size, color, style, outline }) => {
  let iconName = Platform.OS === 'android' ? `md-${name}` : `ios-${name}`;
  if (Platform.OS === 'ios' && outline) {
    iconName = `${iconName}-outline`;
  }
  return <Ionicons name={iconName} size={size} color={color} style={style} />;
};

XPlatformIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  outline: PropTypes.string,
};

export default XPlatformIcon;
