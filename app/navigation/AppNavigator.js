import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

export default createAppContainer(createStackNavigator(
  {
    Home: HomeScreen,
    Links: LinksScreen,
  },
  {
    initialRouteName: 'Home',
  }
));