import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { scrapedDao } from './content/daoDeChing'
import {withNavigationFocus} from 'react-navigation';

class DaoTextScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("willFocus", () => {
      this.daoText.fadeIn(2000)
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    let numberOfTheDay = this.props.navigation.getParam('index',  Math.floor(Math.random() * 2));
    let daoOfTheDay = scrapedDao[numberOfTheDay].title;
    let arrayOfLines = daoOfTheDay.split("\n");
    
    return (
      <View style={styles.container}>
        <Button
          title="Go back"
          onPress={() => {
            this.daoText.fadeOut(1000).then(() => this.props.navigation.navigate('Contents'));
          }}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._playVoiceOfJesusAkaJoshEsguerra} style={styles.helpLink}>
              <Animatable.Text style={styles.helpLinkText} ref={ref => this.daoText = ref} >{daoOfTheDay}</Animatable.Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View> 
    );
  }
}

export default withNavigationFocus(DaoTextScreen);

_playVoiceOfJesusAkaJoshEsguerra = () => {

};
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },  
  contentContainer: {
    flexGrow: 1,
  },
  helpContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  helpLinkText: {
    color: '#fff',
    fontSize: 17
  }
});
