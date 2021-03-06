import React from 'react';
import { GiftedChat, Composer, InputToolbar } from 'react-native-gifted-chat';
import {
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Keyboard
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid';

import Emoticons from 'react-native-emoticons';

import FIcon from 'react-native-vector-icons/Feather';
import Util from '../Util';

const statusH = StatusBar.currentHeight;

export default class IMScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {

    const person = navigation.state.params.person;

    return {
      headerTitle: person.name,
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
      messages: [],
      keyborderH: 0,
      toolBoxShow: false,
      isLoading: false,
      showEmoticons: false
    };
    this.myChat;
    this.myToolbar;
    this.loadEarlier = this.loadEarlier.bind(this);
    this.togTools = this.togTools.bind(this);
    this.onSend = this.onSend.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._genMessage = this._genMessage.bind(this);
    this.onToolsBtn = this.onToolsBtn.bind(this);
    this.togEmojiShow = this.togEmojiShow.bind(this);
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
    this.setState({
      keyborderH:  e.endCoordinates.height,
      toolBoxShow: false,
      showEmoticons: false
    })
  }

  _keyboardDidHide = () => {
    this.setState({
      keyborderH: 0
    })
  }


  componentWillMount() {
    const person = this.props.navigation.state.params.person;
    this.users = {
      me: {
        _id: 1
      }
    };
    this.setState({
      toolBoxShow: false,
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          }
        }
      ],
    })
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        ref={(ref) => this.myToolbar = ref}
        containerStyle={{
          width: '100%',
          paddingHorizontal: Util.px2dp(20),
          paddingVertical: Util.px2dp(18),
          backgroundColor: '#f6f6f6'
        }}
        />);
  }

  renderSend(props) {
    const {text, onSend, onToggleTool} = props;
    return (
      <View style={[styles.sendBox, {marginBottom: Util.px2dp(6)}]}>
        {
          text.trim().length > 0 ?
          <TouchableOpacity
            onPress={() => {
              onSend({ text: text.trim() }, true);

            }}
            accessibilityTraits="button"
          >
            <View><Text>发送</Text></View>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => {
              onToggleTool();
            }}
            style={styles.actionBtn}>
            <FIcon size={Util.px2dp(32)} name='plus' color='#7a7d81' />
          </TouchableOpacity>
        }
      </View>
    )

  }

  renderActions(props) {
    return (
      <TouchableOpacity onPress={() => {props.togEmojiShow()}} style={[styles.actionBtn, {marginBottom: Util.px2dp(6)}]}>
        <FIcon size={Util.px2dp(32)} name='plus' color='#7a7d81' />
      </TouchableOpacity>
    );
  }

  renderComposer(props) {
    return (
      <Composer
        {...props}
        textInputStyle={styles.inputStyle}
        composerHeight={Util.px2dp(56)}
        textInputAutoFocus={false}
        textInputProps={
          {
            onContentSizeChange: () => false
          }
        } />
    )
  }

  onSend(messages) {
    console.log('发送消息');
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  onToolsBtn(type) {
    const options = {
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    }

    if (type) {
      // Launch Camera:
      ImagePicker.launchCamera(options, (response)  => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          this.imgSend(response.uri);
        }
      });
    } else {
      // Open Image Library:
      ImagePicker.launchImageLibrary(options, (response)  => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          this.imgSend(response.uri);
        }
      });
    }

  }

  imgSend(uri) {
    console.log('发送图片');
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, this._genMessage({
        user: this.users.me,
        img: uri
      }))
    }))
  }

  _genMessage(option = {}) {
    const { user, text, img } = option;
    if ( !user ) return ;
    if ( text || img ) {
      return {
        _id: uuid.v4(),
        text: text ? text : '',
        image: img ? img : '',
        createdAt: new Date(),
        user
      }
    }
  }

  togTools() {
    const {toolBoxShow} = this.state;
    if (toolBoxShow) {
      this.setState({
        toolBoxShow: false
      });
    } else {
      this.setState({
        toolBoxShow: true
      }, () => Keyboard.dismiss());
    }
  }

  togEmojiShow() {
    const {showEmoticons} = this.state;
    if (showEmoticons) {
      this.setState({
        showEmoticons: false
      });
    } else {
      this.setState({
        showEmoticons: true
      }, () => Keyboard.dismiss());
    }
  }

  loadEarlier() {
    console.log('获取历史记录')
  }

  _onEmoticonPress(emojiO) {
    console.log(`emojiO:-------`);
    console.log(emojiO);
  }

  _onBackspacePress() {
    console.log(`emojiBack`);
  }

  render() {
    const {toolBoxShow, isLoading, showEmoticons} = this.state;
    console.log(showEmoticons);
    return (
      <View style={{flex: 1}}>
        <GiftedChat
          ref={(ref) => this.myChat = ref}
          placeholder=""
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          onToggleTool={() => this.togTools()}
          togEmojiShow={() => this.togEmojiShow()}
          user={{
            _id: 1
          }}
          loadEarlier={!isLoading}
          onLoadEarlier={() => {this.loadEarlier()}}
          isLoadingEarlier={isLoading}
          renderInputToolbar={this.renderInputToolbar}
          renderActions={this.renderActions}
          renderSend={this.renderSend}
          renderComposer={this.renderComposer}
        />
        {
          showEmoticons &&
          <View
            style={{position: 'relative', height: 300}}>
            <Emoticons
             onEmoticonPress={this._onEmoticonPress.bind(this)}
             onBackspacePress={this._onBackspacePress.bind(this)}
             show={true}
             concise={true}
             showHistoryBar={true}
             showPlusBar={false}
            />
          </View>
        }
        {
          toolBoxShow &&
          <View style={styles.toolBox}>
            <TouchableOpacity onPress={() => {this.onToolsBtn(0)}} style={styles.toolBtn}>
              <View style={styles.toolBtnIcon}>
                <FIcon size={Util.px2dp(60)} name='image' color='#7a7d81' />
              </View>
              <Text style={styles.toolBtnText}>相册</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.onToolsBtn(1)}} style={styles.toolBtn}>
              <View style={styles.toolBtnIcon}>
                <FIcon size={Util.px2dp(60)} name='instagram' color='#7a7d81' />
              </View>
              <Text style={styles.toolBtnText}>拍摄</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    toolBox: {
      width: '100%',
      height: Util.px2dp(250),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: Util.px2dp(1),
      borderColor: '#eeedee'
    },
    toolBtn: {
      width: Util.px2dp(108),
      height: Util.px2dp(150),
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: Util.px2dp(78)
    },
    toolBtnIcon: {
      width: Util.px2dp(106),
      height: Util.px2dp(106),
      borderRadius: Util.px2dp(8),
      borderWidth: Util.px2dp(1),
      borderColor: '#eeedee',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    toolBtnText: {
      textAlign: 'center',
      width: '100%',
      height: Util.px2dp(24),
      paddingVertical: 0,
      lineHeight: Util.px2dp(24),
      fontSize: Util.px2dp(24)
    },
    actionBtn: {
      width: Util.px2dp(54),
      height: Util.px2dp(54),
      borderRadius: Util.px2dp(27),
      borderColor: '#7a7d81',
      borderWidth: Util.px2dp(2),
      justifyContent: 'center',
      alignItems: 'center'
    },
    sendBox: {
      width: Util.px2dp(74),
      height: Util.px2dp(56),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    inputStyle: {
      backgroundColor: '#fff',
      borderRadius: Util.px2dp(10),
      marginHorizontal: Util.px2dp(20),
      marginVertical: 0,
      lineHeight: Util.px2dp(32),
      fontSize: Util.px2dp(32),
      paddingVertical: 0
    }
});
