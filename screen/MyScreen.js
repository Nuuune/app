import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, Dimensions, AsyncStorage, CameraRoll } from 'react-native';
import Util from '../Util';
import HomeFrame from '../component/HomeFrame';
import Service from '../api/Service';
import { OssUpload } from '../api/ossUpload';
import ImagePicker from 'react-native-image-picker';

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
              }
            ],
            userInfo: null
        };
    }

    componentDidMount() {
      Service.getUserInfo().then(userInfo => {
        this.setState({userInfo});
      })
    }

    _logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    _upLoadPhoto = () => {
      ImagePicker.showImagePicker({
        title: '选择头像',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '相册',
        cancelButtonTitle: '取消',
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true
        }
      }, (res) => {
        console.log('Response = ', res);
      })
    }

    render() {
        return (
          <HomeFrame
            title1="蓝灯HR"
            title2="我的"
            >
            {/*简介*/}
            {this.state.userInfo && (
            <View style={[styles.contain, {
              paddingTop: Util.px2dp(22),
              borderTopLeftRadius: Util.px2dp(22),
              borderTopRightRadius: Util.px2dp(22),
              borderBottomWidth: Util.px2dp(1),
              borderBottomColor: '#deddde',
              marginBottom: Util.px2dp(16),
              height: Util.px2dp(327)
            }]}>
              <View style={[styles.items1]}>
                <View style={styles.avatarWrap}>
                  <TouchableOpacity onPress={this._upLoadPhoto}>
                  {
                    this.state.userInfo.avatar ?
                    <Image source={{uri: this.state.userInfo.avatar}} style={{  width: Util.px2dp(116), height: Util.px2dp(116), borderRadius: Util.px2dp(58)}}></Image>
                    : <Text style={styles.avaterText}>{this.state.userInfo.name[0]}</Text>
                  }
                  </TouchableOpacity>

                </View>
                <View style={styles.nameWrap}>
                    <Text style={styles.name}>{this.state.userInfo.name}</Text>
                  <View>
                      <Text style={[styles.des, { marginBottom: Util.px2dp(10) }]}>{this.state.userInfo.dept.name}-{this.state.userInfo.roles[0].name}</Text>
                    <Text style={styles.des}>{this.state.userInfo.workPlace}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.items1]}>
                <View style={[styles.tmWrap, {borderRightWidth: Util.px2dp(1), borderRightColor: '#c5c3c6'}]}>
                    <Text style={styles.tmText}>{this.state.userInfo.mobile}</Text>
                  <Image style={styles.tmIcon} source={require('../resource/images/phone.png')} />
                </View>
                <View style={styles.tmWrap}>
                    <Text style={styles.tmText}>{this.state.userInfo.email}</Text>
                  <Image style={styles.tmIcon} source={require('../resource/images/mail.png')} />
                </View>
              </View>
            </View>)}
            {/*相关操作按钮块*/}
            <View
              style={[styles.contain]}>
              <TouchableOpacity onPress={this._logout} style={[styles.items1, styles.oBtnWrap]}>
                <Image style={styles.oBtnIcon} source={require('../resource/images/shutdown.png')} />
                <Text style={styles.oBtnText}>退出登录</Text>
              </TouchableOpacity>
            </View>
          </HomeFrame>
        );
    }
}

const styles = StyleSheet.create({
  oBtnText: {
    flex:1,
    fontSize: Util.px2dp(32),
    lineHeight: Util.px2dp(32),
    marginLeft: Util.px2dp(54),
    textAlignVertical: 'bottom'
  },
  oBtnIcon: {
    width: Util.px2dp(32),
    height: Util.px2dp(32)
  },
  oBtnWrap: {
    height: Util.px2dp(110)
  },
  tmIcon: {
    marginTop: Util.px2dp(18),
    width: Util.px2dp(22),
    height: Util.px2dp(22)
  },
  tmText: {
    fontSize: Util.px2dp(28)
  },
  tmWrap: {
    flex:1, alignItems: 'center'
  },
  name: {
    fontSize: Util.px2dp(28)
  },
  des: {
    fontSize: Util.px2dp(22),
    color: '#969696'
  },
  nameWrap: {
    flex: 1,
    marginLeft: Util.px2dp(55),
    justifyContent: 'space-between',
    height: Util.px2dp(116)
  },
  avatarWrap: {
    width: Util.px2dp(116),
    height: Util.px2dp(116),
    borderRadius: Util.px2dp(58),
    backgroundColor: '#0099fc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avaterText: {
    fontSize: Util.px2dp(44),
    lineHeight: Util.px2dp(44),
    color: '#fff'
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
  }
});
