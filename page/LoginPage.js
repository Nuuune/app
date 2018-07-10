import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TabBar, SearchBar } from 'antd-mobile-rn';
import Util from '../Util';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'greenTab',
        };
    }

    renderContent(pageText) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <SearchBar placeholder="Search" showCancelButton />
                <Text style={{ margin: 50 }}>{pageText}</Text>
            </View>
        );
    }

    onChangeTab(tabName) {
        this.setState({
            selectedTab: tabName,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../resource/images/login.png')} style={styles.background} />
                <Image source={require('../resource/images/logo.png')} style={styles.logo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    logo: {
        width: Util.px2dp(144),
        height: Util.px2dp(167),
        marginTop: Util.px2dp(150),
    },
});