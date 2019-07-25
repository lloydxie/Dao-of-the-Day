import { AsyncStorage } from 'react-native';

const ASYNC_STORAGE_KEY = 'GoLloyd'

// class GlobalState {
    DEFAULT_SETTINGS = {
        'typingSoundToggle': true,
        'musicToggle': true
    }

    function loadPastState() {
        AsyncStorage.getItem(ASYNC_STORAGE_KEY).then((oldSetting) => {
            if (!oldSetting) {
                AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
            }
            this.setState(JSON.parse(oldSetting))
        })

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("willFocus", () => {
            AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(this.state))
        });
    }
// }
// const GLOBAL_STATE = new GlobalState();
export default loadPastState;