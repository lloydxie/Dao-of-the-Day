import { AsyncStorage } from 'react-native';
import { scrapedDao, chineseText } from '../screens/content/daoDeChing'
import { chineseTranslation } from '../screens/content/wikiSource'
import { hoganDao } from '../screens/content/hoganSource'

const ASYNC_STORAGE_KEY = 'GoLloyd'

class GlobalState {
    DEFAULT_SETTINGS = {
        'typingSoundToggle': true,
        'musicToggle': true,
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
            that.setState(JSON.parse(oldSetting))
            if (cb) {
                cb()
            }
        })
    }

    initializeStorageTriggers(that, cb = null) {
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

        // only store global state fields, not the other fields in the component
        globalState = this.whitelistGlobalStateFields(newState)
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(newState))
    }

    toggleSetting(that, key) {
        let oldValue = that.state[key]
        let newState = {...that.state}
        newState[key] = !oldValue
        that.setState(newState)
        
        globalState = this.whitelistGlobalStateFields(newState)
        AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(newState))
    }

    whitelistGlobalStateFields(componentState) {
        whitelist = Object.keys(componentState)
        const globalState = whitelist
            .reduce((obj, key) => ({ ...obj, [key]: componentState[key] }), {})
        
        return globalState
    }

    loadPastStateForNonComponent(cb = null) {
        return AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
            if (cb) {
                cb()
            }
            return oldSetting
        })
    }
}
const GLOBAL_STATE = new GlobalState();
export default GLOBAL_STATE;