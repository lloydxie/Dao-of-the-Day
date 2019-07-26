'use strict';
import React, {Component} from 'react';

import {
  View,
} from 'react-native';
import SettingsList from 'react-native-settings-list';

import GLOBAL_STATE from '../services/GlobalState';

export default class SettingsScreen extends Component {
  constructor(){
    super()
    this.state = GLOBAL_STATE.DEFAULT_SETTINGS
  }

  componentWillMount() {
    GLOBAL_STATE.initializeStorageTriggers(this)
  }

  componentWillUnmount() {
    GLOBAL_STATE.unloadStorageTriggers(this)
  }

  render() {
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList>
          <SettingsList.Header headerText='Settings' headerStyle={{color:'black'}}/>
            <SettingsList.Item
              hasNavArrow={false}
              title='About the App'/>
            <SettingsList.Item
              hasNavArrow={false}
              title='Rate the App'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.typingSoundToggle}
              switchOnValueChange={() => this.toggleSetting(this, 'typingSoundToggle')}
              hasSwitch={true}
              title='Typing Sound FX'/>
            <SettingsList.Item
              hasNavArrow={true}
              switchState={this.state.musicToggle}
              switchOnValueChange={() => this.toggleSetting(this, 'musicToggle')}
              hasSwitch={true}
              title='BG Music (turn off for slower phones)'/>
              onPress={() => this.navigateToMusicSelection}
            <SettingsList.Item
              hasNavArrow={false}
              title='Share me'/>
          </SettingsList>
        </View>
      </View>
    );
  }

  navigateToMusicSelection() {
    this.props.navigation.navigate('MusicSelection')
  }
}