import React from 'react';
import {
  Text, ScrollView, FlatList, View, StyleSheet,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import { getYFFLPoints } from '../../lib/yffl';

import collections from '../../lib/collections';
import { log, LOG_LEVEL_INFO } from '../../lib/util';

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
    // https://medium.com/differential/better-cross-platform-react-native-components-cb8aadeba472
    fontFamily: 'System',
    fontSize: 11,
    color: '#6c6d6f',
    textAlign: 'left',
    padding: 3,
    marginLeft: 3,
    fontWeight: '400',
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

  note: {
    color: '#cccccc',
    fontSize: 11,
    fontStyle: 'italic',
    fontWeight: '400',
    textAlign: 'left',
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

const statSections = {
 passing: 1, rushing: 1, receiving: 1, kicking: 1 
};

const BoxScorePositionSection = ({ lineupData, section }) => {
  const sectionData = lineupData.map((l) => ({
    key: `player_${section}_${l.player.nfl_id}`,
    player: l.player,
    stats: (section in l.stats) ? l.stats[section] : {},
    yfflInfo: l.stats.yfflInfo,
    gameInfo: l.stats.gameInfo,
    isRelevent: (section in statSections) ? (section in l.stats)
      // if it has no stats its relavent to pending
      : collections.intersect(l.stats, statSections).length === 0,
  }))
    .filter((c) => c.isRelevent)
    // eslint-disable-next-line no-underscore-dangle
    .sort(collections.sortBy((c) => c.stats._pts, false));


  // no-return-assign so have to do in seperat loop
  for (let i = 0; i < sectionData.length; i += 1) {
    sectionData[i].index = i;
    sectionData[i].isAltRow = i % 2 !== 0;
  }

  //  console.log(sectionStats[0]);

  const positionStatNames = (sectionData.length === 0) ? [] : Object.keys(
    sectionData[0].stats,
  )
    // skip name
    .slice(1)
    // skip lngtd
    .filter((c) => !['lngtd', 'totpfg', 'xpmissed', 'xptot', '_pts'].includes(c))
    .map((c) => ({
      display: c
        .replace('twop', '2P')
        .replace('xpmade', 'Xpm')
        .replace('fgyds', 'lng')
        .toUpperCase(),
      value: c,
      key: `stat_${section}_${c}`,
    }));

  if (sectionData.length == 0) {
    return (
      <View>
        <Text style={[styles.text, styles.h2]}>{collections.ucFirst(section)}</Text>
        <View style={styles.headerRow}>
          <Text style={[styles.text, styles.note]}>
            No
            {' '}
            {collections.ucFirst(section)}
            {' '}
            stats yet...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text style={[styles.text, styles.h2]}>{collections.ucFirst(section)}</Text>
      <ScrollView style={styles.statContainer} horizontal>
        <View>
          <View style={styles.headerRow}>
            <Text style={[styles.text, styles.th, styles.playerNameData]}>Player</Text>
            <Text style={[styles.text, styles.th, styles.teamNameData]}>Team</Text>
            <Text style={[styles.text, styles.th, styles.teamNameData]}>Pos</Text>
            <Text style={[styles.text, styles.th, styles.teamNameData]}>Opp</Text>
            <Text style={[styles.text, styles.th, styles.statData]}>PTS</Text>
            {positionStatNames.map((c) => (
              <Text style={[styles.text, styles.th, styles.statData]} key={c.key}>
                {c.display}
              </Text>
            ))}
          </View>
          <FlatList
            renderItem={({ item }) => {
              log(item);
              return (
                <View style={[styles.dataRow, item.isAltRow && styles.altRow]}>
                  <Text style={[styles.text, styles.playerNameData]}>
                    {item.player.last_name}
                    ,
                    {' '}
                    {item.player.first_name}
                  </Text>
                  <Text style={[styles.text, styles.teamNameData]}>{item.player.nfl_team}</Text>
                  <Text style={[styles.text, styles.teamNameData]}>{item.player.position}</Text>
                  <Text style={[styles.text, styles.teamNameData]}>
                    {
                      item.gameInfo ? (
                        item.player.nfl_team === item.gameInfo.RoadTeamName
                          ? item.gameInfo.HomeTeamName
                          : item.gameInfo.RoadTeamName
                      ) : 'N/A'
                    }
                  </Text>
                  <Text style={[styles.text, styles.statData, styles.data]}>
                    {
                      // eslint-disable-next-line no-underscore-dangle
                      item.stats._pts
                    }
                  </Text>
                  {positionStatNames.map((c) => (
                    <Text
                      style={[styles.text, styles.statData, styles.data]}
                      key={`${c.key}_${item.key}`}
                    >
                      {item.stats[c.value]}
                    </Text>
                  ))}
                </View>
              );
            }}
            data={sectionData}
          />
        </View>
      </ScrollView>
    </View>
  );
};

BoxScorePositionSection.propTypes = {
  section: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  lineupData: PropTypes.array.isRequired,
};

export default BoxScorePositionSection;
