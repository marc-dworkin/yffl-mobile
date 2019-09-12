import { createStackNavigator } from 'react-navigation-stack';
import ScoreBoard from './ScoreBoard';
import QuarterPicker from '../QuarterPicker';


export const ScoreBoardNavigator = createStackNavigator(
  {
    ScoreBoard: {
      screen: ScoreBoard,
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
