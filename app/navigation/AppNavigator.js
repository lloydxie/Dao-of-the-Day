import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import DaoTextScreen, { DAO_BLUE } from '../screens/DaoTextScreen';
import HomeScreen from '../screens/HomeScreen';
import QuoteScreen from '../screens/QuoteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TranslationScreen from '../screens/TranslationScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    DaoText: DaoTextScreen,
    // Contents: TableOfContentsScreen,
    Quote: QuoteScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

const TranslationStack = createStackNavigator(
  {
    Translation: TranslationScreen
  }
);

export default createAppContainer(createMaterialBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack,
    Translation: TranslationStack
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    shifting: true,
    barStyle: { backgroundColor: DAO_BLUE }
  }
));