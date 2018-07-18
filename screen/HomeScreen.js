import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import AppTabBar from '../component/AppTabBar';
import Util from '../Util';
import Service from '../api/Service';
import SettingsScreen from './SettingsScreen';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import ChatScreen from './ChatScreen';
import BookScreen from '../screen/BookScreen';
import MAppScreen from '../screen/MAppScreen';
import MyScreen from '../screen/MyScreen';
import { BASE_TEXT } from 'react-native-dotenv';
import NavBarSearch from '../component/NavBarSearch';
import MAppBoxScreen from './MAppBoxScreen';
import CameraScreen from './CameraScreen';
import Screen from './Screen';
import ArticleScreen from './ArticleScreen';
import BookIndexScreen from './BookIndexScreen';
import BookEditScreen from './BookEditScreen';
import BookDetailScreen from './BookDetailScreen';
import IMScreen from './IMScreen';


const TabNavigator = createBottomTabNavigator({
    Chat: createStackNavigator({ChatScreen}, {
      navigationOptions: {
          header: null
      }
    }),
    Book: createStackNavigator({ BookScreen }, {
      navigationOptions: {
          header: null
      }
    }),
    MApp: createStackNavigator({ MAppScreen }, {
      navigationOptions: {
          header: null
      }
    }),
    My: createStackNavigator({ MyScreen }, {
        navigationOptions: {
            header: null
        }
    }),
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            if (routeName === 'Chat') {
                return focused ?
                    <Image style={styles.tabIcon} source={require("../resource/images/icon-chat-selected.png")} /> :
                    <Image style={styles.tabIcon} source={require("../resource/images/icon-chat.png")} />;
            } else if (routeName === 'Book') {
                return focused ?
                    <Image style={styles.tabIcon} source={require("../resource/images/icon-book-selected.png")} /> :
                    <Image style={styles.tabIcon} source={require("../resource/images/icon-book.png")} />;
            } else if (routeName === 'MApp') {
                return focused ?
                    <Image style={styles.tabIcon} source={require("../resource/images/icon-mapp-selected.png")} /> :
                    <Image style={styles.tabIcon} source={require("../resource/images/icon-mapp.png")} />;
            } else if (routeName === 'My') {
                return focused ?
                    <Image style={styles.tabIcon} source={require("../resource/images/icon-user-selected.png")} /> :
                    <Image style={styles.tabIcon} source={require("../resource/images/icon-user.png")} />;
            } else {
                return null;
            }
        },
        tabBarLabel: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let text = '';
            if (routeName === 'Chat') {
                text = '消息';
            } else if (routeName === 'Book') {
                text = '通讯录';
            } else if (routeName === 'MApp') {
                text = '应用';
            } else if (routeName === 'My') {
                text = '我的';
            }

            return (<View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: Util.px2dp(22), color: tintColor}}>{text}</Text>
            </View>);
        },
    }),
    tabBarOptions: {
        activeTintColor: '#0099fc',
        inactiveTintColor: '#7A7A7A',
        inactiveBackgroundColor: 'white',
        activeBackgroundColor: 'white',
        style: {
            height: Util.px2dp(98),
            paddingVertical: Util.px2dp(5),
        }
    },
});

const navigationOptions = {
    headerStyle: {
        backgroundColor: '#102C4B',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'normal',
        fontSize: Util.px2dp(36)
    },
}

const HomeStack = createStackNavigator({
    Tabs: TabNavigator,

    Pages1: createStackNavigator({
        MAppBox: MAppBoxScreen,
        Camera: CameraScreen
    }, {navigationOptions}),
    Pages2: createStackNavigator({
        Article: ArticleScreen,
    }, { navigationOptions }),
    Pages3: createStackNavigator({
        Settings: SettingsScreen,
    }, { navigationOptions }),
    Pages4: createStackNavigator({
        BookIndex: BookIndexScreen,
        BookDetail: BookDetailScreen,
        BookEdit: BookEditScreen
    }),
    pages5: createStackNavigator({
      IM: IMScreen
    })
}, {
    navigationOptions: {
        header: (<StatusBar backgroundColor="transparent" translucent={true} />),
    }
});

export default HomeStack;

const styles = StyleSheet.create({
    tabIcon: {
        width: Util.px2dp(50),
        height: Util.px2dp(50),
    },
});
