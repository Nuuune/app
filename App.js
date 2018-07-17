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

  render() {
    return (
      <Store.Provider value={this.state}>
        <RootStack />
      </Store.Provider>
    );
  }
}
