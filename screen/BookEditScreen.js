import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions, findNodeHandle,
  UIManager,
  Keyboard,
  StatusBar
} from 'react-native';
import Util from '../Util';
import HomeHeader from '../component/HomeHeader';
import commonStyles from '../resource/style';
import MySearchBar from '../component/SearchBar';
// ejected need change import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';

const wh = Dimensions.get('window').height;
const MY_SCROLLH = wh - Util.px2dp(128 + 118); // 屏幕高减去标题及底部按钮高
const statusH = StatusBar.currentHeight;

export default class BookEditScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: `信息修改`,
        headerStyle: {
           backgroundColor:'white',
           height: Util.px2dp(128),
           paddingTop: statusH,
           elevation: 0
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
            <TouchableOpacity onPress={() => {navigation.pop()}}>
                <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
                    <Text style={{color: "#0099fc", fontSize: Util.px2dp(32)}}>取消</Text>
                </View>
            </TouchableOpacity>
        )
      }
    };

    constructor(props) {
        super(props);
        this.state = {
          txtConpany: '上海蓝灯数据科技股份有限公司',
          txtName: '王一帆',
          txtWrokStatus: '今日未排班',
          txtConpanyEmail: 'yifan.wang@linker.com',
          txtDepartment: '开发部',
          txtPosition: '开发经理',
          myScrollH: MY_SCROLLH
        };
        this.MyScroll;
        this.py = null; // 当前txtInput的位置
    }

    componentDidMount() {
      this.props.navigation._screen = this;
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
      this.props.navigation._screen = null;
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (e) => {
      console.log(e);
      this.setState({
        myScrollH:  wh - (e.endCoordinates.height) - Util.px2dp(128 + 118)
      }, () => {
        this.py > this.state.myScrollH && this.MyScroll.scrollTo({y: this.py, x: 0});
      })
    }

    _keyboardDidHide = () => {
      this.setState({
        myScrollH: MY_SCROLLH
      }, () => {
        this.MyScroll.scrollTo({y: 0, x: 0});
      })
    }


    _onFocus = (e) => {
      // 获取当前txtInput的位置
      const ti = findNodeHandle(e.target);
      UIManager.measure(ti, (x, y, w, h, px, py) => {
        this.py = py;
      })
    }

    render() {
        const { txtConpany, txtName,
                txtWrokStatus, txtConpanyEmail,
                txtDepartment, txtPosition, myScrollH} = this.state;

        return (
          <View style={{flex: 1}}>
            <ScrollView style={{
              marginTop: Util.px2dp(4),
              paddingHorizontal: Util.px2dp(42),
              paddingBottom: Util.px2dp(118),
              backgroundColor: '#fff',
              height: myScrollH,
              flexGrow: 0
            }}
            ref={(ref) => { this.MyScroll = ref; }}
            contentContainerStyle= {{
              alignItems: 'stretch'
            }}
            >

              {/* 表单开始 */}
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>公司名称</Text>
                <TextInput onFocus={this._onFocus}  defaultValue={txtConpany} underlineColorAndroid='transparent' style={styles.detailTxt} />
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>姓名</Text>
                <TextInput onFocus={this._onFocus}  defaultValue={txtName} underlineColorAndroid='transparent' style={styles.detailTxt} />
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>工作状态</Text>
                <TextInput onFocus={this._onFocus}  defaultValue={txtWrokStatus} underlineColorAndroid='transparent' style={styles.detailTxt} />
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>企业邮箱</Text>
                <TextInput onFocus={this._onFocus}  defaultValue={txtConpanyEmail} underlineColorAndroid='transparent' style={styles.detailTxt} />
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>部门</Text>
                <TextInput onFocus={this._onFocus}  defaultValue={txtDepartment} underlineColorAndroid='transparent' style={styles.detailTxt} />
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>职位</Text>
                <TextInput onFocus={this._onFocus} defaultValue={txtPosition} underlineColorAndroid='transparent' style={styles.detailTxt} />
              </View>
              {/* 表单结束 */}
            </ScrollView>
            <View style={{
              height: Util.px2dp(118),
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              alignItems: 'stretch',
              justifyContent: 'center',
              paddingHorizontal: Util.px2dp(47)
            }}>
              <View style={{
                backgroundColor: '#3296fa',
                height: Util.px2dp(70),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Util.px2dp(6)
              }}>
                <Text style={{
                  fontSize: Util.px2dp(30),
                  lineHeight: Util.px2dp(30),
                  color: '#fff'
                }}>保存</Text>
              </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  detaiBox: {
    height: Util.px2dp(130),
    paddingTop: Util.px2dp(48),
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottomWidth: Util.px2dp(1),
    borderBottomColor: '#f5f5f5'
  },
  detailDes: {
    fontSize: Util.px2dp(24),
    color: '#a4a6a9'
  },
  detailTxt: {
    fontSize: Util.px2dp(28),
    paddingVertical: 0,
    textAlign: 'left',
    paddingLeft: 0
  }
});
