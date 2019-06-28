import { createAppContainer, createStackNavigator } from 'react-navigation';

import DaoTextScreen from '../screens/DaoTextScreen';
import TableOfContentsScreen from '../screens/TableOfContentsScreen';
import LoadingScreen from '../screens/LoadingScreen';

export default createAppContainer(createStackNavigator(
  {
    DaoText: DaoTextScreen,
    Contents: TableOfContentsScreen,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: 'Contents',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
));