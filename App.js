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

  componentWillMount() {
    // if (Platform.OS === 'android' && !Constants.isDevice) {
    //   this.setState({
    //     errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //   });
    // } else {
    //   this._getLocationAsync();
    // }
  }

  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   console.log(location);
  // };

  componentDidMount() {
    // Service.login().then(data => {
    //   Service.getCorpList().then(corps => {
    //     Service.selectCorp("1");
    //     Service.getUserInfo().then(userInfo => {
    //       this.setState({user: userInfo});
    //       console.log(userInfo);
    //     });
    //   })
    // })
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <RootStack />
      </Store.Provider>
    );
  }
}
