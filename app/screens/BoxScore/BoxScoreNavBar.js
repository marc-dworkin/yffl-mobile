/*
import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  teamSelected,
  seasonSelected,
  quarterSelected,
  weekSelected,
  getSeason,
  getWeek,
  getQuarter,
  getTeam,
} from './redux';

import teams from '../../data/teams';
import seasons from '../../data/seasons';

const styles = EStyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    flex: 1,
  },
  teamPicker: {
    flex: 2,
  },
});

// TODO: Maybe this should be a disconnected component?
class BoxScoreNavBar extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    season: PropTypes.object,
    week: PropTypes.object,
    quarter: PropTypes.object,
    team: PropTypes.object,
  };

  static mapStateToProps = (state) => {
    // TODO: maybe these should be more primative, or more typesafe?
    const season = getSeason(state);
    const quarter = getQuarter(state);
    const week = getWeek(state);
    const team = getTeam(state);

    return {
      season,
      quarter,
      week,
      team,
    };
  };

  render() {
    return (
      <View style={styles.navBar}>
        <Text>Year: </Text>
        <Picker
          selectedValue={this.props.season.year.toString()}
          style={styles.picker}
          onValueChange={value => this.props.dispatch(seasonSelected(value))}
        >
          {seasons.map(s => (
            <Picker.Item
              key={s.year.toString()}
              value={s.year.toString()}
              label={s.year.toString()}
            />
          ))}
        </Picker>

        <Text>Quarter: </Text>
        <Picker
          selectedValue={this.props.quarter.number.toString()}
          style={styles.picker}
          onValueChange={value => this.props.dispatch(quarterSelected(value))}
        >
          {this.props.season.quarters
            .filter(q => q.isPast || q.isCurrent)
            .map(s => (
              <Picker.Item
                key={s.number.toString()}
                value={s.number.toString()}
                label={s.number.toString()}
              />
            ))}
        </Picker>

        <Text>Week: </Text>
        <Picker
          selectedValue={this.props.week.number.toString()}
          style={styles.picker}
          onValueChange={value => this.props.dispatch(weekSelected(value))}
        >
          {this.props.quarter.weeks
            .filter(q => q.isPast || q.isCurrent)
            .map(s => (
              <Picker.Item
                key={s.number.toString()}
                value={s.number.toString()}
                label={s.number.toString()}
              />
            ))}
        </Picker>

        <Text>Team: </Text>
        <Picker
          selectedValue={this.props.team.number.toString()}
          style={styles.teamPicker}
          onValueChange={value => this.props.dispatch(teamSelected(value))}
        >
          {teams.map(t => (
            <Picker.Item
              value={t.number.toString()}
              key={t.number.toString()}
              label={`${t.name} (${t.owner})`}
            />
          ))}
        </Picker>
      </View>
    );
  }
}

export default connect(BoxScoreNavBar.mapStateToProps)(BoxScoreNavBar);

*/
