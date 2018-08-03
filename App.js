import React from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import AppTabBar from './component/AppTabBar';
import LoginPage from './page/LoginPage';
import Service from './api/Service';
import Store from './store';
import { createStackNavigator, createSwitchNavigator, AsyncStorage } from 'react-navigation';
import HomeScreen from './screen/HomeScreen';
import SignInScreen from './screen/SignInScreen';
import AuthLoadingScreen from './screen/AuthLoadingScreen';
import Util from './Util';

import JPushModule from 'jpush-react-native' // 极光推送服务

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: HomeScreen,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      updateUser: this.updateUser,
    };
  }

  updateUser = (user) => {
    this.setState({user});
  }

  receiveCustomMsgEvent = (map) => {
    this.setState({
      pushMsg: map.content
    })
    console.log('extras: ' + map.extras)
  };

  receiveNotificationEvent = (map) => {
    console.log('alertContent: ' + map.alertContent)
    console.log('extras: ' + map.extras)
    // var extra = JSON.parse(map.extras);
    // console.log(extra.key + ": " + extra.value);
  };

  openNotificationEvent = (map) => {
    console.log('Opening notification!')
    console.log('map.extra: ' + map.extras)
    // this.jumpSecondActivity()
    // JPushModule.jumpToPushActivity("SecondActivity");
  };


  componentDidMount () {
    if (Platform.OS === 'android') {
      JPushModule.initPush()
      JPushModule.getInfo(map => {
        this.setState({
          appkey: map.myAppKey,
          imei: map.myImei,
          package: map.myPackageName,
          deviceId: map.myDeviceId,
          version: map.myVersion
        }, () => console.log(this.state))
      })
      JPushModule.notifyJSDidLoad(resultCode => {
        if (resultCode === 0) {
        }
      })
    } else {
      JPushModule.setupPush()
    }

    JPushModule.addReceiveCustomMsgListener(this.receiveCustomMsgEvent)

    JPushModule.addReceiveNotificationListener(this.receiveNotificationEvent)

    JPushModule.addReceiveOpenNotificationListener(this.openNotificationEvent)


    JPushModule.getRegistrationID(registrationId => {
      console.log(`registrationId:${registrationId}`)
      Service.setDevice(registrationId)
    })

    // var notification = {
    //   buildId: 1,
    //   id: 5,
    //   title: 'jpush',
    //   content: 'This is a test!!!!',
    //   extra: {
    //     key1: 'value1',
    //     key2: 'value2'
    //   },
    //   fireTime: 2000
    // }
    // JPushModule.sendLocalNotification(notification)
  }

  componentWillUnmount () {
    JPushModule.removeReceiveCustomMsgListener(this.receiveCustomMsgEvent)
    JPushModule.removeReceiveNotificationListener(this.receiveNotificationEvent)
    JPushModule.removeReceiveOpenNotificationListener(this.openNotificationEvent)
    console.log('Will clear all notifications')
    JPushModule.clearAllNotifications()
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <RootStack />
      </Store.Provider>
    );
  }
}
