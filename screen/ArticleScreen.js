import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import Util from '../Util';
import NavHeader from '../component/NavHeader';
import SearchBarStyle from 'antd-mobile-rn/lib/search-bar/style/index.native';
import commonStyles from '../resource/style';
import Service from '../api/Service';


export default class ArticleScreen extends React.Component {
    static navigationOptions = {
        title: '查看详细',
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '薪资详情',
            content: '基本工资xxx元，奖金xxx元，补贴xxx元，实际共发放xxxx元。'
        };
    }

    componentDidMount() {
        Service.getUserBook().then(resp => {
            this.setState({ data: resp.data });
        });
    }

    render() {
        return (
            <ScrollView style={{
                backgroundColor: '#F7F7F7',
                paddingVertical: Util.px2dp(50),
                paddingHorizontal: Util.px2dp(50),
            }}>
                <View style={{flex: 1, alignItems: 'center', marginBottom: Util.px2dp(50)}}>
                    <Text style={commonStyles.heading1}>{this.state.title}</Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={commonStyles.baseText}>{this.state.content}</Text>
                </View>
            
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: Util.px2dp(70),
        height: Util.px2dp(70),
        borderRadius: Util.px2dp(35),
    },
    card: {
        flexDirection: 'row',
        height: Util.px2dp(135),
        paddingHorizontal: Util.px2dp(30),
        paddingVertical: Util.px2dp(32),
        borderBottomColor: '#F3F3F3',
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    cardContainer: {

    },
});