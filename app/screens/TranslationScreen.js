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
      <View style={{backgroundColor:'#1f1f1f',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList backgroundColor='#1f1f1f'>
          <SettingsList.Header headerText='Select Translation' headerStyle={{color:'#22BAD9', fontSize: 22, marginLeft: '3.5%'}}/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.translationIndex == 1}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'translationIndex', 1)}
              hasSwitch={true}
              titleStyle={{color: '#22BAD9'}}
              switchProps={
                {
                  trackColor: {false: '#22BAD9', true: 'yellow'},
                  thumbColor: '#22BAD9'
                }
              }
              title='Paradoxical wisdom'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.translationIndex == 2}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'translationIndex', 2)}
              hasSwitch={true}
              titleStyle={{color: '#22BAD9'}}
              switchProps={
                {
                  trackColor: {false: '#22BAD9', true: 'yellow'},
                  thumbColor: '#22BAD9'
                }
              }
              title='No bullshit – straight to your face'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.translationIndex == 3}
              switchOnValueChange={() => GLOBAL_STATE.updateSetting(this, 'translationIndex', 3)}
              hasSwitch={true}
              titleStyle={{color: '#22BAD9'}}
              switchProps={
                {
                  trackColor: {false: '#22BAD9', true: 'yellow'},
                  thumbColor: '#22BAD9'
                }
              }
              title='Chinese (original)'/>
          </SettingsList>
        </View>
      </View>
    );
  }
}