'use strict';
import React, {Component} from 'react';
import TypeWriter from 'react-native-typewriter';

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
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            Welcome to Wiser Each Dao. Inspired by the life-altering reading of the #1 renowned Daoist text – The Dao De Ching. Written pre-1000 by the royal court advisor and philosopher Lao Tzu. It stands the test of time in it's universal value.
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            Using the app during the nighttime with headphones or speakers will greatly improve the experience.
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            It is such a waste of time to read the Dao De Jing when you have no patience for it. This app is meant to help you cultivate that patience whilst reading it.
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            These are dense, mysterious words. This is not to be read the way you read a book. If anything, it is more akin to reading a poem. Except you are not appreciating written beauty. You are appreciating paradoxical wisdom that leaves you pondering each line.
          </TypeWriter>

          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
          The speed of typing might seem slow to you, but the wisdom is found in between the lines.
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
          When your eyes follow the flow of the passage progressing in its development, that is when you give yourself the space that can cause you to intuitively fill in the blanks or make unique connections to other ideas or concepts.
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
          But hey, if you don’t like the idea, than we’ve included a skip button so you can see the whole text at once.
          </TypeWriter>
          
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            The Dao De Jing is like a bible for your life's Hero's Journey.
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            The best coaches in life are the ones who don’t just tell you what to do, but make you seek the answers yourself. They give you the space to find your own way. And that is precisely the method of the Lao Tzu in the Tao Te Ching.
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            Online and social media gurus can give you all the greatest advice in the world – but it will do nothing for you until you start doing things your own way. 
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            Take the time to learn about yourself and the world around you. The more you do this, the more your intuition will be developed, and you should listen to it. If something feels wrong, don’t do it. If something feels like a good idea, go for it.
          </TypeWriter>
          <TypeWriter
              typing={1}
              style={styles.title2}
              minDelay={200}
              maxDelay={300}
              initialDelay={5000}
              delayMap={delayMap}
              fixed={true}
              onTypingEnd={() => {AudioServiceSingleton.unmount(AudioServiceSingleton.initialLoadMap['typing.mp3'])}}
              >
            Now, embark on your own journey toward that which you seek. 
          </TypeWriter>
      </View>
    );
  }
}