import React, { useEffect } from 'react';
import {
  Text, View, ScrollView, RefreshControl, FlatList, StyleSheet,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { PropTypes } from 'prop-types';

import { useNavigation } from 'react-navigation-hooks';

import XPlatformIcon from '../../components/XPlatformIcon';
import XPlatformTouchable from '../../components/XPlatformTouchable';
// import teams from '../../data/teams';

import teams from '../../data/teams';


import {
  getTeamPlayerWeekData,
  // eslint-disable-next-line no-unused-vars
  quarterDataRequested,
  getIsQuarterPickerLoading,
  getSeason,
  getQuarter,
  getIsQuarterPickerInitialized,
  quarterPickerInitialized,
} from '../QuarterPicker';

// eslint-disable-next-line no-unused-vars
import { log, LOG_LEVEL_INFO } from '../../lib/util';

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

  statContainer: {},

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


  headerRow: {
    flexDirection: 'row',
    borderBottomColor: '#dcdddf',
    borderBottomWidth: 1,
    borderTopColor: '#dcdddf',
    borderTopWidth: 1,
  },

  dataRow: {
    flexDirection: 'row',
    borderBottomColor: '#f1f2f3',
    borderBottomWidth: StyleSheet.hairlineWidth,
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

  yfflTeamNameData: {
    width: 120,
  },

  statData: {
    width: 40,
  },

  altRow: {
    backgroundColor: '#f7f8f9',
  },

});

// eslint-disable-next-line no-unused-vars
const ScoreBoardScreen = ({ screenProps, navigation }) => {
  const season = useSelector((state) => getSeason(state));
  const quarter = useSelector((state) => getQuarter(state));

  const isQuarterPickerInitialized = useSelector((state) => getIsQuarterPickerInitialized(state));
  const isQuarterPickerLoading = useSelector((state) => getIsQuarterPickerLoading(state));

  const teamPlayerWeekData = useSelector((state) => getTeamPlayerWeekData(state));

  const dispatch = useDispatch();
  // https://www.npmjs.com/package/react-navigation-hooks
  const { navigate } = useNavigation();

  useEffect(() => {
    //    log(`useEffect: isQuarterPickerInitialized ${!isQuarterPickerInitialized}`);
    // TODO: root saga or some such?
    if (!isQuarterPickerInitialized) {
      dispatch(quarterPickerInitialized());
    }
  }, []);

  let teamData = [];

  if (teamPlayerWeekData) {
    teamData = Object.entries(teamPlayerWeekData).map(([teamNumber, tpwd]) => {
      const byWeek = {};
      quarter.weeks.forEach((c) => { byWeek[c.number] = 0; });

      let total = 0;
      const byPosition = {
        QB: 0,
        RB: 0,
        WR: 0,
        K: 0,
      };

      // eslint-disable-next-line no-unused-vars
      Object.entries(tpwd).forEach(([playerId, weekData]) => {
        const { player } = weekData;
        Object.entries(weekData.weekData).forEach(([weekNumber, stats]) => {
          if (stats.yfflInfo.IsStarter) {
            byWeek[weekNumber] += stats.yfflInfo.Points;
            total += stats.yfflInfo.Points;
            byPosition[player.position] += stats.yfflInfo.Points;
          }
        });
      });

      return {
        team: teams[teamNumber],
        total,
        byPosition,
        byWeek,
      };
    });

    teamData = teamData.sort((a, b) => b.total - a.total);
  } else {
    teamData = teams.map((team) => ({
      team,
      byPosition: {},
      byWeek: {},
    }));
  }

  for (let i = 0; i < teamData.length; i += 1) {
    teamData[i].index = i;
    teamData[i].isAltRow = i % 2 !== 0;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <ScrollView
          refreshControl={(
            <RefreshControl
              colors={['#009688']}
              tintColor="#009688"
              refreshing={isQuarterPickerLoading}
              onRefresh={() => dispatch(quarterDataRequested('ScoreBoard.onRefresh'))}
            />
          )}
        >
          <XPlatformTouchable onPress={() => navigate('QuarterPicker')}>
            <Text style={[styles.text, styles.h1]}>
              {season && season.year}
              &nbsp;Quarter&nbsp;
              {quarter && quarter.number}
              &nbsp;
              <XPlatformIcon name="arrow-dropdown" size={11} />
            </Text>

          </XPlatformTouchable>

          <ScrollView style={styles.statContainer} horizontal>
            <View>
              <View style={styles.headerRow}>
                <Text style={[styles.text, styles.th, styles.yfflTeamNameData]}>Team</Text>
                <Text style={[styles.text, styles.th, styles.statData]}>PTS</Text>
                <Text style={[styles.text, styles.th, styles.statData]}>QB</Text>
                <Text style={[styles.text, styles.th, styles.statData]}>RB</Text>
                <Text style={[styles.text, styles.th, styles.statData]}>WR</Text>
                <Text style={[styles.text, styles.th, styles.statData]}>K</Text>


                {quarter.weeks.map((c) => (
                  <Text style={[styles.text, styles.th, styles.statData]} key={c.number}>
                    {c.number}
                  </Text>
                ))}
              </View>


              <FlatList
                data={teamData}
                renderItem={({ item }) => (
                  <View style={[styles.dataRow, item.isAltRow && styles.altRow]}>
                    <Text style={[styles.text, styles.yfflTeamNameData]}>
                      {item.team.name}
                      &nbsp;(
                      {item.team.owner}
                      )
                    </Text>
                    <Text style={[styles.text, styles.statData]}>
                      {item.total}
                    </Text>
                    <Text style={[styles.text, styles.statData]}>
                      {item.byPosition.QB}
                    </Text>
                    <Text style={[styles.text, styles.statData]}>
                      {item.byPosition.RB}
                    </Text>
                    <Text style={[styles.text, styles.statData]}>
                      {item.byPosition.WR}
                    </Text>
                    <Text style={[styles.text, styles.statData]}>
                      {item.byPosition.K}
                    </Text>
                    {quarter.weeks.map((c) => (
                      <Text style={[styles.text, styles.statData]} key={c.number}>
                        {item.byWeek[c.number]}
                      </Text>
                    ))}
                  </View>
                )}
                // renderItem={(item) => <ScoreBoardItem teamData={item[1]} />}
                keyExtractor={(item) => `${item.team.number}`}
              />
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
};


ScoreBoardScreen.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
  screenProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: PropTypes.object.isRequired,
};


export default ScoreBoardScreen; // connect(ScoreBoard2.mapStateToProps)(ScoreBoard);
