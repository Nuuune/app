import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import Util from '../Util';
import HomeFrame from '../component/HomeFrame';
import Service from '../api/Service';

const wh = Dimensions.get('window').height;

export default class BookScreen extends React.Component {
    static navigationOptions = {
        title: '通讯录',
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            contactList: [
              {
                key: 1,
                name: '张清芳'
              },
              {
                key: 2,
                name: '张清芳'
              },
              {
                key: 3,
                name: '张清芳'
              },
              {
                key: 4,
                name: '张清芳'
              },
              {
                key: 5,
                name: '张清芳'
              },
              {
                key: 6,
                name: '张清芳'
              },
              {
                key: 7,
                name: '张清芳'
              },
              {
                key: 8,
                name: '张清芳'
              },
            ],
            scrollH: 0,
            isAdmin: false,
            userInfo: null,
            microApps: [],
            refreshing: false,
        };
    }

    componentDidMount() {
      this._fetchData();
    }

    _fetchData() {
      let userInfo = {}, mApps = [];
      Promise.all([Service.getUserInfo().then(resp => {
        userInfo = resp;
      }), Service.getMicroAppList().then(resp => {
        if (resp.market) mApps = mApps.concat(resp.market);
        if (resp.self) mApps = mApps.concat(resp.self);
      })]).then(() => {
        console.log('mApps');
        console.log(mApps);
        this.setState({ userInfo: userInfo, microApps: mApps, refreshing: false });
      })
    }

    _onMApp = (item) => {
      this.props.navigation.navigate('MAppBox', {app: item});
    }

    render() {
        const { isAdmin } = this.state;

        return (
          <HomeFrame
            title1="蓝灯HR"
            title2="应用"
            contentWrapStyle= {{
              backgroundColor: '#fff',
              borderTopLeftRadius: Util.px2dp(22),
              borderTopRightRadius: Util.px2dp(22),
              minHeight: wh-Util.px2dp(128+98)
            }}
            >
            <View style={[styles.contain, {
              paddingTop: Util.px2dp(22),
              borderTopLeftRadius: Util.px2dp(22),
              borderTopRightRadius: Util.px2dp(22)
            }]}>
              {/*第一部分-打招呼*/}
              <View style={[styles.items1, {flexDirection: 'column', alignItems: 'stretch'}]}>
                <Text style={styles.helloText}>下午好，{this.state.userInfo && this.state.userInfo.name}</Text>
                {
                  isAdmin &&
                  <View style={[styles.appBtnWrap]}>
                    <View style={[styles.app, {marginLeft: 0}]}>
                      <Text style={styles.adminText}>0</Text>
                      <Text style={styles.appText}>考勤打卡</Text>
                    </View>
                    <View style={styles.app}>
                      <Text style={styles.adminText}>1</Text>
                      <Text style={styles.appText}>待我审批</Text>
                    </View>
                    <View style={styles.app}>
                      <Text style={styles.adminText}>0</Text>
                      <Text style={styles.appText}>签到人数</Text>
                    </View>
                    <View style={styles.app}>
                      <Text style={styles.adminText}>0</Text>
                      <Text style={styles.appText}>未读日志</Text>
                    </View>
                  </View>
                }
              </View>

              <View style={[styles.items1, styles.sline]}></View>

              {/*第二部分-微应用*/}
              <View style={[styles.items1, styles.appWrap]}>
                <Text style={[styles.h1]}>微应用</Text>
                <View style={[styles.appBtnWrap]}>
                {this.state.microApps.filter(item => item.active).map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => this._onMApp(item)} style={index % 4 === 0 ? [styles.app, { marginLeft: 0 }] : styles.app}>
                      <Image source={{uri: item.logo}} style={styles.appIcon} />
                      <Text style={styles.appText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
                </View>
              </View>

              <View style={[styles.items1, styles.sline]}></View>

              {/*第三部分-其他应用*/}
              <View style={[styles.items1, styles.appWrap]}>
                <Text style={[styles.h1]}>其他</Text>
                <View style={[styles.appBtnWrap]}>
                  <View style={[styles.app, {marginLeft: 0}]}>
                    <View style={styles.appIcon}></View>
                    <Text style={styles.appText}>考勤打卡</Text>
                  </View>
                </View>
              </View>


            </View>
          </HomeFrame>

        );
    }
}

const styles = StyleSheet.create({
  appText: {
    fontSize: Util.px2dp(24),
    lineHeight: Util.px2dp(26),
    height: Util.px2dp(26),
    color: '#000'
  },
  adminText: {
    width: Util.px2dp(90),
    height: Util.px2dp(90),
    borderRadius: Util.px2dp(10),
    marginBottom: Util.px2dp(18),
    backgroundColor: '#f6f6f6',
    lineHeight: Util.px2dp(90),
    fontSize: Util.px2dp(30),
    color: '#000',
    textAlign: 'center'
  },
  appIcon: {
    width: Util.px2dp(90),
    height: Util.px2dp(90),
    borderRadius: Util.px2dp(10),
    marginBottom: Util.px2dp(18),
  },
  app: {
    width: Util.px2dp(110),
    height: Util.px2dp(174),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Util.px2dp(74)
  },
  sline: {
    height: Util.px2dp(1),
    backgroundColor: '#e5e5e5',
    marginVertical: Util.px2dp(14)
  },
  appBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'wrap'
  },
  appWrap: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  helloText: {
    fontSize: Util.px2dp(22),
    lineHeight: Util.px2dp(22),
    color: '#d5d5d5'
  },
  items1: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contain: {
    backgroundColor: '#fff',
    paddingHorizontal: Util.px2dp(44),
  },
  h1: {
    color: '#000',
    fontSize: Util.px2dp(30),
    lineHeight: Util.px2dp(32),
    height: Util.px2dp(32),
    marginVertical: Util.px2dp(26)
  }
});
