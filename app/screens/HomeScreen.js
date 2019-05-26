import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as daoDeChing from './content/daoDeChing'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    let numberOfTheDay = Math.floor(Math.random() * 2) + 1
    let daoOfTheDay = 'daoDeChing.d' + 1;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>{"   " + eval(daoOfTheDay)}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

_handleHelpPress = () => {

};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  helpContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  helpLinkText: {
    fontSize: 18,
  }
});
