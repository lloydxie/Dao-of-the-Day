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
        'typingSpeed': 'x3'
    }

    TRANSLATIONS = [
        hoganDao,
        scrapedDao,
        chineseTranslation,
      ]

    loadPastState(that) {
        AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
            if (!oldSetting) {
                AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(this.DEFAULT_SETTINGS))
            }
            that.setState(JSON.parse(oldSetting))
        })
    }

    initializeStorageTriggers(that) {
        const { navigation } = that.props;

        that.focusListener = navigation.addListener("willFocus", () => {
            this.loadPastState(that)
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