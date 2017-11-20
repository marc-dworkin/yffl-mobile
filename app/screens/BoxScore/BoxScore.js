import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import XPlatformIcon from '../../components/XPlatformIcon';
import XPlatformTouchable from '../../components/XPlatformTouchable';
import BoxScorePositionSection from './BoxScorePositionSection';

import {
  getSeason,
  getQuarter,
  getLineups,
  getGameData,
  getIsQuarterPickerInitialized,
  getIsQuarterPickerLoading,
  quarterPickerInitialized,
  quarterDataRequested,
} from '../QuarterPicker';
import { getTeam } from '../TeamPicker';

import collections from '../../lib/collections';

import RadioMenu from '../../components/RadioMenu';
import { weekSelected, getWeekNumber } from './redux';

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
      shadowColor: '#ddd',
      shadowOffset: { height: 0, width: 0 },
    },
    '@media android': {
      elevation: 10,
    },
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },

  weekContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    backgroundColor: '#f1f2f3',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  text: {
    // https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
    fontFamily: 'System',
    fontSize: 11,
    color: '#6c6d6f',
    fontWeight: '400',
    textAlign: 'left',
    padding: 3,
    marginLeft: 3,
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

  playerNameData: {
    width: 120,
    paddingLeft: 3,
    marginLeft: 0,
  },

  teamNameData: {
    width: 50,
  },

  statData: {
    width: 40,
  },

  altRow: {
    backgroundColor: '#f7f8f9',
  },
});

class BoxScore extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    season: PropTypes.object,
    week: PropTypes.object,
    quarter: PropTypes.object,
    team: PropTypes.object,
    stats: PropTypes.object,
    isQuarterPickerInitialized: PropTypes.bool,
    isQuarterPickerLoading: PropTypes.bool,
  };

  static mapStateToProps = (state) => {
    // TODO: maybe these should be more primative, or more typesafe?
    const season = getSeason(state);
    const quarter = getQuarter(state);

    //    const week = getWeek(state);
    const team = getTeam(state);
    const lineups = getLineups(state);
    const weekNumber = getWeekNumber(state);

    const firstWeekInQuarter = quarter ? quarter.weeks[0] : null;

    const week =
      weekNumber && quarter
        ? quarter.weeks.filter(c => c.number === weekNumber)[0]
        : firstWeekInQuarter;

    const isQuarterPickerInitialized = getIsQuarterPickerInitialized(state);
    const isQuarterPickerLoading = getIsQuarterPickerLoading(state);
    const lineup =
      lineups != null
        ? collections.toDictionary(lineups.filter(c => c.yffl_team === team.number), c => c.gsis_id)
        : {};

    const rawGameData = getGameData(state);

    const weekData =
      rawGameData != null
        ? rawGameData
          .filter(c => c.seasonYear === season.year && c.weekNumber === week.number)
          .map(c => c.weekData)[0]
        : {};

    const stats = {};
    if (lineup != null) {
      Object.keys(lineup).forEach((key) => {
        stats[key] = {
          player: lineup[key],
          // not all players will have gameData
          gameData:
            weekData && weekData.playerData && weekData.playerData[key]
              ? weekData.playerData[key]
              : {},

          hadGameData: weekData && weekData.playerData && weekData.playerData[key],
        };
      });
    }

    return {
      season,
      quarter,
      week,
      team,
      stats,
      isQuarterPickerInitialized,
      isQuarterPickerLoading,
    };
  };

  componentDidMount() {
    if (!this.props.isQuarterPickerInitialized) {
      this.props.dispatch(quarterPickerInitialized());
    }
  }

  handleRefreshPulled = () => {
    // TODO: don't have to refresh all quarter data
    this.props.dispatch(quarterDataRequested());
  };

  handleQuarterPickerPressed = () => {
    this.props.navigation.navigate('QuarterPicker');
  };

  handleTeamPickerPressed = () => {
    this.props.navigation.navigate('TeamPicker');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={['#009688']}
                tintColor={'#009688'}
                refreshing={this.props.isQuarterPickerLoading}
                onRefresh={this.handleRefreshPulled}
              />
            }
          >
            <View style={[styles.row, { alignItems: 'flex-start' }]}>
              <XPlatformTouchable onPress={this.handleTeamPickerPressed}>
                <Text style={[styles.text, styles.h1]}>
                  {this.props.team.name} ({this.props.team.owner}) &nbsp;
                  <XPlatformIcon name="arrow-dropdown" size={18} />
                </Text>
              </XPlatformTouchable>
              <XPlatformTouchable onPress={this.handleQuarterPickerPressed}>
                <Text style={styles.text}>
                  {this.props.season.year} Quarter {this.props.quarter.number}
                  &nbsp;
                  <XPlatformIcon name="arrow-dropdown" size={11} />
                </Text>
              </XPlatformTouchable>
            </View>
            <RadioMenu
              selectedKey={this.props.week ? this.props.week.number : null}
              options={this.props.quarter.weeks.map(c => ({
                key: c.number,
                value: `Week ${c.number}`,
              }))}
              onValueChange={(value) => {
                //              console.log(`onValueChange ${value}`);
                this.props.dispatch(weekSelected(value));
              }}
            />
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
