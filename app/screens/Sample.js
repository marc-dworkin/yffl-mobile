import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const SELECT_VALUE = 'SELECT_VALUE';

export const selectValue = value => ({
  type: SELECT_VALUE,
  value: parseInt(value, 10),
});

const initialState = {
  value: 3,
};

const sampleState = (state = initialState, action) => {
  const res = {
    ...state,
  };

  switch (action.type) {
    case SELECT_VALUE:
      res.value = action.value || initialState.value;
      break;
    default:
      break;
  }

  return res;
};

export { sampleState };

class Sample extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    value: PropTypes.number,
  };

  static mapStateToProps = (state) => {
    const value = state.sampleState.value;

    return {
      value,
    };
  };

  render() {
    const value = '5';
    return (
      <View>
        <Picker
          selectedValue={value}
          onValueChange={v => this.props.dispatch(selectValue(v))}
        >
          <Picker.Item value="0" label="0" />
          <Picker.Item value="1" label="1" />
          <Picker.Item value="2" label="2" />
          <Picker.Item value="3" label="3" />
          <Picker.Item value="4" label="4" />
          <Picker.Item value="5" label="5" />
        </Picker>
        <Text>Value: {this.props.value}</Text>
      </View>
    );
  }
}

export default connect(Sample.mapStateToProps)(Sample);
