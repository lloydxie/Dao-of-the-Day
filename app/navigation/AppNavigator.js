import React from 'react';  
import { View, Text  } from 'react-native';  
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import DaoTextScreen, { DAO_BLUE } from '../screens/DaoTextScreen';
import HomeScreen from '../screens/HomeScreen';
import QuoteScreen from '../screens/QuoteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TranslationScreen from '../screens/TranslationScreen';
import MusicSelectionScreen from '../screens/MusicSelectionScreen';
import TableOfContentsScreen from '../screens/TableOfContentsScreen';
import AboutScreen from '../screens/AboutScreen';
import { fadeIn } from 'react-navigation-transitions';

import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    DaoText: DaoTextScreen,
    Contents: TableOfContentsScreen,
    Quote: QuoteScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: () => fadeIn(1000),
  }
);

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  MusicSelection: MusicSelectionScreen,
  About: AboutScreen,
});

export default createAppContainer(createMaterialBottomTabNavigator(
  {
    Home: { 
      screen: HomeStack,
      navigationOptions:{  
        tabBarLabel:<Text style={{ fontSize: 14 }}>Home</Text>,
        tabBarIcon: ({ tintColor }) => (  
          <View>  
            <Ionicons style={[{color: tintColor}]} size={30} name={'ios-home'}/>  
          </View>
        ),  
      }  
    },
    Settings: { 
      screen: SettingsStack,
      navigationOptions:{  
        tabBarLabel:<Text style={{ fontSize: 14 }}>Settings</Text>,
        tabBarIcon: ({ tintColor }) => (  
          <View style={[{height: '150%'}]}>  
            <Ionicons style={[{color: tintColor, marginBottom: '20%'}]} size={30} name={'ios-settings'}/>  
          </View>
        ),  
      }  
    },
    
  },
  {
    activeColor: '#f0edf6',  
    inactiveColor: '#226557',  
    barStyle: { backgroundColor: '#3BAD87' },  
    initialRouteName: 'Settings',
    shifting: true,
  }
));