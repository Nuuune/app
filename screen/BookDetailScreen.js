import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import Util from '../Util';
import HomeHeader from '../component/HomeHeader';
import commonStyles from '../resource/style';
import MySearchBar from '../component/SearchBar';
// ejected need change import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';

const wh = Dimensions.get('window').height;
const statusH = StatusBar.currentHeight;

export default class BookDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: null,
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
            <TouchableOpacity onPress={() => {navigation.navigate('BookEdit')}}>
                <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
                    <FIcon name="edit" size={Util.px2dp(36)} color="#0099fc" />
                </View>
            </TouchableOpacity>
        )
      }
    };

    constructor(props) {
        super(props);
        this.state = {
          person: {
            name: `王一帆`,
            department: `开发部`,
            position: `开发经理`,
            company: `上海蓝灯数据科技股份有限公司`,
            workStatus: `今日未排班`,
            companyEmail: `yifan.wang@linker.com`
          }
        };
    }

    componentDidMount() {
      this.props.navigation._screen = this;
    }

    componentWillUnmount() {
      this.props.navigation._screen = null;
    }


    _onScroll = (e) => {
      const y = e.nativeEvent.contentOffset.y;
      this.setState({scrollH: y})
    }



    render() {
        const { person } = this.state;

        return (
          <View style={{flex: 1}}>
            <ScrollView style={{
              marginTop: Util.px2dp(4),
              paddingHorizontal: Util.px2dp(42),
              paddingBottom: Util.px2dp(118),
              backgroundColor: '#fff',
              flex: 1
            }}
            contentContainerStyle= {{
              alignItems: 'stretch'
            }}
            >
              {/* 名片开始 */}
              <View style={{
                marginVertical: Util.px2dp(50),
                marginHorizontal: Util.px2dp(20),
                paddingTop: Util.px2dp(30),
                paddingRight: Util.px2dp(52),
                paddingLeft: Util.px2dp(40),
                borderColor: '#eee',
                borderRadius: Util.px2dp(10),
                elevation: 2,
                height: Util.px2dp(265),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <View style={{
                  width: Util.px2dp(92),
                  height: Util.px2dp(92),
                  borderRadius: Util.px2dp(46),
                  backgroundColor: "#3296fa",
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    fontSize: Util.px2dp(35),
                    lineHeight: Util.px2dp(35),
                    color: '#fff'
                  }}>{person.name[0]}</Text>
                </View>
                <View style={{
                  flex: 1
                }}>
                  <Text style={{
                    textAlign: 'right',
                    fontSize: Util.px2dp(35),
                    marginBottom: Util.px2dp(12)
                  }}>{person.name}</Text>
                  <Text style={{
                    textAlign: 'right',
                    fontSize: Util.px2dp(24),
                    color: '#969696'
                  }}>{person.department}-{person.position}</Text>
                  <Text style={{
                    textAlign: 'right',
                    fontSize: Util.px2dp(24),
                    color: '#969696'
                  }}>{person.company}</Text>
                </View>
              </View>
              {/* 名片结束 */}
              {/* 细节开始 */}
              <View style={{marginVertical: Util.px2dp(26)}}>
                <Text style={{fontSize: Util.px2dp(30)}}>{person.company}</Text>
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>姓名</Text>
                <Text style={styles.detailTxt}>{person.name}</Text>
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>工作状态</Text>
                <Text style={styles.detailTxt}>{person.workStatus}</Text>
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>企业邮箱</Text>
                <Text style={styles.detailTxt}>{person.companyEmail}</Text>
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>部门</Text>
                <Text style={styles.detailTxt}>{person.department}</Text>
              </View>
              <View style={styles.detaiBox}>
                <Text style={styles.detailDes}>职位</Text>
                <Text style={styles.detailTxt}>{person.position}</Text>
              </View>
              {/* 细节结束 */}
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
                }}>发消息</Text>
              </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  detaiBox: {
    height: Util.px2dp(130),
    alignItems: 'stretch',
    justifyContent: 'center',
    borderBottomWidth: Util.px2dp(1),
    borderBottomColor: '#f5f5f5'
  },
  detailDes: {
    fontSize: Util.px2dp(24),
    color: '#bcbec0'
  },
  detailTxt: {
    fontSize: Util.px2dp(28)
  }
});
