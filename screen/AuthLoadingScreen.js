import React from 'react';
import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import Service from '../api/Service';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        Service.bindCTX(this);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('userToken');
        console.log(userToken);

        if (userToken) {
            Service.updateAccessToken(userToken);
            Service.getCorpList().then(corps => {
                console.log("corps");
                console.log(corps);

                if (corps.length > 0) {
                    Service.selectCorp(corps[0].id);
                }

                this.props.navigation.navigate('App');
            });
        } else {
            this.props.navigation.navigate('Auth');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
