import { AsyncStorage } from 'react-native';

const ASYNC_STORAGE_KEY = 'GoLloyd'

class GlobalState {
    DEFAULT_SETTINGS = {
        'typingSoundToggle': false,
        'musicToggle': false,
        'musicIndex': 2,
        'translationIndex': 2,
        'colorIndex': 1,
        'typingSpeed': 'x3'
    }

    loadPastState(that) {
        AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
            if (!oldSetting) {
                AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
            }
            that.setState(JSON.parse(oldSetting))
        })
    }

    initializeStorageTriggers(that) {
        const { navigation } = that.props;

        that.focusListener = navigation.addListener("willFocus", () => {
            // setTimeout(() => this.loadPastState(that), 50)
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