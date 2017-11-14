import React from 'react';
import { Text, ScrollView, FlatList, View, Platform, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import util from './../../lib/util';

const styles = EStyleSheet.create({
  dataRow: {
    flexDirection: 'row',
    borderBottomColor: '#f1f2f3',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  headerRow: {
    flexDirection: 'row',
    borderBottomColor: '#dcdddf',
    borderBottomWidth: 1,
    borderTopColor: '#dcdddf',
    borderTopWidth: 1,
  },

  statContainer: {},

  text: {
    ...Platform.select({
      ios: {
        fontFamily: 'Helvetica',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
    fontSize: 11,
    color: '#6c6d6f',
    textAlign: 'left',
    padding: 3,
    marginLeft: 3,
  },

  data: {
    textAlign: 'right',
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

const BoxScorePositionSection = (props) => {
  const sectionStatsRaw =
    props.stats != null
      ? util.filter(
        props.stats,
        () => true,
        c => Object.prototype.hasOwnProperty.call(c.gameData, props.section),
      )
      : {};

  const sectionStats = Object.values(
    util.map(sectionStatsRaw, c => ({
      key: `player_${props.section}_${c.player.nfl_id}`,
      player: c.player,
      gameData: c.gameData[props.section],
    })),
  );

  // no-return-assign so have to do in seperat loop
  for (let i = 0; i < sectionStats.length; i += 1) {
    sectionStats[i].index = i;
    sectionStats[i].isAltRow = i % 2 !== 0;
  }

  const positionStatNames =
    sectionStats != null && sectionStats.length > 0
      ? // derive by position stats from what nfl provides
      Object.keys(sectionStats[0].gameData)
      // skip name
        .slice(1)
      // skip lngtd
        .filter(c => !['lngtd', 'totpfg', 'xpmissed', 'xptot'].includes(c))
        .map(c => ({
          display: c
            .replace('twop', '2P')
            .replace('xpmade', 'Xpm')
            .replace('fgyds', 'lng')
            .toUpperCase(),
          value: c,
          key: `stat_${props.section}_${c}`,
        }))
      : [];

  return (
    <View>
      <Text style={[styles.text, styles.h2]}>{util.ucFirst(props.section)}</Text>
      <ScrollView style={styles.statContainer} horizontal>
        <View>
          <View style={styles.headerRow}>
            <Text style={[styles.text, styles.th, styles.playerNameData]}>Player</Text>
            <Text style={[styles.text, styles.th, styles.teamNameData]}>Team</Text>
            {positionStatNames.map(c => (
              <Text style={[styles.text, styles.th, styles.statData]} key={c.key}>
                {c.display}
              </Text>
            ))}
          </View>
          <FlatList
            renderItem={({ item }) => (
              <View style={[styles.dataRow, item.isAltRow && styles.altRow]}>
                <Text style={[styles.text, styles.playerNameData]}>
                  {item.player.last_name}, {item.player.first_name}
                </Text>
                <Text style={[styles.text, styles.teamNameData]}>{item.player.nfl_team}</Text>
                {positionStatNames.map(c => (
                  <Text
                    style={[styles.text, styles.statData, styles.data]}
                    key={`${c.key}_${item.key}`}
                  >
                    {item.gameData[c.value]}
                  </Text>
                ))}
              </View>
            )}
            data={sectionStats}
          />
        </View>
      </ScrollView>
    </View>
  );
};

BoxScorePositionSection.propTypes = {
  section: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
};

export default BoxScorePositionSection;
