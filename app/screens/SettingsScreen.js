'use strict';
import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native';
import SettingsList from 'react-native-settings-list';

import GLOBAL from './global.js'

// simple example
export default class SettingsScreen extends Component {
  constructor(){
    super()
  }
  render() {
    GLOBAL.state = this;
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList>
          <SettingsList.Header headerText='Settings' headerStyle={{color:'black'}}/>
            <SettingsList.Item
              hasNavArrow={false}
              title='Rate the App'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={GLOBAL.state.typingSound}
              switchOnValueChange={(value) => GLOBAL.state.setState({typingSound: true })}
              hasSwitch={true}
              title='Typing Sound FX'/>
            <SettingsList.Item
              hasNavArrow={true}
              switchState={GLOBAL.state.music}
              switchOnValueChange={(value) => GLOBAL.state.setState({music: value})}
              hasSwitch={true}
              title='BG Music (turn off for slower phones)'/>
            <SettingsList.Item
              hasNavArrow={false}
              title='Share me'/>
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(value){
    GLOBAL.state.setState({switchValue: value});
  }
}