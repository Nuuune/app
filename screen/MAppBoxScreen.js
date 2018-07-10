import React from 'react';
import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, WebView } from 'react-native';
import Util from '../Util';
import Screen from './Screen';
import Service from '../api/Service';
import { ActionSheet, Button, ActivityIndicator } from 'antd-mobile-rn';

// ejected need change import Icon from 'react-native-vector-icons/FontAwesome';
import FIcon from 'react-native-vector-icons/Feather';

const injectedJavaScript = `
    window.__LandaJS = {
        result: [],

        getUserInfo: function() {
            return __user__;
        },
        getAccessToken: function() {
            return "__token__";
        }
    };
`;

const _showActionSheet = (navigation) => {
    const BUTTONS = [
        '刷新',
        '关于',
        '取消',
    ];
    ActionSheet.showActionSheetWithOptions(
        {
            title: '操作微应用',
            options: BUTTONS,
            cancelButtonIndex: 2,
        },
        (buttonIndex) => {
            if (buttonIndex === 0) {
                navigation.navigate('MAppBox', {ts: (new Date()).getTime()});
            } else if (buttonIndex === 1) {
                alert('微应用版本信息');
            }
        },
    );
}

export default class MAppBoxScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const app = navigation.getParam('app', {});
      return {
        headerTitle: app.name || `微应用`,
        headerStyle: {
           backgroundColor:'white',
           height: Util.px2dp(85),
           elevation: 1
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
                <View style={{flexDirection:'row',alignItems:'center',marginLeft:15}}>
                    <FIcon name="chevron-left" size={Util.px2dp(36)} color="#0099fc" />
                </View>
            </TouchableOpacity>
        ),
        headerRight:( // 设置右边的标签
            <TouchableOpacity onPress={() => {_showActionSheet(navigation)}}>
                <View style={{flexDirection:'row',alignItems:'center',marginRight:15}}>
                    <FIcon name="more-vertical" size={Util.px2dp(36)} color="#0099fc" />
                </View>
            </TouchableOpacity>
        )
      }
    };

    constructor(props) {
        super(props);

        this.state = {
            userInfo: null,
            loading: true,
            init: (new Date()).getTime().toString()
        };
    }

    componentDidMount() {
        Service.getUserInfo().then(userInfo => {
            this.setState({userInfo});
        })
    }

    componentWillMount() {
        this.setState({loading: true});
    }

    _onMessage = (event) => {
        let data = event.nativeEvent.data;

        if (data) {
            data = JSON.parse(data);

            if (data.request === 'camera') {
                // this.props.navigation.navigate('Camera', {
                //     onSaved: (image) => {
                //         console.log("camera image done");
                //         this._pushResult(data.id, image);
                //     }
                // });
            } else if (data.request === 'geo') {
                // this._getLocationAsync((location) => {
                //     this._pushResult(data.id, location);
                // })
            }
        }
    }

    // _getLocationAsync = async (cb) => {
    //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     if (status !== 'granted') {
    //         this.setState({
    //             errorMessage: 'Permission to access location was denied',
    //         });
    //     }
    //
    //     let location = await Location.getCurrentPositionAsync({});
    //     // let location = await {};
    //     console.log(location);
    //
    //     cb.call(this, location);
    // };

    _pushResult = (id, data) => {
        if (this.webview) {
            console.log("inject result");
            this.webview.injectJavaScript(`__LandaJS.result.push(${JSON.stringify({id, data})});`);
        }
    }

    _generateJs = (userInfo) => {
        if (userInfo) {
            let js = injectedJavaScript.replace('__user__', JSON.stringify(userInfo)).replace('__token__', Service.getAccessToken());

            console.log(js);

            return js;
        } else {
            return '';
        }
    }

    _hideSpinner = () => {
        this.setState({ loading: false });
    }


    render() {
        const { navigation } = this.props;
        const ts = navigation.getParam('ts', '');
        const app = navigation.getParam('app', {});
        const uri = app.homepageUrl || '';
        const init = this.state.init;

        console.log("loading uri: " + uri);

        return this.state.userInfo && (
            <View style={{
                height: '100%',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center',
            }}>
                {/* <AppBox uri="http://landa.aosaiban.com/dk/"/> */}
                <WebView
                    ref={c => this.webview = c}
                    // source={{ uri: `http://120.24.232.64/h5-test/test.html?__init=${init}&__ts=${ts}` }}
                    source={{ uri: `${uri}?__init=${init}&__ts=${ts}` }}
                    onLoad={() => this._hideSpinner()}
                    style={{flex: 1}}
                    onMessage={this._onMessage}
                    injectedJavaScript={this._generateJs(this.state.userInfo)}
                    javaScriptEnabled={true}
                    mixedContentMode='always'
                    allowUniversalAccessFromFileURLs={true}
                />
                {this.state.loading && (
                    <View style={styles.loadingContainer}>
                        <View style={styles.loadingIndicator}>
                            <ActivityIndicator text="正在加载..." style={styles.loadingIndicator}/>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        paddingHorizontal: Util.px2dp(30),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: Util.px2dp(24),
        lineHeight: Util.px2dp(64),
        color: '#878D93',
        paddingLeft: Util.px2dp(20),
    },
    appContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        paddingBottom: Util.px2dp(15),
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
    },
    appItem: {
        width: '25%',
        height: Util.px2dp(95),
        alignItems: 'center',
        marginVertical: Util.px2dp(35),
    },
    appImage: {
        width: Util.px2dp(50),
        height: Util.px2dp(50),
        marginBottom: Util.px2dp(15)
    },
    card: {
        flexDirection: 'row',
        height: Util.px2dp(156),
        paddingHorizontal: Util.px2dp(10),
        paddingVertical: Util.px2dp(32),
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: StyleSheet.hairlineWidth * 2
    },
    cardContainer: {
        paddingHorizontal: Util.px2dp(34),
        backgroundColor: 'white'
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    loadingIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});
