'use strict';
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image
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
    
    this.aboutAuthor2 = `online in high school.
    
    His first romantic obsession filled with insecurity and shame came to a tulmutuous halt at the age of 15. He felt broken and longed for true companionship. He was undergoing severe unhappiness, loneliness, and alienation from his classmates. He dreamed of a day where life would flourish again.
    
    Two things kept him alive for the time being – music, and the ` 
    
    this.aboutAuthor3 = ` By reading it, he soon discovered the ultimate truth of the universe that our relationships determine the fruition of our life.`
    
    this.title2 = `
    About the Dao De Jing`
    
    this.content1 = `   Wiser Each Dao was inspired by the life-altering experience of reading the `
    
    this.content2 = 
    `
    
    The way the Dao De Jing is written is meant to make you come up with your own conclusions. 
    
    It will help you look at your relationships and leadership ability from a 180 degree perspective – with dating, friends, coworkers, and the most important one of all – your relationship with yourself.

    With the typing effect, the speed may seem slow to you – but wisdom is found in between the lines.
    
    When your eyes follow the flow of the passage progressing in its development, that is when you give yourself the space that can cause you to intuitively fill in the blanks or make unique connections to other ideas or concepts.
    
    
    
    `
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <Image
          source={require('../assets/images/starry_2.jpg')}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            // opacity: 0.4,
          }}
          resizeMode="contain"
        /> */}
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
            {this.aboutAuthor1}<B>{"Dao De Jing "}</B>{this.aboutAuthor2}<B>{"Dao De Jing."}</B>{this.aboutAuthor3}
          </Text>

          <View
            style={{
              ...styles.titleContainer,
            }}
          >
            <Text
              style={{
                ...styles.title,
                marginTop: '20%'
              }}
            >{this.title2}</Text>
          </View>
          <Text
            style={styles.aboutText}
          >{this.content1}<B>{"Dao De Jing."}</B>{this.content2}</Text>
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