import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { SearchBar } from 'antd-mobile-rn';
import Util from '../Util';
// import SearchBarStyle from 'antd-mobile-rn/lib/search-bar/style/index.native';

export default class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title1, title2, height } = this.props;
        return (
            <View style={[styles.headerBox, { height: height }]}>
              <View style={styles.layout1}>
                <View style={[styles.layout1Item, {height: Util.px2dp(165)}]}>
                  <View style={{position: 'relative'}}>
                    <Text style={styles.text1}>{title1}</Text>
                  </View>
                </View>
                <View style={[styles.layout1Item, {height: Util.px2dp(123)}]}>
                  <View style={{paddingLeft: Util.px2dp(42)}}>
                    <Text style={styles.text2}>
                      {title2}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text1: {
      color:'#fff',
      textAlign: 'center',
      fontSize: Util.px2dp(32),
      lineHeight: Util.px2dp(32)
    },
    text2: {
      color:'#fff',
      fontSize: Util.px2dp(48),
      lineHeight: Util.px2dp(48)
    },
    headerBox: {
        overflow: 'hidden',
        flexDirection: 'column'
    },
    layout1: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexGrow: 1,
        flexShrink: 1,
        height: Util.px2dp(360)
    },
    layout1Item: {
        position: 'relative',
        justifyContent: 'center'
    }
});
