import { createAppContainer, createStackNavigator } from 'react-navigation';

import DaoTextScreen from '../screens/DaoTextScreen';
import TableOfContentsScreen from '../screens/TableOfContentsScreen';
import QuoteScreen from '../screens/QuoteScreen';

export default createAppContainer(createStackNavigator(
  {
    DaoText: DaoTextScreen,
    Contents: TableOfContentsScreen,
    Quote: QuoteScreen
  },
  {
    initialRouteName: 'DaoText',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
));