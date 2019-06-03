import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import TableOfContentsScreen from '../screens/TableOfContentsScreen';

export default createAppContainer(createStackNavigator(
  {
    Home: HomeScreen,
    Contents: TableOfContentsScreen
  },
  {
    initialRouteName: 'Home',
  }
));