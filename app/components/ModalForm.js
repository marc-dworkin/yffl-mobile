import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import XPlatformButton from './XPlatformButton';

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    // https://stackoverflow.com/questions/36147082/react-native-style-opacity-for-parent-and-child
    backgroundColor: '#00000025',
  },

  modal: {
    backgroundColor: '#ffffff',
    opacity: 1,
    margin: 10,
    padding: 10,
    borderRadius: 3,
    borderColor: '#6c6d6f',
    borderWidth: StyleSheet.hairlineWidth,
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },

  buttons: {
    justifyContent: 'flex-end',
  },

  title: {
    justifyContent: 'flex-start',
  },

  column: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  text: {
    // https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
    fontFamily: 'System',
    fontSize: 11,
    color: '#6c6d6f',
    textAlign: 'left',
    padding: 3,
    marginLeft: 3,
    fontWeight: '400',
  },

  h1: {
    color: '#6c6d6f',
    fontSize: 18,
    fontWeight: '700',
    // https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
    fontFamily: 'System',
  },

  th: {
    color: '#48494a',
    textAlign: 'left',
    fontWeight: '600',
  },

  h2: {
    color: '#2b2c2d',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  // TODO: use margin / padding
  spacer: {
    margin: 10,
  },

  hr: {
    margin: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  picker: {
    width: 100,
  },

  buttonStyle: {
    width: 75,
    margin: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
});

// TODO: ListView to ensure alignment?
export const ModalFormItem = props => (
  <View style={styles.column}>
    {props.children}
    <Text style={styles.text}>{props.caption}</Text>
  </View>
);

ModalFormItem.propTypes = {
  // eg { 'ok': this.handleOkPress, 'cancel': this.handleCancelPress }
  children: PropTypes.object,
  caption: PropTypes.string,
};

const ModalForm = props => (
  <View style={styles.container}>
    <View style={styles.modal}>
      <View style={[styles.row, styles.title]}>
        <Text style={[styles.text, styles.h2]}>{props.caption}</Text>
      </View>
      <View style={styles.row}>{props.children}</View>
      <View style={styles.hr} />
      <View style={[styles.row, styles.buttons]}>
        {Object.entries(props.buttons).map(([key, value]) => (
          <XPlatformButton
            key={key}
            label={key}
            onPress={value}
            labelStyle={[styles.buttonStyle]}
          />
        ))}
        <View style={styles.spacer} />
      </View>
    </View>
  </View>
);

ModalForm.propTypes = {
  // eg { 'ok': this.handleOkPress, 'cancel': this.handleCancelPress }
  buttons: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  caption: PropTypes.string.isRequired,
};

export default ModalForm;
