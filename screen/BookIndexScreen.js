import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList } from 'react-native';
import Util from '../Util';
import Service from '../api/Service';
import { fmt_depatment } from '../dataFmt';
import SearchFrame from '../component/SearchFrame';
import { Sline } from '../component/Line';
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
        this.mySearchBar;
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
      this.mySearchBar.toggleSearchBar();
    }

    _onScroll = (e) => {
      const y = e.nativeEvent.contentOffset.y;
      this.setState({scrollH: y})
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

    // 包含分类列表的头部
    renderHeader = (state) => {
      const { currIndex, cateList } = this.state;

      return (
        <View style={{
          marginTop: Util.px2dp(14),
          backgroundColor: '#fff'
        }}>
          { // 分类折叠联系人模块
            cateList.map((item, index) =>
            <View
              key={item.id}
              style={{
                alignItems: 'stretch',
                borderBottomWidth: Util.px2dp(1),
                borderBottomColor: '#f3f3f3',
                paddingHorizontal: Util.px2dp(42)
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

          <Sline height={Util.px2dp(14)} />

          <View style={[styles.listHeader, {paddingHorizontal: Util.px2dp(42)}]}>
            <Text style={styles.listHeaderText}>{this.props.navigation.state.params.cate === 1 ? `企业` : ``}常用联系人</Text>
          </View>

        </View>
      )

    };

    // 常用联系人渲染
    renderItem =  ({item: iitem, index: iindex }) => (
      <TouchableOpacity onPress={() => {this._toPersonDetail(iitem.key)}} style={ iindex > 0 ? [styles.listHeader, styles.contactH, {borderTopWidth: Util.px2dp(1), borderTopColor: '#f3f3f3'}] : [styles.listHeader, styles.contactH]}>
        { // 头像处理
          iitem.avatar ? <Image style={styles.avatar}></Image>
          :<View style={[styles.avatar, {backgroundColor: '#52c5cc'}]}>
            <Text style={styles.avatarText}>{iitem.name[0]}</Text>
          </View>
        }
        <View style={[{flex: 1, marginLeft: Util.px2dp(30)}]}>
          <Text style={[{fontSize: Util.px2dp(30)}]}>{iitem.name}</Text>
        </View>
      </TouchableOpacity>
    )


    render() {
        const { cateList, currIndex, normalList } = this.state;

        return (
          <SearchFrame
            ref={(ref) => this.mySearchBar = ref}>
            <FlatList
              style={{
                flex: 1
              }}
              ListHeaderComponent={this.renderHeader(this.state)}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `n-${item.key}`}
              data={normalList}
              />
          </SearchFrame>
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
    height: Util.px2dp(110),
    paddingHorizontal: Util.px2dp(42),
    backgroundColor: '#fff'
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
