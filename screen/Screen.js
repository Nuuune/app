import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

import Util from '../Util';
import NavBarSearch from '../component/NavBarSearch';


export default class Screen {
    static generateTextNavigation(text) {
        return {
            title: text,
            headerStyle: {
                backgroundColor: '#102C4B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'normal',
                fontSize: Util.px2dp(36)
            },
        };
    }

    static generateSearchNavigation() {
        return {
            headerTitle: <NavBarSearch />,
            headerStyle: {
                backgroundColor: '#102C4B',
            },
        };
    }
}