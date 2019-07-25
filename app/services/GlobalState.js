import { AsyncStorage } from 'react-native';

const ASYNC_STORAGE_KEY = 'GoLloyd'

class GlobalState {
    DEFAULT_SETTINGS = {
        'typingSoundToggle': true,
        'musicToggle': true
    }

    loadPastState(that) {
        AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
            if (!oldSetting) {
                AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
            }
            console.log(oldSetting)
            that.setState(JSON.parse(oldSetting))
        })

        const { navigation } = that.props;
        that.focusListener = navigation.addListener("willFocus", () => {
            AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(that.state))
        });
    }
}
const GLOBAL_STATE = new GlobalState();
export default GLOBAL_STATE;