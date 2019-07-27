'use strict';
import React, {Component} from 'react';

import {
  View,
} from 'react-native';
import SettingsList from 'react-native-settings-list';

import GLOBAL_STATE from '../services/GlobalState';

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
          <SettingsList.Header headerText='Translation' headerStyle={{color:'black', fontSize: '22'}}/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.translationIndex == 1}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'translationIndex', 1)}
              hasSwitch={true}
              title='Translation 1'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.translationIndex == 2}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'translationIndex', 2)}
              hasSwitch={true}
              title='Translation 2'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.translationIndex == 3}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'translationIndex', 3)}
              hasSwitch={true}
              title='Translation 3'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.translationIndex == 4}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'translationIndex', 4)}
              hasSwitch={true}
              title='Chinese (original)'/>
          </SettingsList>
          <SettingsList backgroundColor='#EFEFF4'>
          <SettingsList.Header headerText='Color Presets' headerStyle={{color:'black', fontSize: '22'}}/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.colorIndex == 1}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'colorIndex', 1)}
              hasSwitch={true}
              title='Ether'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.colorIndex == 2}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'colorIndex', 2)}
              hasSwitch={true}
              title='Light'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.colorIndex == 3}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'colorIndex', 3)}
              hasSwitch={true}
              title='Dark'/>
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(index){
    this.setState({musicSelectionIndex: index});
  }
}