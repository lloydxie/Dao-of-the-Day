'use strict';
import React, {Component} from 'react';

import {
  View,
  Text
} from 'react-native';

export default class SettingsScreen extends Component {
  constructor(){
    super()
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <View>
          <Text>
          “Insert name” is an app inspired by the life-altering experience of reading the #1 renowned Taoist (or Daoist) text – The Dao De Ching. Written pre-1000 by the royal court advisor / philosopher / all-around-master Lao Tzu, It stands the test of time in the value people extract from it. better one’s life, especially when it comes to relationships – not only to your significant other, but also with friends, coworkers, and the most important one of all – the relationship with the self. We’ll send you a short quote from it daily – and if it sparks interest, you can read the entire 25 - 400 word passage in full context. 
          </Text>
      </View>
    );
  }
}