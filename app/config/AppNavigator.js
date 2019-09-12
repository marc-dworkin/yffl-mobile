import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import PropTypes from 'prop-types';

import Colors from './Colors';

import BoxScoreScreen from '../containers/BoxScore';
import ScoreBoardScreen from '../containers/ScoreBoard';
import QuarterPickerScreen from '../containers/QuarterPicker';
import TeamPicker from '../containers/TeamPicker';


// TODO: Use xplatform icon

// import Colors from '../Colors';
import XPlatformIcon from '../components/XPlatformIcon';

const BoxScoreNavigator = createStackNavigator({
  BoxScore: BoxScoreScreen,
  QuarterPicker: {
    screen: QuarterPickerScreen,
  },
  TeamPicker: {
    screen: TeamPicker,
  },
},
{
  headerMode: 'none', // Platform.OS === 'ios' ? 'float' : 'screen',
  navigationOptions: () => ({
    title: 'Box Score',
  }),
  mode: 'modal',
  // https://github.com/react-community/react-navigation/issues/864
  cardStyle: { backgroundColor: 'transparent', opacity: 1 },
});

BoxScoreNavigator.navigationOptions = {
  tabBarLabel: 'Box Score',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused, tintColor }) => (
    <XPlatformIcon
      focused={focused}
      size={26}
      style={{ marginBottom: -3 }}
      color={tintColor || Colors.tintColor}
      name="albums"
    />
  ),
};

const ScoreBoardNavigator = createStackNavigator({
  ScoreBoard: ScoreBoardScreen,
  QuarterPicker: {
    screen: QuarterPickerScreen,
  },
},
{
  headerMode: 'none', // Platform.OS === 'ios' ? 'float' : 'screen',
  navigationOptions: () => ({
    title: 'Scoreboard',
  }),
  mode: 'modal',
  // https://github.com/react-community/react-navigation/issues/864
  cardStyle: { backgroundColor: 'transparent', opacity: 1 },
});

ScoreBoardNavigator.navigationOptions = {
  tabBarLabel: 'Scoreboard',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ focused, tintColor }) => (
    <XPlatformIcon
      focused={focused}
      size={26}
      style={{ marginBottom: -3 }}
      color={tintColor || Colors.tintColor}
      name="home"
    />
  ),
};

const AppNavigator = createBottomTabNavigator({
  ScoreBoardNavigator,
  BoxScoreNavigator,
},
{
  initialRouteName: 'ScoreBoardNavigator',
  tabBarOptions: {
    activeTintColor: Colors.tintColor,
  },
  defaultNavigationOptions: {
  },
});

// http://nobrok.com/understand-nesting-react-native-navigators/
AppNavigator.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  screenProps: PropTypes.object,
};


export default AppNavigator;
