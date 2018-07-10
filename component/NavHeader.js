import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'antd-mobile-rn';
import commonStyles from '../resource/style';
import Util from '../Util';
import SearchBarStyle from 'antd-mobile-rn/lib/search-bar/style/index.native';

let customSearchBarStyle = {
    ...SearchBarStyle,
    input: {
        ...SearchBarStyle.input,
        height: Util.px2dp(58),
        borderWidth: 0,
        borderRadius: Util.px2dp(28),
    },
    cancelTextContainer: {
        ...SearchBarStyle.cancelTextContainer,
        height: Util.px2dp(58),
    },
    wrapper: {
        ...SearchBarStyle.wrapper,
        backgroundColor: 'transparent'
    }
};

export default class NavHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ backgroundColor: '#102C4B', height: Util.px2dp(128), paddingTop: Util.px2dp(36), alignItems: 'center' }}>
            {this.props.search ? (
                <SearchBar placeholder='搜索' styles={customSearchBarStyle} />
            ) : (
                <Text style={ [commonStyles.heading1, {color: 'white', lineHeight: Util.px2dp(128 - 36)}] }>{this.props.title}</Text>
            )}
            </View>
        );
    }
}
