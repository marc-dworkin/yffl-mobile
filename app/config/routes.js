import { TabNavigator, StackNavigator } from 'react-navigation';
import BoxScore from '../screens/BoxScore';
import QuarterPicker from '../screens/QuarterPicker';
import TeamPicker from '../screens/TeamPicker';

// Manifest of possible screens
const MyTabNavigator = TabNavigator({
  BoxScore: {
    screen: BoxScore,
  },
  QuarterPicker: {
    screen: QuarterPicker,
  },
});

export const BoxScoreNavigator = StackNavigator(
  {
    BoxScore: {
      screen: BoxScore,
    },
    QuarterPicker: {
      screen: QuarterPicker,
    },
    TeamPicker: {
      screen: TeamPicker,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none ',
    // https://github.com/react-community/react-navigation/issues/864
    cardStyle: { backgroundColor: 'transparent', opacity: 1 },
  },
);

export default MyTabNavigator;
