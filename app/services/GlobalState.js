import { AsyncStorage } from 'react-native';
import { scrapedDao, chineseText } from '../screens/content/daoDeChing'
import { chineseTranslation } from '../screens/content/wikiSource'
import { hoganDao } from '../screens/content/hoganSource'

const ASYNC_STORAGE_KEY = 'GoLloyd'

class GlobalState {
    DEFAULT_SETTINGS = {
        'typingSoundToggle': false,
        'musicToggle': false,
        'musicIndex': 2,
        'translationIndex': 1,
        'colorIndex': 1,
        'typingSpeed': 'x3',
        'isFirstAppLoad': true
    }

    TRANSLATIONS = [
        hoganDao,
        scrapedDao,
        chineseTranslation,
      ]

    loadPastState(that, cb = null) {
        AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
            if (!oldSetting) {
                AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(this.DEFAULT_SETTINGS))
            }
            console.log('focusing')
            console.log(oldSetting)
            that.setState(JSON.parse(oldSetting))
            if (cb) {
                cb()
            }
        })
    }

    initializeStorageTriggers(that, cb) {
        const { navigation } = that.props;

        that.focusListener = navigation.addListener("willFocus", () => {
            this.loadPastState(that, cb)
        });
    }

    unloadStorageTriggers(that) {
        that.focusListener.remove();
    }

    updateSetting(that, key, value) {
        let newState = {...that.state}
        newState[key] = value
        that.setState(newState)
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(newState))
    }

    toggleSetting(that, key) {
        let oldValue = that.state[key]
        let newState = {...that.state}
        newState[key] = !oldValue
        that.setState(newState)
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(newState))
    }
}
const GLOBAL_STATE = new GlobalState();
export default GLOBAL_STATE;