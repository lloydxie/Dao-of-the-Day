import { AsyncStorage } from 'react-native';

const ASYNC_STORAGE_KEY = 'GoLloyd'

class GlobalState {
    DEFAULT_SETTINGS = {
        'typingSoundToggle': true,
        'musicToggle': true,
        'musicSelectionIndex': 2
    }

    loadPastState(that) {
        AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
            if (!oldSetting) {
                AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
            }
            console.log(oldSetting)
            // that.setState({...DEFAULT_SETTINGS, ...JSON.parse(oldSetting)})
            that.setState(JSON.parse(oldSetting))
        })
    }

    initializeStorageTriggers(that) {
        const { navigation } = that.props;

        that.focusListener = navigation.addListener("willFocus", () => {
            console.log('we loading bois')
            loadPastState(that)
        });

        that.blurListener = navigation.addListener("willBlur", () => {
            console.log('we updated')
            AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(that.state))
        });
    }

    unloadStorageTriggers(that) {
        this.focusListener.remove();
        this.blurListener.remove();
    }
}
const GLOBAL_STATE = new GlobalState();
export default GLOBAL_STATE;