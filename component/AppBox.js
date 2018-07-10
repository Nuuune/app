import React, { Component } from 'react';
import { WebView } from 'react-native';
import Util from '../Util';

export default class AppBox extends Component {
    
    render() {
        return (
            <WebView style={{height: Util.px2dp(200), width: '100%'}}
                source={{ uri: this.props.uri }}
            />
        );
    }
}