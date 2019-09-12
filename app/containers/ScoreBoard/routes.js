import { createStackNavigator } from 'react-navigation-stack';
import ScoreBoardScreen from './ScoreBoardScreen';
import QuarterPicker from '../QuarterPicker';


export const ScoreBoardNavigator = createStackNavigator(
  {
    ScoreBoard: {
      screen: ScoreBoardScreen,
    },
    QuarterPicker: {
      screen: QuarterPicker,
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
