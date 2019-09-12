import { createStackNavigator } from 'react-navigation-stack';
import BoxScoreScreen from './BoxScoreScreen';
import QuarterPicker from '../QuarterPicker';
import TeamPicker from '../TeamPicker';


export const BoxScoreNavigator = createStackNavigator(
  {
    BoxScore: {
      screen: BoxScoreScreen,
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

export default null;
