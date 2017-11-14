import React, { Component } from 'react';
import { Text, View, ScrollView, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoxScoreNavBar from './BoxScoreNavBar';
import BoxScorePositionSection from './BoxScorePositionSection';
// import teams from '../data/teams';
// import weeks from '../data/weeks';
import {
  getSeason,
  getWeek,
  getQuarter,
  getTeam,
  getLineups,
  getGameData,
  getIsBoxScoreInitialized,
  boxScoreInitialized,
} from './redux';
import util from '../../lib/util';

const styles = EStyleSheet.create({
  card: {
    // needs to be set for elevation to work: https://github.com/facebook/react-native/issues/10411
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 5,
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    '@media ios': {
      shadowOpacity: 0.75,
      shadowRadius: 5,
      shadowColor: 'red',
      shadowOffset: { height: 0, width: 0 },
    },
    '@media android': {
      elevation: 10,
    },
  },

  container: {
    backgroundColor: '#f1f2f3',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  textSeasonWeekHeader: {
    color: '#6c6d6f',
    fontSize: 11,
    fontWeight: '400',
  },

  textTeamNameHeader: {
    color: '#6c6d6f',
    fontSize: 18,
    fontWeight: '700',
    ...Platform.select({
      ios: {
        fontFamily: 'Helvetica',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
});

class BoxScore extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    season: PropTypes.object,
    week: PropTypes.object,
    quarter: PropTypes.object,
    team: PropTypes.object,
    stats: PropTypes.object,
    isBoxScoreInitialized: PropTypes.bool,
  };

  static mapStateToProps = (state) => {
    // TODO: maybe these should be more primative, or more typesafe?
    const season = getSeason(state);
    const quarter = getQuarter(state);
    const week = getWeek(state);
    const team = getTeam(state);
    const lineups = getLineups(state);
    const isBoxScoreInitialized = getIsBoxScoreInitialized(state);
    const lineup =
      lineups != null
        ? util.toDictionary(lineups.filter(c => c.yffl_team === team.number), c => c.gsis_id)
        : {};

    const allGameData = getGameData(state);

    const stats = {};
    if (lineup != null) {
      //      console.log(Object.keys(allGameData));
      Object.keys(lineup).forEach((key) => {
        stats[key] = {
          player: lineup[key],
          // not all players will have gameData
          gameData: allGameData != null && key in allGameData ? allGameData[key] : {},
        };
      });
    }

    //    console.log(stats);

    return {
      season,
      quarter,
      week,
      team,
      stats,
      isBoxScoreInitialized,
    };
  };

  render() {
    if (!this.props.isBoxScoreInitialized) {
      this.props.dispatch(boxScoreInitialized());
    }

    return (
      <View style={styles.container}>
        <BoxScoreNavBar />
        <View style={styles.card}>
          <Text style={styles.textSeasonWeekHeader}>
            {this.props.season.year} Quarter {this.props.quarter.number}, Week{' '}
            {this.props.week.number}
          </Text>
          <Text style={styles.textTeamNameHeader}>
            {this.props.team.owner} {this.props.team.name}
          </Text>
          <ScrollView>
            <BoxScorePositionSection stats={this.props.stats} section="passing" />
            <BoxScorePositionSection stats={this.props.stats} section="rushing" />
            <BoxScorePositionSection stats={this.props.stats} section="receiving" />
            <BoxScorePositionSection stats={this.props.stats} section="kicking" />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default connect(BoxScore.mapStateToProps)(BoxScore);
