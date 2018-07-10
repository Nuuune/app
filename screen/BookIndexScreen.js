import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import Util from '../Util';
import Service from '../api/Service';
import { fmt_depatment } from '../dataFmt';
import HomeHeader from '../component/HomeHeader';
import commonStyles from '../resource/style';
import MySearchBar from '../component/SearchBar';
// ejected need change import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';

const wh = Dimensions.get('window').height;
const statusH = StatusBar.currentHeight;

export default class BookIndexScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      let title;
      console.log(navigation);
      switch (navigation.state.params.cate) {
        case 1:
          title = `组织架构`;
          break;
        case 2:
          title = `外部联系人`;
          break;
        default: ;
      }
      return {
        headerTitle: title,
        headerStyle: {
           backgroundColor:'white',
           height: Util.px2dp(128),
           paddingTop: statusH,
           elevation: 0,
        },
        headerTitleStyle: {
           color:'#0099fc',
           fontWeight: 'normal',
           fontSize: Util.px2dp(32),
           alignSelf: 'center',
           textAlign: 'center'
        },
        headerLeft:( // 设置左边的标签
            <TouchableOpacity onPress={()=>{navigation.pop()}}>
                <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:15}}>
                    <FIcon name="chevron-left" size={Util.px2dp(36)} color="#0099fc" />
                </View>
            </TouchableOpacity>
        ),
        headerRight:( // 设置右边的标签
            <TouchableOpacity onPress={() => {navigation._screen._toggleSearchBar()}}>
                <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
                    <FIcon name="search" size={Util.px2dp(36)} color="#0099fc" />
                </View>
            </TouchableOpacity>
        )
      }
    };

    constructor(props) {
        super(props);
        this.state = {
          inputWords: '',
          searchShow: false,
          currIndex: null,
          cateList: [],
          normalList: [
            {
              key: 1,
              name: '王一帆'
            },
            {
              key: 2,
              name: '王一帆'
            },
            {
              key: 3,
              name: '王一帆'
            }
          ]
        };
    }

    componentWillMount() {
      Service.getDepartmentList().then(
        data => {
          console.log(fmt_depatment(data));
          this.setState({cateList: fmt_depatment(data)});
        }
      );
    }

    componentDidMount() {
      this.props.navigation._screen = this;
    }

    componentWillUnmount() {
      this.props.navigation._screen = null;
    }

    _toggleSearchBar = () => {
      this.setState({searchShow: !this.state.searchShow})
    }

    _onScroll = (e) => {
      const y = e.nativeEvent.contentOffset.y;
      this.setState({scrollH: y})
    }

    _onInputChange = (val) => {
      console.log(`输入: ${val}`);
      this.setState({inputWords: val});
    }

    _toggleCollapse = (index, total) => {
      const { currIndex, cateList } = this.state;
      if (index === currIndex) {
        this.setState({ currIndex: null });
      } else {
        const item = cateList[index];
        if (!item.requested) {
          Service.getDepartPList(item.id, total).then(data => {
            item.pList = data.data;
            item.requested = true;
            cateList[index] = item;
            this.setState({ currIndex: index, cateList});
          });
        } else {
          this.setState({ currIndex: index });
        }
      }
    }

    _toPersonDetail = (id) => {
      this.props.navigation.navigate('BookDetail');
    }

    render() {
        const { searchShow, cateList, currIndex, normalList } = this.state;

        return (
          <ScrollView style={{flex: 1}}>
            { // 搜索栏
              searchShow &&
              <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingLeft: Util.px2dp(16),
                paddingVertical: Util.px2dp(12)
              }}>
                <View style={{
                  flex: 1,
                  backgroundColor: '#f3f3f3',
                  paddingHorizontal: Util.px2dp(20),
                  borderRadius: Util.px2dp(10),
                  height: Util.px2dp(64)
                }}>
                  <TextInput
                    underlineColorAndroid='transparent'
                    onChangeText={this._onInputChange}
                    placeholder="搜索联系人"
                    style={{
                      textAlign: 'center'
                    }}
                    />
                </View>
                <View style={{
                  width: Util.px2dp(115),
                  height: Util.px2dp(60),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
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

            <View style={{
              marginTop: Util.px2dp(14),
              paddingHorizontal: Util.px2dp(42),
              backgroundColor: '#fff'
            }}>
              { // 分类折叠联系人模块
                cateList.map((item, index) =>
                <View
                  key={item.id}
                  style={{
                    alignItems: 'stretch',
                    borderBottomWidth: Util.px2dp(1),
                    borderBottomColor: '#f3f3f3'
                  }}>
                  <TouchableOpacity onPress={()=>{this._toggleCollapse(index, item.employeesNum)}} style={styles.listHeader}>
                    <Text style={styles.listHeaderText}>
                      {item.name}({item.employeesNum})
                    </Text>
                    <View>
                      {
                        index === currIndex ?
                        <FIcon name="chevron-down" size={Util.px2dp(25)} color="#838383" />
                        : <FIcon name="chevron-right" size={Util.px2dp(25)} color="#838383" />
                      }

                    </View>
                  </TouchableOpacity>
                  { // 联系人列表循环
                    index === currIndex &&
                    item.pList.map((iitem, iindex) =>
                    <TouchableOpacity onPress={() => {this._toPersonDetail(iitem.id)}} key={`${item.id}-${iitem.id}`} style={ iindex > 0 ? [styles.listHeader, styles.contactH, {borderTopWidth: Util.px2dp(1), borderTopColor: '#f3f3f3'}] : [styles.listHeader, styles.contactH]}>
                      { // 头像处理
                        iitem.avatar ? <Image style={styles.avatar}></Image>
                        :<View style={[styles.avatar, {backgroundColor: '#52c5cc'}]}>
                          <Text style={styles.avatarText}>{iitem.name[0]}</Text>
                        </View>
                      }
                      <View style={[{flex: 1, marginLeft: Util.px2dp(30)}]}>
                        <Text style={[{fontSize: Util.px2dp(30)}]}>{iitem.name}</Text>
                      </View>
                    </TouchableOpacity>)
                  }
                </View>
                )
              }
            </View>

            <View style={{
              marginTop: Util.px2dp(14),
              paddingHorizontal: Util.px2dp(42),
              backgroundColor: '#fff'
            }}>
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>{this.props.navigation.state.params.cate === 1 ? `企业` : ``}常用联系人</Text>
              </View>
              { // 联系人列表循环
                normalList.map((iitem, iindex) =>
                <TouchableOpacity onPress={() => {this._toPersonDetail(iitem.key)}} key={`n-${iitem.key}`} style={ iindex > 0 ? [styles.listHeader, styles.contactH, {borderTopWidth: Util.px2dp(1), borderTopColor: '#f3f3f3'}] : [styles.listHeader, styles.contactH]}>
                  { // 头像处理
                    iitem.avatar ? <Image style={styles.avatar}></Image>
                    :<View style={[styles.avatar, {backgroundColor: '#52c5cc'}]}>
                      <Text style={styles.avatarText}>{iitem.name[0]}</Text>
                    </View>
                  }
                  <View style={[{flex: 1, marginLeft: Util.px2dp(30)}]}>
                    <Text style={[{fontSize: Util.px2dp(30)}]}>{iitem.name}</Text>
                  </View>
                </TouchableOpacity>)
              }
            </View>

          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Util.px2dp(90),
    alignItems: 'center'
  },
  listHeaderText: {
    flex: 1,
    fontSize: Util.px2dp(30)
  },
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
  }
});
