import { AsyncStorage } from 'react-native';

const ASYNC_STORAGE_KEY = 'GoLloyd'

class GlobalState {
    DEFAULT_SETTINGS = {
        'typingSoundToggle': true,
        'musicToggle': true,
        'musicIndex': 2,
        'translationIndex': 2
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
            this.loadPastState(that)
        });

        that.blurListener = navigation.addListener("willBlur", () => {
            AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(that.state))
        });
    }

    unloadStorageTriggers(that) {
        that.focusListener.remove();
        that.blurListener.remove();
    }

    updateSetting(that, key, value) {
        let newState = {}
        newState[key] = value
        that.setState(newState)
    }

    toggleSetting(that, key) {
        let oldValue = that.state[key]
        let newState = {}
        newState[key] = !oldValue
        that.setState(newState)
    }
}
const GLOBAL_STATE = new GlobalState();
export default GLOBAL_STATE;