import React from 'react';
import { Image, StyleSheet, View, ScrollView, Dimensions, FlatList, RefreshControl } from 'react-native';
import Util from '../Util';
import HomeHeader from './HomeHeader';
import MySearchBar from './SearchBar';

const wh = Dimensions.get('window').height;

export default class HomeFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          scrollH: 0
        };
    }

    componentDidMount() {

    }



    _onScroll = (e) => {
      const y = e.nativeEvent.contentOffset.y;
      this.setState({scrollH: y})
    }

    _onReachEnd = (e) => {
      const y = e.nativeEvent.contentOffset.y;
      const contentSizeHeight = e.nativeEvent.contentSize.height;
      const oriageScrollHeight = e.nativeEvent.layoutMeasurement.height;
      if(y+oriageScrollHeight > contentSizeHeight - 150) {
        // 距离底部差50单位时触发回调
        this.reachEnd();
      }
    }

    _onRefresh = () => {
      this.props.onRefresh && this.props.onRefresh(this);
    }

    reachEnd = () => {
      this.props.onReachEnd && this.props.onReachEnd();
      console.log(`到底了`);
    }

    render() {
        const { scrollH,  } = this.state;
        const { title1, title2, searchTitle, contentWrapStyle, refreshing } = this.props;
        return (
          <View style={{flex: 1}}>
            {
              // 搜索icon
              scrollH < Util.px2dp(200) &&
              <View style={styles.searchIcon}>
                <Image source={require('../resource/images/search.png')} style={{marginRight: Util.px2dp(28), width: Util.px2dp(32), height: Util.px2dp(32)}}></Image>
              </View>
            }
            {
              // 搜索条
              scrollH >= Util.px2dp(200) &&
              <View style={{zIndex: 999, position: 'absolute', left: 0, right: 0, top: 0, height: Util.px2dp(128), flexDirection: 'column', justifyContent: 'flex-end'}}>
                <Image source={require('../resource/images/main-bg.png')} style={{position: 'absolute', width: '100%', height: Util.px2dp(128) }}/>
                <MySearchBar title={searchTitle} />
              </View>

            }
            <ScrollView
              style={{height: wh-Util.px2dp(98), backgroundColor: '#fff'}}
              onScroll={this._onScroll}
              onMomentumScrollEnd = {this._onReachEnd}
              refreshControl = {
                <RefreshControl
                  refreshing={refreshing ? true : false}
                  onRefresh={this._onRefresh}
                  />
              }
              >
              {/*头部背景*/}
              <View style={styles.headerBg}>
                <Image source={require('../resource/images/main-bg.png')} style={{width: '100%'}}/>
              </View>

              <View style={{height: Util.px2dp(360)}}>
                {
                  // 头部
                  scrollH < Util.px2dp(200) &&
                  <HomeHeader
                    title1={title1}
                    title2={title2}
                    height={Util.px2dp(360)} />
                }
              </View>


              <View
                style={contentWrapStyle ? contentWrapStyle : {
                  backgroundColor: '#eee',
                  borderTopLeftRadius: Util.px2dp(22),
                  borderTopRightRadius: Util.px2dp(22)
                }}>
                { this.props.children }
              </View>
            </ScrollView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  headerBg: {
      backgroundColor: '#9bb7d5',
      position: 'absolute',
      width: '100%',
      minHeight: '100%',
      overflow: 'hidden',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Util.px2dp(165),
    zIndex: 999
  }
});
