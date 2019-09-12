import React from 'react';
import {
  Text, FlatList, View, StyleSheet,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';

import { getYFFLPoints } from '../../lib/yffl';

import collections from '../../lib/collections';

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

const ScoreBoardItem = ({ teamName, stats }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <FlatList
        data={[1, 2, 3]}
        renderItem={({ i2 }) => (
          <Text style={styles.text}>
            Small
            {' '}
            {i2}
          </Text>
        )}
        keyExtractor={(i2) => i2}
      />
      <Text style={[styles.text, styles.h1]}>
        Big
        {' '}
        {teamName}
      </Text>
    </View>
  </View>
);

ScoreBoardItem.propTypes = {
  teamName: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
};

export default ScoreBoardItem;
