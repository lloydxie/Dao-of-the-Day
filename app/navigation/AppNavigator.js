import React from 'react';  
import { View, Text } from 'react-native';  
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
import IntroScreen from '../screens/IntroScreen';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

import { Ionicons } from '@expo/vector-icons';

const screensToFade = [
  'Home',
  'DaoText',
  'Quote',
  'Intro'
]

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        headerStyle: {
          backgroundColor: '#181818',
        },
      },
    },
    DaoText: {
      screen: DaoTextScreen,
      navigationOptions: {
        header: null,
        headerStyle: {
          backgroundColor: '#181818',
        },
      }
    },
    Contents: {
      screen: TableOfContentsScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#181818',
        },
        headerTintColor: '#22BAD9'
      },
    },
    Quote: {
      screen: QuoteScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#181818',
        },
        header: null,
      }
    },
    Translation: {
      screen: TranslationScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#181818',
        },
        headerTintColor: '#22BAD9',
      },
    },
    // Intro Screens
    Intro: {
      screen: IntroScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#181818',
        },
        headerTintColor: '#22BAD9',
        header: null,
      },
    }
  },
  {
    initialRouteName: 'Intro',
    // headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
      },
      screenInterpolator: props => {
        const last = props.scenes[props.scenes.length - 1];
  
        // Transitioning from these screens (goBack)
        if (screensToFade.includes(last.route.routeName)) {
          return StackViewStyleInterpolator.forFade(props);
        }
  
        return StackViewStyleInterpolator.forVertical(props);
      },
    }),
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
      navigationOptions: ({ navigation }) => {  
        return {
          tabBarLabel:<Text style={{ fontSize: 14 }}>Home</Text>,
          tabBarIcon: ({ tintColor }) => (  
            <View>  
              <Ionicons style={[{color: tintColor}]} size={30} name={'ios-home'}/>  
            </View>
          ),
          tabBarVisible: navigation.state.routes[navigation.state.index].routeName === 'Intro' ? false : true
        }
      }
    },
    Settings: { 
      screen: SettingsStack,
      navigationOptions: {  
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
    barStyle: { backgroundColor: '#22BAD9' },  
    initialRouteName: 'Home',
    shifting: true,
  }
));