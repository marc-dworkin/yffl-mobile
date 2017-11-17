// https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { Text, Platform } from 'react-native';
import XPlatformTouchable from './XPlatformTouchable';

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

export default class XPlatformButton extends Component {
  renderLabel() {
    const labelStyles = [styles.buttonLabel];

    if (this.props.raised) {
      labelStyles.push(styles.buttonLabelRaised);
    } else {
      labelStyles.push(styles.buttonLabelFlat);
    }
    if (this.props.labelStyle) {
      labelStyles.push(this.props.labelStyle);
    }

    let labelText = this.props.label;
    if (Platform.OS === 'android') {
      labelText = labelText.toUpperCase();
    }

    return <Text style={labelStyles}>{labelText}</Text>;
  }

  render() {
    return <XPlatformTouchable {...this.props}>{this.renderLabel()}</XPlatformTouchable>;
  }
}

XPlatformButton.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.any,
  raised: PropTypes.bool,
  onPress: PropTypes.func,
  children: PropTypes.object,
};
