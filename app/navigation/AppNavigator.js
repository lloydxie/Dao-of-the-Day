import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DaoTextScreen from '../screens/DaoTextScreen';
import LinksScreen from '../screens/LinksScreen';
import TableOfContentsScreen from '../screens/TableOfContentsScreen';

export default createAppContainer(createStackNavigator(
  {
    DaoText: DaoTextScreen,
    Contents: TableOfContentsScreen
  },
  {
    initialRouteName: 'DaoText',
  }
));