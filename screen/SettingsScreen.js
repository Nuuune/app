import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    Button
} from 'react-native';
import AppTabBar from '../component/AppTabBar';
import Store from '../store';
import Service from '../api/Service';
import { List } from 'antd-mobile-rn';
import Util from '../Util';

const Item = List.Item;

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: '设置'
    };

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <ScrollView style={{
                backgroundColor: '#F7F7F7'
            }}>
                <List renderHeader={()=>'系统'}>
                    <Item extra="已经是最新版本" arrow="horizontal">
                        检查更新
                    </Item>
                </List>

                <View style={{marginTop: Util.px2dp(50), alignItems: 'stretch', paddingHorizontal: Util.px2dp(30)}}>
                    <Button onPress={this._logout} title="安全退出" style={{ backgroundColor: '#102C4B'}}/>
                </View>
            </ScrollView>
        );
    }

    _logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
}