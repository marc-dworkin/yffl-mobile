import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import XPlatformTouchable from './XPlatformTouchable';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    // https://stackoverflow.com/questions/36147082/react-native-style-opacity-for-parent-and-child
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 0,
    padding: 0,
  },

  text: {
    // https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
    fontFamily: 'System',
    fontSize: 11,
    color: '#48494a',
    fontWeight: '400',
    textAlign: 'left',
    padding: 3,
    marginLeft: 3,
  },
});

export default class RadioMenu extends Component {
  static propTypes = {
    // each item should have a key and value
    options: PropTypes.array.isRequired,
    onValueChange: PropTypes.func,
    selectedKey: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = { selectedKey: props.selectedKey ? props.selectedKey : props.options[0].key };
  }

  // new props, update state
  componentWillReceiveProps(nextProps) {
    if (this.props.selectedKey !== nextProps.selectedKey) {
      this.setState((prevState, props) => ({ selectedKey: props.selectedKey }));
    }
  }

  render() {
    // console.log(`this.props.selectedKey: ${this.props.selectedKey}`);
    // console.log(`this.state.selectedKey: ${this.state.selectedKey}`);
    return (
      <View style={styles.container}>
        {this.props.options.map((p) => {
          // seems like rounded borders require a full border

          const index = this.props.options.indexOf(p);

          const style = {
            flex: 1,
            borderColor: '#cccccc',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
          };

          if (index === 0) {
            style.borderWidth = StyleSheet.hairlineWidth;
            style.borderTopLeftRadius = 3;
            style.borderBottomLeftRadius = 3;
          } else if (index === this.props.options.length - 1) {
            style.borderWidth = StyleSheet.hairlineWidth;
            style.borderTopRightRadius = 3;
            style.borderBottomRightRadius = 3;
          }
          if (index > 1) {
            style.borderLeftWidth = StyleSheet.hairlineWidth;
          }
          if (index < this.props.options.length - 2) {
            style.borderRightWidth = StyleSheet.hairlineWidth;
          }

          if (p.key === this.state.selectedKey) {
            style.backgroundColor = 'white';
            return (
              <View style={style} key={`view_option_${p.key}`}>
                <Text
                  style={[styles.text, { textAlign: 'center', color: '#dd0000' }]}
                  key={`text_option_${p.key}`}
                >
                  {p.value}
                </Text>
              </View>
            );
          }

          style.backgroundColor = '#f1f2f3';
          return (
            <XPlatformTouchable
              key={`touchable_option_${p.key}`}
              style={style}
              onPress={() => {
                this.setState(() => ({ selectedKey: p.key }));
                if (this.props.onValueChange) {
                  this.props.onValueChange(p.key);
                }
              }}
            >
              <Text style={[styles.text, { textAlign: 'center' }]} key={`text_option_${p.key}`}>
                {p.value}
              </Text>
            </XPlatformTouchable>
          );
        })}
      </View>
    );
  }
}
