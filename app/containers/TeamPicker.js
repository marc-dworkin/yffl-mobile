import React from 'react';
import { Picker } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ModalForm, { ModalFormItem } from '../components/ModalForm';

import teams from '../data/teams';
// redux

// ..action
export const WORKING_TEAM_SELECTED = 'WORKING_TEAM_SELECTED';
export const TEAM_SELECTED = 'TEAM_SELECTED';

export const workingTeamSelected = value => ({
  type: WORKING_TEAM_SELECTED,
  value,
});

// don't need props as it works off working props
export const teamSelected = () => ({
  type: TEAM_SELECTED,
});

// ..reducers

const initialState = {
  team: teams[0],
  workingTeam: teams[0],
};

export const getTeamPickerState = (state = initialState) => {
  // TODO: Figure out why not initialized properly
  if (state.TeamPickerState) {
    return state.TeamPickerState;
  }
  return state;
};

export const getTeam = state => getTeamPickerState(state || initialState).team;

export const getWorkingTeam = state => getTeamPickerState(state || initialState).workingTeam
  // if workingteam not defined, team is workingteam
  || getTeamPickerState(state).team;

export const TeamPickerState = (state = initialState, action) => {
  const res = {
    ...state,
  };

  switch (action.type) {
    case TEAM_SELECTED:
      res.team = res.workingTeam;
      break;
    case WORKING_TEAM_SELECTED:
      if (action.value != null) {
        res.workingTeam = teams.find(
          t => t.owner === action.value
            || t.name === action.value
            || t.number === parseInt(action.value, 10),
        );
      }
      break;
    default:
      break;
  }
  return res;
};

// styles
const styles = EStyleSheet.create({
  picker: {
    width: 200,
  },
});

// component
const TeamPicker = props => (
  //  console.log(props);
  <ModalForm
    caption="Select Team"
    buttons={{
      ok: () => {
        props.dispatch(teamSelected());
        props.navigation.goBack();
      },
      cancel: () => {
        // TODO Reset Working
        props.navigation.goBack();
      },
    }}
  >
    <ModalFormItem caption="Team">
      <Picker
        selectedValue={props.workingTeam.number.toString()}
        style={styles.picker}
        onValueChange={(value) => {
          props.dispatch(workingTeamSelected(value));
        }}
      >
        {teams.map(t => (
          <Picker.Item
            value={t.number.toString()}
            key={t.number.toString()}
            label={`${t.name || 'N/A'} (${t.owner})`}
          />
        ))}
      </Picker>
    </ModalFormItem>
  </ModalForm>
);

TeamPicker.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  workingTeam: PropTypes.object,
  //  originalTeam: PropTypes.object,
};

TeamPicker.defaultProps = {
  workingTeam: initialState.workingTeam,
};

TeamPicker.mapStateToProps = (state) => {
  const originalTeam = getTeam(state);
  const workingTeam = getWorkingTeam(state);
  return {
    originalTeam,
    workingTeam,
  };
};

export default connect(TeamPicker.mapStateToProps)(TeamPicker);
