import React from 'react';
import { GiftedChat, InputToolbar, Composer } from 'react-native-gifted-chat';
import {
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Text
} from 'react-native';

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
      messages: []
    }

  }


  componentWillMount() {
    const person = this.props.navigation.state.params.person;
    this.users = {
      me: {
        _id: 1
      }
    }
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          width: '100%',
          paddingHorizontal: Util.px2dp(20),
          paddingVertical: Util.px2dp(18),
          backgroundColor: '#f6f6f6'
        }}
        />);
  }

  renderSend(props) {
    const {text, onSend} = props;
    return (
      <View style={[styles.sendBox, {marginBottom: Util.px2dp(6)}]}>
        <TouchableOpacity style={styles.actionBtn}>
          <FIcon size={Util.px2dp(32)} name='plus' color='#7a7d81' />
        </TouchableOpacity>
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
          <TouchableOpacity style={styles.actionBtn}>
            <FIcon size={Util.px2dp(32)} name='plus' color='#7a7d81' />
          </TouchableOpacity>
        }
      </View>
    )

  }

  renderActions(props) {
    return (
      <TouchableOpacity style={[styles.actionBtn, {marginBottom: Util.px2dp(6)}]}>
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
        textInputProps={
          {
            onContentSizeChange: () => false,
            onChange: () => false
          }
        } />
    )
  }


  render() {
    return (
      <GiftedChat
        placeholder=""
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={this.renderInputToolbar}
        renderActions={this.renderActions}
        renderSend={this.renderSend}
        renderComposer={this.renderComposer}
      />
    )
  }
}

const styles = StyleSheet.create({
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
      width: Util.px2dp(128),
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
