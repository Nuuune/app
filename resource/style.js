import { StyleSheet, Text, View } from 'react-native';
import Util from '../Util';
import { BASE_TEXT } from 'react-native-dotenv';

export default StyleSheet.create({
    baseText: {
        fontSize: Util.px2dp(BASE_TEXT)
    },
    heading1: {
        fontSize: Util.px2dp(36)
    },
    heading2: {
        fontSize: Util.px2dp(32)
    },
    heading3: {
        fontSize: Util.px2dp(30)
    },
    textGray: {
        color: '#C4C4C4'
    },
    borderGray: {
        borderColor: '#e6e6e6',
    }
});