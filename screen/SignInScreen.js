import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Button,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Keyboard
} from 'react-native';
import Util from '../Util';
import Service from '../api/Service';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            account: null,
            password: null,
            isFocus: false
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
    }

    keyboardDidShow = () => {
        this.setState({ isFocus: true });
    }

    keyboardDidHide = () => {
        this.setState({ isFocus: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent={true} />
                <Image source={require('../resource/images/login.png')} style={styles.background} />
                {
                  !this.state.isFocus && <Image  source={require('../resource/images/logo.png')} style={styles.logo} />
                }
                <View style={styles.loginForm}>

                    <View style={styles.formItem}>
                        <Image source={require('../resource/images/login-user.png')} style={styles.formIcon} />
                        <View style={styles.textBox}>
                          <TextInput
                              style={styles.textInput}
                              placeholderTextColor={textColor}
                              underlineColorAndroid="transparent"
                              placeholder="请输入账号"
                              onChangeText={text => this.setState({ account: text })}
                          />
                        </View>
                    </View>

                    <View style={[styles.formItem, { marginBottom: Util.px2dp(70) }]}>
                        <Image source={require('../resource/images/login-lock.png')} style={styles.formIcon} />
                        <View style={styles.textBox}>
                          <TextInput
                              style={styles.textInput}
                              underlineColorAndroid="transparent"
                              placeholderTextColor={textColor}
                              secureTextEntry={true}
                              placeholder="请输入密码"
                              onChangeText={text => this.setState({ password: text })}
                          />
                        </View>
                    </View>

                    <TouchableOpacity onPress={this._onPressButton}>
                        <View style={styles.formButton}>
                            <Text style={{ fontSize: Util.px2dp(30), color: 'white' }}>登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _onPressButton = () => {
        Service.login(this.state.account, this.state.password).then(async () => {

            await AsyncStorage.setItem('userToken', Service.accessToken);
            console.log(Service.accessToken);
            
            Service.getCorpList().then(corps => {
                if (corps.length > 0) {
                    Service.selectCorp(corps[0].id);
                }
                this.props.navigation.navigate('App');
            });
        })
    }
}

const textColor = '#80b6f3';
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    logo: {
        width: Util.px2dp(144),
        height: Util.px2dp(167),
        marginTop: Util.px2dp(150),
    },
    textBox: {
        height: Util.px2dp(96),
        flex: 1,
        paddingHorizontal: Util.px2dp(45),
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        height: Util.px2dp(96),
        width: '100%',
        lineHeight: Util.px2dp(36),
        fontSize: Util.px2dp(36),
        flex: 1,
        color: '#38679d'
    },
    loginForm: {
        marginTop: Util.px2dp(180),
        paddingHorizontal: Util.px2dp(72),
        alignItems: 'stretch',
        width: '100%',
    },
    formItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Util.px2dp(40),
        borderColor: '#1a325d',
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
    },
    formIcon: {
        width: Util.px2dp(36),
        height: Util.px2dp(36),
    },
    formButton: {
        backgroundColor: '#13659b',
        height: Util.px2dp(100),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Util.px2dp(10),
    }
});
