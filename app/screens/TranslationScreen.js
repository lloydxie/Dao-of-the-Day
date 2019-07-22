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


// simple example
export default class SettingsScreen extends Component {
  constructor(){
    super();
    this.state = {
        switchValue: 1
    }
  }
  render() {
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <View style={{flex:1, marginTop:50}}>
          <SettingsList backgroundColor='#EFEFF4'>
          <SettingsList.Header headerText='Translation' headerStyle={{color:'black'}}/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue == 1}
              switchOnValueChange={() => this.onValueChange(1)}
              hasSwitch={true}
              title='Translation 1'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue == 2}
              switchOnValueChange={() => this.onValueChange(2)}
              hasSwitch={true}
              title='Translation 2'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue == 3}
              switchOnValueChange={() => this.onValueChange(3)}
              hasSwitch={true}
              title='Translation 3'/>
            <SettingsList.Item
              hasNavArrow={false}
              switchState={this.state.switchValue == 4}
              switchOnValueChange={() => this.onValueChange(4)}
              hasSwitch={true}
              title='Chinese (original)'/>
          </SettingsList>
        </View>
      </View>
    );
  }
  onValueChange(index){
    this.setState({switchValue: index});
  }
}