import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Util from '../Util';
import HomeFrame from '../component/HomeFrame';
import Service from '../api/Service';

import FIcon from 'react-native-vector-icons/Feather';

const wh = Dimensions.get('window').height;

export default class BookScreen extends React.Component {
    static navigationOptions = {
        title: '通讯录',
    };

    constructor(props) {
        super(props);
        this.pageNo = 0;
        this.state = {
            data: [],
            contactList: [
              {
                key: 1,
                name: '张清芳'
              },
              {
                key: 13,
                name: '张清芳'
              },
              {
                key: 12,
                name: '张清芳'
              },
              {
                key: 11,
                name: '张清芳'
              },
              {
                key: 51,
                name: '张清芳'
              },
              {
                key: 21,
                name: '张清芳'
              }
            ],
            isFetching: true
        };
    }

    componentDidMount() {
      Service.getUserBook().then(resp => {
        this.pageNo += 1;
        this.setState({contactList: resp.data, isFetching: false});
      });
    }

    // 这里写上拉加载逻辑
    reachEnd = () => {
      if(!this.lastPage && !this.state.isFetching) {
        this.setState({isFetching: true});
        Service.getUserBook({pageNo: this.pageNo}).then(resp => {
          this.pageNo +=1;
          if(resp.data.length < 15) {
            this.lastPage = true;
          }
          this.setState({contactList: this.state.contactList.concat(resp.data), isFetching: false});
        })
      }
      console.log(`到底了`);
    }

    _onPress = (id) => {
      switch (id) {
        case 1:
          this.props.navigation.navigate('BookIndex', {cate: 1})
          break;
        case 2:
          this.props.navigation.navigate('BookIndex', {cate: 2})
          break;
        default: ;
      }
    }

    render() {
        const { contactList, isFetching } = this.state;
        return (
          <HomeFrame
            title1="蓝灯HR"
            title2="通讯录"
            onReachEnd={this.reachEnd}>
            {/*分类*/}
            <View style={[styles.contain, {
              paddingTop: Util.px2dp(21),
              borderTopLeftRadius: Util.px2dp(21),
              borderTopRightRadius: Util.px2dp(21),
              borderBottomWidth: Util.px2dp(1),
              borderBottomColor: '#deddde',
              marginBottom: Util.px2dp(16),
              height: Util.px2dp(271)
            }]}>
              <View style={[styles.items1]}>
                <Text style={styles.h1}>上海蓝灯数据科技股份有限公司</Text>
              </View>
              <TouchableOpacity onPress={() => this._onPress(1)} style={[styles.items1, {borderBottomWidth: Util.px2dp(1), borderBottomColor: '#f3f3f3'}]}>
                <View style={styles.cateIcon}></View>
                <View style={styles.items1}>
                  <Text style={[{fontSize: Util.px2dp(28)}]}>组织架构</Text>
                </View>
                <View style={styles.arrowR}>
                  <FIcon name="chevron-right" size={Util.px2dp(25)} color="#838383" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onPress(2)} style={[styles.items1]}>
                <View style={styles.cateIcon}></View>
                <View style={styles.items1}>
                  <Text style={[{fontSize: Util.px2dp(28)}]}>外部联系人</Text>
                </View>
                <View style={styles.arrowR}>
                  <FIcon name="chevron-right" size={Util.px2dp(25)} color="#838383" />
                </View>
              </TouchableOpacity>
            </View>
            {/*常见联系人列表*/}
            <View
            style={[styles.contain]}
            >
              <View style={[styles.items1, styles.contactH]}>
                <Text style={styles.h1}>常用联系人</Text>
              </View>

              {
                contactList.map((item, index) => (
                  <View key={index} style={ index > 0 ? [styles.items1, styles.contactH, {borderTopWidth: Util.px2dp(1), borderTopColor: '#f3f3f3'}] : [styles.items1, styles.contactH]}>
                    { // 头像处理
                      item.avatar ? <Image style={styles.avatar}></Image>
                      :<View style={[styles.avatar, {backgroundColor: '#52c5cc'}]}>
                        <Text style={styles.avatarText}>{item.name[0]}</Text>
                      </View>
                    }
                    <View style={[styles.items1, {marginLeft: Util.px2dp(30)}]}>
                      <Text style={[{fontSize: Util.px2dp(30)}]}>{item.name}</Text>
                    </View>
                  </View>
                ))
              }
              <View style={{height: Util.px2dp(50)}}>
                {
                  isFetching &&
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[{fontSize: Util.px2dp(24)}]}>加载中...</Text>
                  </View>
                }
                {
                  !isFetching && this.lastPage &&
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[{fontSize: Util.px2dp(24)}]}>没有更多了</Text>
                  </View>
                }
              </View>
            </View>
          </HomeFrame>
        );
    }
}

const styles = StyleSheet.create({
  contactH: {
    height: Util.px2dp(110)
  },
  avatar: {
    marginHorizontal: Util.px2dp(4),
    width: Util.px2dp(70),
    height: Util.px2dp(70),
    borderRadius: Util.px2dp(35),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    fontSize: Util.px2dp(30),
    color: '#fff'
  },
  cateIcon: {
    width: Util.px2dp(32),
    height: Util.px2dp(32),
    marginHorizontal: Util.px2dp(22),
    backgroundColor: '#80de74'
  },
  arrowR: {
    width: Util.px2dp(25),
    height: Util.px2dp(25)
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
    paddingHorizontal: Util.px2dp(42),
  },
  h1: {
    color: '#000',
    fontSize: Util.px2dp(30),
    lineHeight: Util.px2dp(32),
    height: Util.px2dp(32)
  }
});
