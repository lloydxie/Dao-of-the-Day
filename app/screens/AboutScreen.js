'use strict';
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const B = (props) => 
  <Text 
    style={{
      fontSize: 16 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
      fontFamily: 'dreamOrphans',
    }}>
    {props.children}
  </Text>


export default class AboutScreen extends Component {
  constructor(){
    super()
    this.title1 = 'Why I Created This'

    this.aboutAuthor1 = 
    `   The creator of this app had his first encounter with finding the `
    
    this.aboutAuthor2 = `online in high school. He was undergoing severe unhappiness, loneliness, and alienation from his classmates.
    
    He felt a broken longing for a sense of true companionship. He dreamed of a day where he could be flourishing and ecstatic in his life.
    
    Two things kept him alive for the time being – music, and the ` 
    
    this.aboutAuthor3 = ` By reading it, he soon found the ultimate truth that our relationships determines the fruition of our life.`
    
    this.title2 = `
    About the Dao De Ching`
    
    this.content1 = `   Wiser Each Dao was inspired by the life-altering experience of reading the #1 renowned Daoist text – the `
    
    this.content2 = 
    `
    
    Written pre-1000 by the royal court advisor / philosopher / all-around-master Lao Tzu, it stands the test of time in the value people extract from it.
    
    It will help you look at your relationships from a 180 degree perspective – with dating, friends, coworkers, and the most important one of all – your relationship with yourself.
    
    We’ll send you a short quote from it daily – and if it sparks interest, you can read the entire 50 - 300 word passage in full context. 
    
    
    
    
    `
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <ScrollView style={styles.container}>
          <View
            style={styles.titleContainer}
          >
            <Text
              style={styles.title}
            >{this.title1}</Text>
          </View>
          <Text
            style={styles.aboutText}
          >
            {this.aboutAuthor1}<B>{"Dao De Ching "}</B>{this.aboutAuthor2}<B>{"Dao De Ching."}</B>{this.aboutAuthor3}
          </Text>

          <View
            style={{
              ...styles.titleContainer,
            }}
          >
            <Text
              style={{
                ...styles.title,
                marginTop: '35%'
              }}
            >{this.title2}</Text>
          </View>
          <Text
            style={styles.aboutText}
          >{this.content1}<B>{"Dao De Ching."}</B>{this.content2}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  aboutText: {
    fontSize: 18 * (Dimensions.get('window').width / WIDTH_IPHONE_X)
  },
  container: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '1%',
  },
  title: {
    fontSize: 24 * (Dimensions.get('window').width / WIDTH_IPHONE_X),
    alignSelf: 'flex-start',
    fontFamily: 'dreamOrphans',
    marginTop: '20%',
    marginBottom: '10%',
  },
  titleContainer: {
    alignSelf: 'center',
  }
});