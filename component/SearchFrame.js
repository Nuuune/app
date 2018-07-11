import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput} from 'react-native';
import Util from '../Util';

export default class SearchFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          inputWords: '',
          searchShow: false
        };
    }

    _toggleSearchBar = () => {
      this.setState({searchShow: !this.state.searchShow})
    }

    _onInputChange = (val) => {
      console.log(`输入: ${val}`);
      this.setState({inputWords: val});
    }

    toggleSearchBar = () => {
      this._toggleSearchBar()
    }

    render() {
        const { searchShow } = this.state;

        return (
          <View style={{flex: 1}}>
            { // 搜索栏
              searchShow &&
              <View style={styles.searchBar}>
                <View style={styles.textInputWrap}>
                  <TextInput
                    underlineColorAndroid='transparent'
                    onChangeText={this._onInputChange}
                    placeholder="搜索联系人"
                    style={{
                      textAlign: 'center',
                      paddingVertical: 0
                    }}
                    />
                </View>
                <View style={styles.btnWrap}>
                  <Text style={{
                    color: "#0099fc",
                    fontSize: Util.px2dp(28)
                  }}>取消</Text>
                </View>
              </View>
            }

            { // 搜索栏占位块
              searchShow && <View style={{height: Util.px2dp(88)}}></View>
            }

            {
              this.props.children
            }

          </View>

        );
    }
}

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: Util.px2dp(16),
    paddingVertical: Util.px2dp(12)
  },
  textInputWrap: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: Util.px2dp(20),
    borderRadius: Util.px2dp(10),
    height: Util.px2dp(64)
  },
  btnWrap: {
    width: Util.px2dp(115),
    height: Util.px2dp(60),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
