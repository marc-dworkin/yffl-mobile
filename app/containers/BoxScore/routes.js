import { createStackNavigator } from 'react-navigation';
import BoxScore from './BoxScore';
import QuarterPicker from '../QuarterPicker';
import TeamPicker from '../TeamPicker';


export const BoxScoreNavigator = createStackNavigator(
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

export default null;
