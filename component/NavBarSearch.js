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

export default class NavBarSearch extends React.Component {
    constructor(props) {
        super(props);
        console.log(`nav:`);
        console.log(this.props);
    }

    render() {
        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                {/*<SearchBar placeholder='搜索' styles={customSearchBarStyle} />*/}
            </View>
        );
    }
}
