import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'

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
    const person = this.props.navigation
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

  render() {
    return (
      <GiftedChat
        placeholder=""
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}
