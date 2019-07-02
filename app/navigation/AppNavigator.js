import { createAppContainer, createStackNavigator } from 'react-navigation';

import DaoTextScreen from '../screens/DaoTextScreen';
import TableOfContentsScreen from '../screens/TableOfContentsScreen';

export default createAppContainer(createStackNavigator(
  {
    DaoText: DaoTextScreen,
    Contents: TableOfContentsScreen,
  },
  {
    initialRouteName: 'Contents',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
));