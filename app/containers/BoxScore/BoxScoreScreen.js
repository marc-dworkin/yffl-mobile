import React, { useEffect } from 'react';
import {
  Text, View, ScrollView, RefreshControl,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from 'react-navigation-hooks';


import XPlatformIcon from '../../components/XPlatformIcon';
import XPlatformTouchable from '../../components/XPlatformTouchable';
import BoxScorePositionSection from './BoxScorePositionSection';

import {
  getSeason,
  getQuarter,
  getIsQuarterPickerInitialized,
  getIsQuarterPickerLoading,
  getTeamPlayerWeekData,
  quarterPickerInitialized,
  quarterDataRequested,
} from '../QuarterPicker';
import { getTeam } from '../TeamPicker';

import collections from '../../lib/collections';
import { log, LOG_LEVEL_INFO } from '../../lib/util';

import RadioMenu from '../../components/RadioMenu';
import { weekSelected, getWeekNumber } from './redux';

import { currentYear, currentQuarter, currentWeek } from '../../data/yfflSeasons';

import teams from '../../data/teams';

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

// TODO: Clean Up
/* eslint-disable react/destructuring-assignment, react/forbid-prop-types */


// useSelector((state) => getSeason(state))
const BoxScoreScreen = () => {
  const season = useSelector((state) => getSeason(state));
  const quarter = useSelector((state) => getQuarter(state));
  const team = useSelector((state) => getTeam(state));
  const weekNumber = useSelector((state) => getWeekNumber(state));

  const firstWeekInQuarter = quarter ? quarter.weeks[0] : null;

  const week = weekNumber && quarter
    ? quarter.weeks.filter((c) => c.number === weekNumber)[0]
    : firstWeekInQuarter;

  const isQuarterPickerInitialized = useSelector((state) => getIsQuarterPickerInitialized(state));
  const isQuarterPickerLoading = useSelector((state) => getIsQuarterPickerLoading(state));

  const teamPlayerWeekData = useSelector((state) => getTeamPlayerWeekData(state));

  const lineupData = Object.entries(teamPlayerWeekData[team.number])
    .map(([playerId, e]) => ({
      player: e.player,
      stats: (week.number in e.weekData) ? e.weekData[week.number] : {},
    }));

  const dispatch = useDispatch();
  // https://www.npmjs.com/package/react-navigation-hooks
  const { navigate } = useNavigation();

  useEffect(() => {
    // TODO: root saga or some such?
    if (!isQuarterPickerInitialized) {
      dispatch(quarterPickerInitialized());
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScrollView
          refreshControl={(
            <RefreshControl
              colors={['#009688']}
              tintColor="#009688"
              refreshing={isQuarterPickerLoading}
              onRefresh={() => dispatch(quarterDataRequested('BoxScore.handleRefreshPulled'))}
            />
          )}
        >
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <XPlatformTouchable onPress={() => navigate('TeamPicker')}>
              <Text style={[styles.text, styles.h1]}>
                {team && team.name}
                &nbsp;(
                {team && team.owner}
                ) &nbsp;
                <XPlatformIcon name="arrow-dropdown" size={18} />
              </Text>
            </XPlatformTouchable>
            <XPlatformTouchable onPress={() => navigate('QuarterPicker')}>
              <Text style={styles.text}>
                {season && season.year}
                &nbsp;Quarter&nbsp;
                {quarter && quarter.name}
                &nbsp;
                <XPlatformIcon name="arrow-dropdown" size={11} />
              </Text>
            </XPlatformTouchable>
          </View>
          <RadioMenu
            selectedKey={week ? week.number : null}
            options={
              quarter
              && quarter.weeks.map((c) => ({
                key: c.number,
                value: `Week ${c.number}`,
              }))
            }
            onValueChange={(value) => {
              dispatch(weekSelected(value));
            }}
          />
          <BoxScorePositionSection lineupData={lineupData} section="passing" />
          <BoxScorePositionSection lineupData={lineupData} section="rushing" />
          <BoxScorePositionSection lineupData={lineupData} section="receiving" />
          <BoxScorePositionSection lineupData={lineupData} section="kicking" />
          <BoxScorePositionSection lineupData={lineupData} section="Not Played" />
        </ScrollView>
      </View>
    </View>
  );
};

// {navigation, dispatch, season, week, quarter, team, stats,
// isQuarterPickerInitialized, isQuarterPickerLoading}


export default BoxScoreScreen;
