import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import { scrapedDao } from './content/daoDeChing'
import { FlatList } from 'react-native-gesture-handler';
import { DangerZone } from 'expo';
import Lottie from 'lottie-react-native'
import TypeWriter from 'react-native-typewriter';

numColumns = 3;
export default class TableOfContentsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    this.lottieNinja.play();
    // this.lottieYinYang.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <TypeWriter
                typing={1}
                style={styles.title}
                minDelay={100}
                maxDelay={150}
                fixed={true}
              >Da a Day</TypeWriter>
          <Lottie
            ref={animation => {
              this.lottieYinYang = animation;
            }}
            style={styles.lottieYinYang}
            source={require('../assets/lottie/yin_yang.json')}
          />
          <View style={styles.lottieNinja}>
            <Lottie
              ref={animation => {
                this.lottieNinja = animation;
              }}
              style={styles.lottieNinja}
              source={require('../assets/lottie/ninja.json')}
            />
          </View>
          <FlatList
            data={scrapedDao}
            renderItem={({daoText, index}) => {
              return (
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('DaoText', { index: index }) }} style={styles.grid}>
                  <Text style={styles.daoNumber}>{index + 1}</Text>
                </TouchableOpacity>
              );
            }}
            numColumns={numColumns}
            keyExtractor={(item, index) => index}
            contentContainerStyle={styles.gridContainer}
            style={styles.gridContainerStyles}
          >
          </FlatList>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  daoNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridContainerStyles: {
  },
  grid: {
    backgroundColor: '#22BAD995',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: Dimensions.get('window').width / (numColumns * 1.5),
    width: Dimensions.get('window').width / (numColumns * 1.5),
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ffe'
  },
  title: {
    fontSize: 32,
    marginTop: 100,
    color: '#1f1f1f',
    fontFamily: 'dreamOrphans',
  },
  lottieNinja: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    flex: 1,
    aspectRatio: 1
  },
  lottieYinYang: {
    width: 70,
    height: 70,
    // backgroundColor: '#fff',
    flex: 1,
    aspectRatio: 1,
  }
});
