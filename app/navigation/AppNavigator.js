import { createAppContainer, createStackNavigator } from 'react-navigation';

import DaoTextScreen from '../screens/DaoTextScreen';
import TableOfContentsScreen from '../screens/TableOfContentsScreen';
import QuoteScreen from '../screens/QuoteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TranslationScreen from '../screens/TranslationScreen';

export default createAppContainer(createStackNavigator(
  {
    DaoText: DaoTextScreen,
    Contents: TableOfContentsScreen,
    Quote: QuoteScreen,
    Translation: TranslationScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Translation',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
));