/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import {
  Text, View, Picker, StyleSheet,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getSeasonYear,
  getQuarterNumber,
  getQuarterPickerWorkingSeason,
  getQuarterPickerWorkingQuarter,
  getIsQuarterPickerInitialized,
  getIsQuarterPickerLoading,
} from './redux/reducers';

import seasons from '../../data/yfflSeasons';


import {
  workingSeasonSelected,
  workingQuarterSelected,
  quarterSelected,
  quarterDataRequested,
} from './redux/actions';

import XPlatformButton from '../../components/XPlatformButton';

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

// TODO: Maybe this should be a disconnected component?
class QuarterPicker extends Component {
  static mapStateToProps = (state) => {
    // TODO: maybe these should be more primative, or more typesafe?
    const originalSeasonYear = getSeasonYear(state);
    const originalQuarterNumber = getQuarterNumber(state);
    const workingSeason = getQuarterPickerWorkingSeason(state);
    const workingQuarter = getQuarterPickerWorkingQuarter(state);
    const isInitialized = getIsQuarterPickerInitialized(state);
    const isLoading = getIsQuarterPickerLoading(state);

    return {
      originalQuarterNumber,
      originalSeasonYear,
      workingSeason,
      workingQuarter,
      isInitialized,
      isLoading,
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    workingSeason: PropTypes.object,
    workingQuarter: PropTypes.object,
    originalQuarterNumber: PropTypes.number,
    originalSeasonYear: PropTypes.number,
  };

  static defaultProps = {
    workingSeason: {},
    workingQuarter: {},
    originalQuarterNumber: false,
    originalSeasonYear: false,
  };


  handleYearPressed = (value) => {
    this.props.dispatch(workingSeasonSelected(value));
  };

  handleQuarterPressed = (value) => {
    this.props.dispatch(workingQuarterSelected(value));
  };

  handleOkPressed = () => {
    const isChanged = this.props.workingQuarter.number !== this.props.originalQuarterNumber
      || this.props.workingSeason.year !== this.props.originalSeasonYear;

    this.props.dispatch(quarterSelected());

    // TODO confirm if reducer is guarranteed to run
    if (isChanged) {
      this.props.dispatch(quarterDataRequested('QuarterPicker.isChanged'));
    }

    this.props.navigation.goBack();
  };

  handleCancelPressed = () => {
    // TODO: Revert working to current
    // eslint-disable-next-line react/destructuring-assignment
    this.props.navigation.goBack();
  };

  render() {
    // console.log(!this.props.isInitialized);
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={[styles.row, styles.title]}>
            <Text style={[styles.text, styles.h2]}>
              Choose Quarter
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Picker
                style={styles.picker}
                selectedValue={this.props.workingSeason.year.toString()}
                onValueChange={(value) => this.handleYearPressed(value)}
              >
                {seasons.map((s) => (
                  <Picker.Item
                    key={s.year.toString()}
                    value={s.year.toString()}
                    label={s.year.toString()}
                  />
                ))}
              </Picker>
              <Text style={styles.text}>
                Year
              </Text>
            </View>
            <View style={styles.spacer} />
            <View style={styles.column}>
              <Picker
                selectedValue={this.props.workingQuarter.number.toString()}
                style={styles.picker}
                onValueChange={(value) => this.handleQuarterPressed(value)}
              >
                {this.props.workingSeason.quarters
                  .filter((q) => q.isPast || q.isCurrent)
                  .map((s) => (
                    <Picker.Item
                      key={s.number.toString()}
                      value={s.number.toString()}
                      label={s.number.toString()}
                    />
                  ))}
              </Picker>
              <Text style={styles.text}>
                &nbsp;Quarter&nbsp;
              </Text>
            </View>
          </View>
          <View style={styles.hr} />
          <View style={[styles.row, styles.buttons]}>
            <XPlatformButton
              label="Ok"
              onPress={this.handleOkPressed}
              labelStyle={[styles.buttonStyle]}
            />
            <XPlatformButton
              label="Cancel"
              onPress={this.handleCancelPressed}
              labelStyle={[styles.buttonStyle]}
            />
            <View style={styles.spacer} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(QuarterPicker.mapStateToProps)(QuarterPicker);
