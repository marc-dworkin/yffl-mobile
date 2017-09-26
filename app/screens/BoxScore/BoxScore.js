import React, { Component } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoxScoreNavBar from './BoxScoreNavBar';
// import teams from '../data/teams';
// import weeks from '../data/weeks';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00eeee',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

class BoxScore extends Component {
  static propTypes = {
    season: PropTypes.object,
    week: PropTypes.object,
    quarter: PropTypes.object,
    team: PropTypes.object,
  };

  static mapStateToProps = (state) => {
    const season = state.BoxScoreState.season;
    const quarter = state.BoxScoreState.quarter;
    const week = state.BoxScoreState.week;
    const team = state.BoxScoreState.team;

    return {
      season,
      quarter,
      week,
      team,
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <BoxScoreNavBar />
        <Text>Data Here. v13</Text>
        <Text>Team: {this.props.team.owner}</Text>
        <Text>Year: {this.props.season.year}</Text>
        <Text>Quarter: {this.props.quarter.number}</Text>
        <Text>Week: {this.props.week.number}</Text>
      </View>
    );
  }
}

export default connect(BoxScore.mapStateToProps)(BoxScore);
