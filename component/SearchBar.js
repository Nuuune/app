import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput } from 'react-native';
// import { SearchBar } from 'antd-mobile-rn';
import Util from '../Util';
// import SearchBarStyle from 'antd-mobile-rn/lib/search-bar/style/index.native';

const statusH = StatusBar.currentHeight;

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inputWords: ''
        }
    }

    _onInputChange = (val) => {
      console.log(`输入: ${val}`);
      this.setState({inputWords: val});
    }

    render() {
        const {title} = this.props;
        return (
          <View style={styles.layout2}>
            <View style={[styles.layout2Item, styles.marginSpace]}>
              <Text style={styles.textStyle}>{title}</Text>
            </View>
            <View style={[styles.layout2Item, styles.inputWrap, {flex: 5}]}>
              { // 占位符
                this.state.inputWords ? null :
                <View style={styles.placehd}>
                  <View>
                    <Text style={{color:'#bbb', lineHeight: Util.px2dp(28), fontSize: Util.px2dp(28)}}>搜索</Text>
                  </View>
                </View>
              }
              <TextInput
                underlineColorAndroid='transparent'
                onChangeText={this._onInputChange}
                style={styles.hdText}
                />
            </View>
            <View style={[styles.layout2Item, styles.marginSpace, {borderRadius: Util.px2dp(14), backgroundColor: '#007cce'}]}>
              <Text style={styles.textStyle}>取消</Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    hdText: {
      fontSize: Util.px2dp(28),
      paddingVertical: 0
    },
    textStyle: {
      color: '#fff',
      fontSize: Util.px2dp(30),
      lineHeight: Util.px2dp(30),
      textAlign: 'center'
    },
    marginSpace: {
      marginHorizontal: Util.px2dp(10)
    },
    placehd: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerBox: {
        overflow: 'hidden',
        flexDirection: 'column'
    },
    layout2: {
        height: Util.px2dp(128) - statusH,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    layout2Item: {
        height: Util.px2dp(55),
        position: 'relative',
        justifyContent: 'center',
        flex: 1
    },
    inputWrap: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#fff',
      borderRadius: Util.px2dp(8)
    }
});
