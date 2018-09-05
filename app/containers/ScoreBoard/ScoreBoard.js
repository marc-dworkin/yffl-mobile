import React, { Component } from 'react';
import {
  Text, View, ScrollView, RefreshControl, FlatList,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import XPlatformIcon from '../../components/XPlatformIcon';
import XPlatformTouchable from '../../components/XPlatformTouchable';
// import teams from '../../data/teams';

import ScoreBoardItem from './ScoreBoardItem';
import { quarterDataRequested } from '../QuarterPicker';
/*
import {
  getSeason,
  getQuarter,
  //  getLineups,
  //  getGameData,
  getIsQuarterPickerInitialized,
  getIsQuarterPickerLoading,
  quarterPickerInitialized,
  quarterDataRequested,
} from '../QuarterPicker';
*/

const styles = EStyleSheet.create({
  smallCard: {
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
      elevation: 1,
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
});

class ScoreBoard extends Component {
  static mapStateToProps = () => { // state) => {
    const season = {};// getSeason(state);
    const quarter = {}; // getQuarter(state);

    const isQuarterPickerInitialized = {}; // getIsQuarterPickerInitialized(state);
    const isQuarterPickerLoading = {}; // getIsQuarterPickerLoading(state);

    /*

    const lineups = getLineups(state);
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
    */

    return {
      season,
      quarter,
      isQuarterPickerInitialized,
      isQuarterPickerLoading,
    };
  };

  static propTypes = {
    // https://github.com/yannickcr/eslint-plugin-react/issues/904
    navigation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    dispatch: PropTypes.func,
    season: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    quarter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    isQuarterPickerInitialized: PropTypes.bool,
    isQuarterPickerLoading: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: {},
    navigation: {},
    season: {},
    quarter: {},
    isQuarterPickerInitialized: false,
    isQuarterPickerLoading: false,
  };

  componentDidMount() {
    if (!this.props.isQuarterPickerInitialized) {
      //      this.props.dispatch(quarterPickerInitialized());
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
        <ScrollView
          refreshControl={(
            <RefreshControl
              colors={['#009688']}
              tintColor="#009688"
              refreshing={this.props.isQuarterPickerLoading}
              onRefresh={this.handleRefreshPulled}
            />
            )}
        >
          <XPlatformTouchable onPress={this.handleQuarterPickerPressed}>
            <Text style={[styles.text, styles.h1]}>
              {this.props.season.year}
              Quarter
              {this.props.quarter.number}
              &nbsp;
              <XPlatformIcon name="arrow-dropdown" size={18} />
            </Text>
          </XPlatformTouchable>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            numColumns={2}
            renderItem={item => <ScoreBoardItem item={item} />}
            keyExtractor={item => item}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(ScoreBoard.mapStateToProps)(ScoreBoard);
