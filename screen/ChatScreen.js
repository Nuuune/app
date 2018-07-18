import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Sline } from '../component/Line';
import Util from '../Util';
import HomeFrame from '../component/HomeFrame';

const wh = Dimensions.get('window').height;

export default class ChatScreen extends React.Component {
    static navigationOptions = {
        title: '消息',
    };

    constructor(props) {
        super(props);
        this.state = {
            messages: [
              {
                key: "1",
                title: '薪资',
                stitle: '薪',
                content: '￥10000',
                des: '6月薪资账单已出',
                time: '15:32',
                first: true
              },
              {
                key: "2",
                title: '考勤打卡',
                stitle: '勤',
                content: '下班打卡成功\t下午18:00:10',
                des: '上海市普陀区中江路889号曹杨商务大厦',
                time: '15:32'
              },
              {
                key: "3",
                title: '签到巡检',
                stitle: '签',
                content: '上海市普陀区中江路889号',
                des: '签到时间2018年06月26日 08:12:30',
                time: '15:32'
              },
              {
                key: "4",
                title: '签到巡检',
                stitle: '签',
                content: '上海市普陀区中江路889号',
                des: '签到时间2018年06月26日 08:12:30',
                time: '15:32'
              },
              {
                key: "12",
                title: '薪资',
                stitle: '薪',
                content: '￥10000',
                des: '6月薪资账单已出',
                time: '15:32'
              },
              {
                key: "22",
                title: '考勤打卡',
                stitle: '勤',
                content: '下班打卡成功\t下午18:00:10',
                des: '上海市普陀区中江路889号曹杨商务大厦',
                time: '15:32'
              },
              {
                key: "23",
                title: '签到巡检',
                stitle: '签',
                content: '上海市普陀区中江路889号',
                des: '签到时间2018年06月26日 08:12:30',
                time: '15:32'
              },
              {
                key: "34",
                title: '签到巡检',
                stitle: '签',
                content: '上海市普陀区中江路889号',
                des: '签到时间2018年06月26日 08:12:30',
                time: '15:32'
              }
            ],
            scrollH: 0
        };
    }

    _navigateArticle = ()=> {
        this.props.navigation.navigate('Article');
    }

    _pullToRefresh = (rctx) => {
        setTimeout(()=> rctx.onRefreshDone(), 3000);
    }

    getTag = (name) => {
      switch (name) {
        case '签':
          return require('../resource/images/tag3.png');
        case '薪':
          return require('../resource/images/tag1.png');
        case '勤':
          return require('../resource/images/tag2.png');
        default:
          return require('../resource/images/tag2.png');
      }
    }

    render() {
        return (
          <HomeFrame
            title1="蓝灯HR"
            title2="消息中心"
            searchTitle="消息"
            onRefresh={this._pullToRefresh}>
            {
              // 循环列表
              this.state.messages.map((item) =>
              <View key={item.key}>
                <View style={ item.first ? [styles.cardContainer, {borderTopLeftRadius: Util.px2dp(22),
                borderTopRightRadius: Util.px2dp(22)}] : styles.cardContainer}>
                    <View style={styles.cardTitle}>
                      <View style={styles.cardIcon}>
                        <Image source={this.getTag(item.stitle)} style={styles.cardIconImg}/>
                      </View>
                      <View style={styles.cardtt}>
                        <Text style={{fontSize: Util.px2dp(26), color: '#303030'}}>{item.title}</Text>
                        <Text style={{fontSize: Util.px2dp(18), color: '#cacaca'}}>{item.time}</Text>
                      </View>
                    </View>
                    <View style={styles.cardContent}>
                      <View>
                        <Text style={{fontSize: Util.px2dp(34), color: '#303030'}}>{item.content}</Text>
                      </View>
                      <View>
                        <Text style={{fontSize: Util.px2dp(26), color: '#cacaca'}}>{item.des}</Text>
                      </View>
                    </View>
                </View>
                <Sline height={Util.px2dp(14)} />
              </View>
              )
            }
          </HomeFrame>
        );
    }
}

const styles = StyleSheet.create({
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
    },
    card: {
        flexDirection: 'row',
        height: Util.px2dp(156),
        paddingHorizontal: Util.px2dp(10),
        paddingVertical: Util.px2dp(32),
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: StyleSheet.hairlineWidth * 2
    },
    cardContainer: {
        backgroundColor: 'white',
        borderBottomWidth: Util.px2dp(1),
        borderBottomColor: '#deddde'
    },
    cardTitle: {
      flexDirection: 'row',
      height: Util.px2dp(94),
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    cardIcon: {
      flex: 0,
      width: Util.px2dp(88),
      height: Util.px2dp(46),
      position: 'relative'
    },
    cardIconImg: {
      position: 'absolute',
      width: Util.px2dp(43),
      height: Util.px2dp(46),
      left: Util.px2dp(45)
    },
    cardIconFont: {
      width: Util.px2dp(43),
      textAlign: 'center',
      height: Util.px2dp(46),
      lineHeight: Util.px2dp(46),
      color: '#fff',
      fontSize: Util.px2dp(24),
      marginLeft: Util.px2dp(45)
    },
    cardtt: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Util.px2dp(24)
    },
    cardContent: {
      height: Util.px2dp(80),
      paddingLeft: Util.px2dp(112),
      marginBottom: Util.px2dp(35),
    },
    headerBg: {
        backgroundColor: '#9bb7d5',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});
