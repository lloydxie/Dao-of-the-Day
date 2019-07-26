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

import GLOBAL_STATE from '../services/GlobalState';

// simple example
export default class SettingsScreen extends Component {
  constructor(){
    super();
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
      <View style={{backgroundColor:'white',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList backgroundColor='#EFEFF4'>
          <SettingsList.Header headerText='Translation' headerStyle={{color:'black'}}/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.musicSelectionIndex == 1}
              switchOnValueChange={() => this.onValueChange(1)}
              hasSwitch={true}
              title='Translation 1'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.musicSelectionIndex == 2}
              switchOnValueChange={() => this.onValueChange(2)}
              hasSwitch={true}
              title='Translation 2'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.musicSelectionIndex == 3}
              switchOnValueChange={() => this.onValueChange(3)}
              hasSwitch={true}
              title='Translation 3'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.musicSelectionIndex == 4}
              switchOnValueChange={() => this.onValueChange(4)}
              hasSwitch={true}
              title='Chinese (original)'/>
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(index){
    this.setState({musicSelectionIndex: index});
  }
}